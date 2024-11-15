const { decode } = require("html-entities");
const needle = require("needle");

const SPICE_BASE = 'https://duckduckgo.com/js/spice';
const VQD_REGEX = /vqd=['"](\d+-\d+(?:-\d+)?)['"]/;

/**
 * The safe search values when searching DuckDuckGo.
 */
const SafeSearchType = {
    STRICT: 0,      // Strict filtering, no NSFW content.
    MODERATE: -1,    // Moderate filtering.
    OFF: -2          // No filtering.
};

/**
 * The type of time ranges of the search results in DuckDuckGo.
 */
const SearchTimeType = {
    ALL: "a",       // From any time.
    DAY: "d",       // From the past day.
    WEEK: "w",      // From the past week.
    MONTH: "m",     // From the past month.
    YEAR: "y"       // From the past year.
};

/**
 * Convert an object to a query string.
 * @param {Object} query The query object to convert.
 * @returns {string} The query string.
 */
function queryString(query) {
    return new URLSearchParams(query).toString();
}

/**
 * Get the VQD of a search query.
 * @param {string} query The query to search.
 * @param {string} ia The type of search.
 * @param {Object} options The options of the HTTP request.
 * @returns {Promise<string>} The VQD.
 */
async function getVQD(query, ia = 'web', options) {
    try {
        const response = await needle('get', `https://duckduckgo.com/?${queryString({ q: query, ia })}`, options);
        return VQD_REGEX.exec(response.body)[1];
    } catch (e) {
        throw new Error(`Failed to get the VQD for query "${query}".`);
    }
}

/**
 * Ensure the input is JSON.
 * @param {Buffer|string|Object} body The input body.
 * @returns {Object} Parsed JSON.
 */
function ensureJSON(body) {
    if (body instanceof Buffer) return JSON.parse(body.toString());
    if (typeof body === 'string') return JSON.parse(body);
    return body;
}

/**
 * Parse the body of a Spice request.
 * @param {Buffer|string} body The body to parse.
 * @param {RegExp} regex The regex to extract data.
 * @returns {Object} Parsed data.
 */
function parseSpiceBody(body, regex = /^ddg_spice_[\w]+\(\n?((?:.|\n)+)\n?\);?/) {
    return JSON.parse(regex.exec(body.toString())[1]);
}

const defaultOptions = {
  safeSearch: SafeSearchType.OFF,
  time: SearchTimeType.ALL,
  locale: 'en-us',
  region: 'wt-wt',
  offset: 0,
  marketRegion: 'us'
};

const SEARCH_REGEX = /DDG\.pageLayout\.load\('d',(\[.+\])\);DDG\.duckbar\.load\('images'/;
const IMAGES_REGEX = /;DDG\.duckbar\.load\('images', ({"ads":.+"vqd":{".+":"\d-\d+-\d+"}})\);DDG\.duckbar\.load\('news'/;
const NEWS_REGEX = /;DDG\.duckbar\.load\('news', ({"ads":.+"vqd":{".+":"\d-\d+-\d+"}})\);DDG\.duckbar\.load\('videos'/;
const VIDEOS_REGEX = /;DDG\.duckbar\.load\('videos', ({"ads":.+"vqd":{".+":"\d-\d+-\d+"}})\);DDG\.duckbar\.loadModule\('related_searches'/;
const RELATED_SEARCHES_REGEX = /DDG\.duckbar\.loadModule\('related_searches', ({"ads":.+"vqd":{".+":"\d-\d+-\d+"}})\);DDG\.duckbar\.load\('products'/;

async function search(query, options, needleOptions) {
  if (!query) throw new Error('Query cannot be empty!');
  options = options ? sanityCheck(options) : defaultOptions;
  let vqd = options.vqd || await getVQD(query, 'web', needleOptions);

  const queryObject = {
    q: query,
    ...(options.safeSearch !== SafeSearchType.STRICT ? { t: 'D' } : {}),
    l: options.locale,
    ...(options.safeSearch === SafeSearchType.STRICT ? { p: '1' } : {}),
    kl: options.region || 'wt-wt',
    s: String(options.offset),
    dl: 'en',
    ct: 'US',
    ss_mkt: options.marketRegion,
    df: options.time,
    vqd,
    ...(options.safeSearch !== SafeSearchType.STRICT ? { ex: String(options.safeSearch) } : {}),
    sp: '1',
    bpa: '1',
    biaexp: 'b',
    msvrtexp: 'b',
    ...(options.safeSearch === SafeSearchType.STRICT
      ? {
        videxp: 'a',
        nadse: 'b',
        eclsexp: 'a',
        stiaexp: 'a',
        tjsexp: 'b',
        related: 'b',
        msnexp: 'a'
      }
      : {
        nadse: 'b',
        eclsexp: 'b',
        tjsexp: 'b'
        // cdrexp: 'b'
      })
  };

  const response = await needle('get', `https://links.duckduckgo.com/d.js?${queryString(queryObject)}`, needleOptions);

  if (response.body.includes('DDG.deep.is506')) throw new Error('A server error occurred!');
  if (response.body.toString().includes('DDG.deep.anomalyDetectionBlock')) throw new Error('DDG detected an anomaly in the request, you are likely making requests too quickly.');

  const searchResults = JSON.parse(SEARCH_REGEX.exec(response.body)[1].replace(/\t/g, '    '));

  if (searchResults.length === 1 && !('n' in searchResults[0])) {
    const onlyResult = searchResults[0];
    if ((!onlyResult.da && onlyResult.t === 'EOF') || !onlyResult.a || onlyResult.d === 'google.com search') {
      return {
        noResults: true,
        vqd,
        results: []
      };
    }
  }

  const results = {
    noResults: false,
    vqd,
    results: []
  };

  for (const search of searchResults) {
    if ('n' in search) continue;

    let bang;
    if (search.b) {
      const [prefix, title, domain] = search.b.split('\t');
      bang = { prefix, title, domain };
    }

    results.results.push({
      title: search.t,
      description: decode(search.a).replace(/<b>/g, '').replace(/<\/?b>/g, ''),
      Description: search.a.replace(/<b>/g, '').replace(/<\/?b>/g, ''),
      hostname: search.i,
      icon: `https://external-content.duckduckgo.com/ip3/${search.i}.ico`,
      url: search.u,
      bang
    });
  }

  const imagesMatch = IMAGES_REGEX.exec(response.body);
  if (imagesMatch) {
    const imagesResult = JSON.parse(imagesMatch[1].replace(/\t/g, '    '));
    results.images = imagesResult.results.map((i) => {
      i.title = decode(i.title);
      return i;
    });
  }

  const newsMatch = NEWS_REGEX.exec(response.body);
  if (newsMatch) {
    const newsResult = JSON.parse(newsMatch[1].replace(/\t/g, '    '));
    results.news = newsResult.results.map((article) => ({
      date: article.date,
      excerpt: decode(article.excerpt),
      image: article.image,
      relativeTime: article.relative_time,
      syndicate: article.syndicate,
      title: decode(article.title),
      url: article.url,
      isOld: !!article.is_old
    }));
  }

  const videosMatch = VIDEOS_REGEX.exec(response.body);
  if (videosMatch) {
    const videoResult = JSON.parse(videosMatch[1].replace(/\t/g, '    '));
    results.videos = [];
    for (const video of videoResult.results) {
      results.videos.push({
        url: video.content,
        title: decode(video.title),
        description: decode(video.description),
        image: video.images.large || video.images.medium || video.images.small || video.images.motion,
        duration: video.duration,
        publishedOn: video.publisher,
        published: video.published,
        publisher: video.uploader,
        viewCount: video.statistics.viewCount || undefined
      });
    }
  }

  const relatedMatch = RELATED_SEARCHES_REGEX.exec(response.body);
  if (relatedMatch) {
    const relatedResult = JSON.parse(relatedMatch[1].replace(/\t/g, '    '));
    results.related = [];
    for (const related of relatedResult.results) {
      results.related.push({
        text: related.text,
        raw: related.display_text
      });
    }
  }

  // TODO: Products
  return results;
}

function sanityCheck(options) {
  options = Object.assign({}, defaultOptions, options);

  if (!(options.safeSearch in SafeSearchType)) {
    throw new TypeError(`${options.safeSearch} is an invalid safe search type!`);
  }

  if (typeof options.safeSearch === 'string') {
    options.safeSearch = SafeSearchType[options.safeSearch];
  }

  if (typeof options.offset !== 'number') {
    throw new TypeError(`Search offset is not a number!`);
  }

  if (options.offset < 0) {
    throw new RangeError('Search offset cannot be below zero!');
  }

  if (options.time &&
    !Object.values(SearchTimeType).includes(options.time) &&
    !/\d{4}-\d{2}-\d{2}..\d{4}-\d{2}-\d{2}/.test(options.time)) {
    throw new TypeError(`${options.time} is an invalid search time!`);
  }

  if (!options.locale || typeof options.locale !== 'string') {
    throw new TypeError('Search locale must be a string!');
  }

  if (!options.region || typeof options.region !== 'string') {
    throw new TypeError('Search region must be a string!');
  }

  if (!options.marketRegion || typeof options.marketRegion !== 'string') {
    throw new TypeError('Search market region must be a string!');
  }

  if (options.vqd && !/\d-\d+-\d+/.test(options.vqd)) {
    throw new Error(`${options.vqd} is an invalid VQD!`);
  }

  return options;
}

async function autocomplete(query, region, needleOptions) {
  if (!query) throw new Error('Query cannot be empty!');
  const queryObject = {
    q: query,
    kl: region || 'wt-wt'
  };

  const response = await needle('get', `https://duckduckgo.com/ac/?${queryString(queryObject)}`, needleOptions);
  return ensureJSON(response.body);
}

module.exports = { search, autocomplete };