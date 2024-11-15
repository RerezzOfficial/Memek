const axios = require('axios')
const fetch = require('node-fetch')
const cheerio = require('cheerio');
const jsobfus = require('javascript-obfuscator')
const FormData = require('form-data')
const https = require('https')

async function tiktokdl(url) {
  const response = await axios.post('https://ssstiktokio.com/wp-json/aio-dl/video-data/', {
    url
  });
  return response.data;
}
async function aioall(url) {
  let urlnya = q
  const {
    data
  } = await axios.post("https://allvideodownloader.cc/wp-json/aio-dl/video-data/", {
    url: urlnya
  });
  return data
}
async function gptPictures(q) {
  const axios = require("axios")
  let {
    data
  } = await axios.post("https://chat-gpt.pictures/api/generateImage", {
    "captionInput": q,
    "captionModel": "default"
  })
  return data
}
async function ChatBotz(text) {
  const response = await axios.post("https://ai.system.siputzx.my.id/api/gemini-sesi", {
    text: q,
    username: "KayyDev"
  });
  return response.data;
}

async function hentai() {
  return new Promise((resolve, reject) => {
    const page = Math.floor(Math.random() * 1153)
    axios.get('https://sfmcompile.club/page/' + page).then((data) => {
      const $ = cheerio.load(data.data)
      const hasil = []
      $('#primary > div > div > ul > li > article').each(function(a, b) {
        hasil.push({
          title: $(b).find('header > h2').text(),
          link: $(b).find('header > h2 > a').attr('href'),
          category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
          share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
          views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
          type: $(b).find('source').attr('type') || 'image/jpeg',
          video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
          video_2: $(b).find('video > a').attr('href') || ''
        })
      })
      resolve(hasil)
    })
  })
}
async function hentaivid() {
  return new Promise((resolve, reject) => {
    const page = Math.floor(Math.random() * 1153)
    axios.get('https://sfmcompile.club/page/' + page).then((data) => {
      const $ = cheerio.load(data.data)
      const hasil = []
      $('#primary > div > div > ul > li > article').each(function(a, b) {
        hasil.push({
          title: $(b).find('header > h2').text(),
          link: $(b).find('header > h2 > a').attr('href'),
          category: $(b).find('header > div.entry-before-title > span > span').text().replace('in ', ''),
          share_count: $(b).find('header > div.entry-after-title > p > span.entry-shares').text(),
          views_count: $(b).find('header > div.entry-after-title > p > span.entry-views').text(),
          type: $(b).find('source').attr('type') || 'image/jpeg',
          video_1: $(b).find('source').attr('src') || $(b).find('img').attr('data-src'),
          video_2: $(b).find('video > a').attr('href') || ''
        })
      })
      resolve(hasil)
    })
  })
}
async function generateGpt(q) {
  try {
    const nonceValue = JSON.parse(cheerio.load(await (await axios.get("https://gpt4free.io/chat")).data)('.mwai-chatbot-container').attr('data-system')).restNonce;
    const {
      data
    } = await axios("https://gpt4free.io/wp-json/mwai-ui/v1/chats/submit", {
      method: "post",
      data: {
        botId: "default",
        newMessage: q,
        stream: false,
      },
      headers: {
        "X-WP-Nonce": nonceValue,
        "Content-Type": "application/json",
      },
    });
    return data.reply;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data.message;
  }
}
async function streamBokepindo(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch data');
    const $ = cheerio.load(await response.text());
    const videoSrc = $('#bkpdo-player-container iframe').attr('src');
    return videoSrc;
  } catch (error) {
    console.error('Error fetching video src:', error);
    throw error;
  }
}
const phDl = (url) => new Promise((resolve, reject) => {
  console.log(`Get Pornhub metadata from ${url}`)
  phd.page(url, ['title', 'download_urls', 'thumbnail_url']).then((result) => resolve(result)).catch((err) => reject(err))
})
async function generateImages(inputText) {
  try {
    const apiUrl = `https://v2-guru-indratensei.cloud.okteto.net/scrape?query=${encodeURIComponent(inputText)}`;
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    if (responseData.image_links && responseData.image_links.length > 0) {
      return responseData.image_links;
    } else {
      throw "No image links found in the API response.";
    }
  } catch (error) {
    throw "Failed to fetch image links from the API.";
  }
}
async function pixivDl(query) {
  if (query.match(URL_REGEX)) {
    if (!/https:\/\/www.pixiv.net\/en\/artworks\/[0-9]+/i.test(query)) throw 'Invalid Pixiv Url'
    query = query.replace(/\D/g, '')
    let res = await pixiv.getIllustByID(query).catch(() => null)
    if (!res) throw `Pencarian "${query}" Tidak Ditemukan`
    let media = []
    for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)))
    return {
      artist: res.user.name,
      caption: res.title,
      tags: res.tags.tags.map(v => v.tag),
      media
    }
  } else {
    let res = await pixiv.getIllustsByTag(query)
    if (!res.length) throw `Pencarian "${query}" Tidak Di Temukan`
    res = res[~~(Math.random() * res.length)].id
    res = await pixiv.getIllustByID(res)
    let media = []
    for (let x = 0; x < res.urls.length; x++) media.push(await pixiv.download(new URL(res.urls[x].original)))
    return {
      artist: res.user.name,
      caption: res.title,
      tags: res.tags.tags.map(v => v.tag),
      media
    }
  }
}
async function Draw(propmt) {
  const Blobs = await fetch("https://api-inference.huggingface.co/models/prompthero/openjourney-v2", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer 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",
    },
    body: JSON.stringify({
      inputs: propmt
    }),
  }).then((res) => res.blob());
  const arrayBuffer = await Blobs.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
}
async function bingimage(query) {
  return new Promise((resolve, reject) => {
    bingi.imageSearch({
      q: query,
      enforceLanguage: true
    }, function(err, resp) {
      if (err) {
        console.log(err)
      } else {
        const result = {
          status: 200,
          ...resp
        }
        resolve(result)
      }
    })
  })
}

async function bingsearch(query) {
  return new Promise((resolve, reject) => {
    bingi.search({
      q: query,
      enforceLanguage: true
    }, function(err, resp) {
      if (err) {
        console.log(err)
      } else {
        const result = {
          status: 200,
          ...resp
        }
        resolve(result)
      }
    })
  })
}
async function diff(data) {
  const response = await fetch("https://api-inference.huggingface.co/models/stablediffusionapi/lyrielv16", {
    headers: {
      Authorization: "Bearer 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"
    },
    method: "POST",
    body: JSON.stringify(data),
  })
  const result = await response.blob();
  let arrayBuffer = await result.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer, 'base64')
  return buffer
}
async function processing(urlPath, method) {
  return new Promise(async (resolve, reject) => {
    let Methods = ["enhance", "recolor", "dehaze"];
    Methods.includes(method) ? (method = method) : (method = Methods[0]);
    let buffer,
      Form = new FormData(),
      scheme = "https" + "://" + "inferenceengine" + ".vyro" + ".ai/" + method;
    Form.append("model_version", 1, {
      "Content-Transfer-Encoding": "binary",
      contentType: "multipart/form-data; charset=uttf-8",
    });
    Form.append("image", Buffer.from(urlPath), {
      filename: "enhance_image_body.jpg",
      contentType: "image/jpeg",
    });
    Form.submit({
      url: scheme,
      host: "inferenceengine" + ".vyro" + ".ai",
      path: "/" + method,
      protocol: "https:",
      headers: {
        "User-Agent": "okhttp/4.9.3",
        Connection: "Keep-Alive",
        "Accept-Encoding": "gzip",
      },
    }, function(err, res) {
      if (err) reject();
      let data = [];
      res.on("data", function(chunk, resp) {
        data.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(data));
      });
      res.on("error", (e) => {
        reject();
      });
    });
  })
}
async function ephoto(url, texk) {
  let form = new FormData
  let gT = await axios.get(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
    }
  })
  let $ = cheerio.load(gT.data)
  let text = texk
  let token = $("input[name=token]").val()
  let build_server = $("input[name=build_server]").val()
  let build_server_id = $("input[name=build_server_id]").val()
  form.append("text[]", text)
  form.append("token", token)
  form.append("build_server", build_server)
  form.append("build_server_id", build_server_id)
  let res = await axios({
    url: url,
    method: "POST",
    data: form,
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
      cookie: gT.headers["set-cookie"]?.join("; "),
      ...form.getHeaders()
    }
  })
  let $$ = cheerio.load(res.data)
  let json = JSON.parse($$("input[name=form_value_input]").val())
  json["text[]"] = json.text
  delete json.text
  let {
    data
  } = await axios.post("https://en.ephoto360.com/effect/create-image", new URLSearchParams(json), {
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
      cookie: gT.headers["set-cookie"].join("; ")
    }
  })
  return build_server + data.image
}
async function igdl3(url) {
  let res = await axios("https://indown.io/");
  let _$ = cheerio.load(res.data);
  let referer = _$("input[name=referer]").val();
  let locale = _$("input[name=locale]").val();
  let _token = _$("input[name=_token]").val();
  let {
    data
  } = await axios.post("https://indown.io/download", new URLSearchParams({
    link: url,
    referer,
    locale,
    _token,
  }), {
    headers: {
      cookie: res.headers["set-cookie"].join("; "),
    },
  });
  let $ = cheerio.load(data);
  let result = [];
  let __$ = cheerio.load($("#result").html());
  __$("video").each(function() {
    let $$ = $(this);
    result.push({
      type: "video",
      thumbnail: $$.attr("poster"),
      url: $$.find("source").attr("src"),
    });
  });
  __$("img").each(function() {
    let $$ = $(this);
    result.push({
      type: "image",
      url: $$.attr("src"),
    });
  });
  return result;
}
async function streamToBuffer(stream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', (err) => reject(err));
    stream.on('end', () => resolve(Buffer.concat(chunks)));
  })
}
async function lookup(url) {
  let anu
  try {
    anu = await fetch(`https://api.api-ninjas.com/v1/dnslookup?domain=${url}`, {
      headers: {
        'X-Api-Key': 'E4/gdcfciJHSQdy4+9+Ryw==JHciNFemGqOVIbyv'
      },
      contentType: 'application/json'
    }).then(v => v.text())
    return JSON.stringify(JSON.parse(anu), null, 2)
  } catch (e) {
    console.log(e)
    anu = await fetch(`https://api.hackertarget.com/dnslookup/?q=${url}`).then(v => v.text())
    return anu
  }
}
async function ipinfo(ip) {
  let data = await fetch("https://api.sanzy.bar/api/tools?type=ipinfo&q=" + ip, {
    headers: {
      referer: "https://api.sanzy.bar"
    }
  });
  if (!data.ok) throw (await data.json()).error;
  return data.json();
}
async function gpt(text) {
  var currentTime = getFormattedDate();
  console.log(currentTime);
  const {
    data
  } = await axios("https://openai.sanzy.tech/api/openai/v1/chat/completions", {
      method: "post",
      data: {
        messages: [{
          role: "system",
          content: "\nYou are ChatGPT, a large language model trained by OpenAI.\nKnowledge cutoff: 2021-09\nCurrent model: gpt-3.5-turbo\nCurrent time: " + currentTime + "\n",
        }, {
          role: "user",
          content: text,
        }, ],
        stream: false,
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        presence_penalty: 0,
        frequency_penalty: 0,
        top_p: 1,
      },
      headers: {
        authorization: "Bearer ${apikey}",
        "content-type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36",
        "Referer": "https://openai.sanzy.tech/",
        "Origin": "https://openai.sanzy.tech",
      },
    }),
    result = {
      model: data.model,
      data: data.choices[0].message.content,
    };
  return result;
}
async function capcut(Url) {
  let token = Url.match(/\d+/)[0]
  let res = await axios(`https://ssscapcut.com/api/download/${token}`, {
    method: 'GET',
    headers: {
      'Accept': '*/*',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 13; CPH2217 Build/TP1A.220905.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/110.0.5481.153 Mobile Safari/537.36',
      'X-Requested-With': 'acr.browser.barebones',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-Mode': 'cors',
      'Sec-Fetch-Dest': 'empty',
      'Referer': 'https://ssscapcut.com/',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      'Cookie': 'sign=2cbe441f7f5f4bdb8e99907172f65a42; device-time=1685437999515'
    }
  }).then((v) => {
    return v.data
  })
  return res
}
async function sfileSearch(query, page = 1) {
  let res = await fetch(`https://sfile.mobi/search.php?q=${query}&page=${page}`)
  let $ = cheerio.load(await res.text())
  let result = []
  $('div.list').each(function() {
    let title = $(this).find('a').text()
    let size = $(this).text().trim().split('(')[1]
    let link = $(this).find('a').attr('href')
    if (link) result.push({
      title,
      size: size.replace(')', ''),
      link
    })
  })
  return result
}
async function sfiledown(link) {
  return new Promise((resolve, reject) => {
    axios.get(link).then(({
      data
    }) => {
      const $ = cheerio.load(data);
      const nama = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(2) > b').text();
      const size = $('#download').text().split('Download File');
      const desc = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(7) > center > h1').text();
      const type = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(4) > a:nth-child(3)').text();
      const upload = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(5)').text();
      const uploader = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(4) > a:nth-child(2)').text();
      const download = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(6)').text();
      const link = $('#download').attr('href');
      let other = link.split('/')[7].split('&is')[0];
      const format = {
        judul: nama + other.substr(other.length - 6).split('.')[1],
        size: size[1].split('(')[1].split(')')[0],
        type: type,
        mime: other.substr(other.length - 6).split('.')[1],
        desc: desc,
        uploader: uploader,
        uploaded: upload.split('\n - Uploaded: ')[1],
        download_count: download.split(' - Downloads: ')[1],
        link: link
      };
      const result = {
        creator: 'Hanya Orang Biasa',
        data: format
      };
      resolve(result);
    }).catch(error => reject(error));
  });
};
async function hitungmundur(bulan, tanggal) {
  let from = new Date(`${bulan} ${tanggal}, 2024 00:00:00`).getTime();
  let now = Date.now();
  let distance = from - now;
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
  return days + "Hari " + hours + "Jam " + minutes + "Menit " + seconds + "Detik"
}
async function sfileDl(url) {
  let res = await fetch(url)
  let $ = cheerio.load(await res.text())
  let filename = $('div.w3-row-padding').find('img').attr('alt')
  let mimetype = $('div.list').text().split(' - ')[1].split('\n')[0]
  let filesize = $('#download').text().replace(/Download File/g, '').replace(/\(|\)/g, '').trim()
  let download = $('#download').attr('href') + '&k=' + Math.floor(Math.random() * (15 - 10 + 1) + 10)
  return {
    filename,
    filesize,
    mimetype,
    download
  }
}
async function checkWeb(url) {
  let res = await (await fetchJson('https://trustpositif.kominfo.go.id/Rest_server/getrecordsname_home', {
    agent: new https.Agent({
      rejectUnauthorized: false
    }),
    method: 'post',
    body: new URLSearchParams(Object.entries({
      name: args.join('%0A')
    }))
  })).json()
  return res.values
}
async function html2img(html, css) {
  try {
    let a = await axios.post("https://htmlcsstoimage.com/demo_run", {
      "html": html,
      "console_mode": "",
      "url": "",
      "css": css ? css : "",
      "selector": "",
      "ms_delay": "",
      "render_when_ready": "false",
      "viewport_height": "",
      "viewport_width": "",
      "google_fonts": "",
      "device_scale": ""
    }, {
      headers: {
        "cookie": "_hcti_website_session=SFhp%2FC3qpFOizmifGuqCaeHU5CGGm3fe2AOrGjkgLzK5xmme5U87lIrQvaSAsTh%2BIiWePfEjeRS2mQSemfqXDkca4SBEq0VMfidbgOrve6Ijivp8iPzoyVIxsG4wHncopQ5gdPDe45sYPJUZ%2FWoNhiYfNKg6XpTIBTbu4OQ7VmDQ8mxaNMukgYSB2%2FtNim%2BcRoE%2B9woQBO0unxrNYy0oRf3bKQbqhCDVUJ5iRYm4Dd4yIOkj1nNv39VQrcebkAAp9sPPrbsMGguP%2Bp9eiXGqxQPS5ycYlqK%2B2Zz8FU8%3D--MJPaMU59qWTaoEzF--Wjee8Ftq%2B%2FChRFKnsVi2Ow%3D%3D; _ga_JLLLQJL669=GS1.1.1711473771.1.0.1711473771.0.0.0; _ga=GA1.2.535741333.1711473772; _gid=GA1.2.601778978.1711473772; _gat_gtag_UA_32961413_2=1",
        "x-csrf-token": "pO7JhtS8osD491DfzpbVYXzThWKZjPoXXFBi69aJnlFRHIO9UGP7Gj9Y93xItqiCHzisYobEoWqcFqZqGVJsow",
      }
    })
    return a.data.url
  } catch {
    return null
  }
}
async function GoogleBard(query) {
  const COOKIE_KEY = "awhDhy-7HHtxxRztpGSA13d3-DxQUe_b_mtNK4qzwkdnP85eNsq5RPSY5lvXLn8Wm7gKww.";
  const psidCookie = '__Secure-1PSID=' + COOKIE_KEY;
  const headers = {
    "Host": "bard.google.com",
    "X-Same-Domain": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Origin": "https://bard.google.com",
    "Referer": "https://bard.google.com",
    'Cookie': psidCookie
  };
  const bardRes = await fetch("https://bard.google.com/", {
    method: 'get',
    headers
  });
  const bardText = await bardRes.text();
  const [snlM0e, blValue] = [bardText.match(/"SNlM0e":"(.*?)"/)?.[1], bardText.match(/"cfb2h":"(.*?)"/)?.[1]];
  const bodyData = `f.req=[null,"[[\\"${encodeURIComponent(query)}\\"],null,[\\"\\",\\"\\",\\"\\"]]\"]&at=${snlM0e}`;
  const response = await fetch(`https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=${blValue}&_reqid=229189&rt=c`, {
    method: 'post',
    headers,
    body: bodyData
  });
  const answer = JSON.parse(JSON.parse((await response.text()).split("\n").reduce((a, b) => (a.length > b.length ? a : b), ""))[0][2])[4][0][1];
  return answer;
};
async function GoogleBardApi(query) {
  const headers = {
    "Host": "api.azz.biz.id",
    "X-Same-Domain": "1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36",
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Origin": "https://api.azz.biz.id",
    "Referer": "https://api.azz.biz.id"
  };
  const bardRes = await fetch(`https://api.azz.biz.id/api/bard?q=${query}&key=global`, {
    method: 'get',
    headers
  });
  const bardText = await bardRes.json();
  return bardText.respon;
};
async function spek(query) {
  return new Promise((resolve, reject) => {
    let result = axios.get('https://carisinyal.com/hp/?_sf_s=' + query).then(v => {
      let $ = cheerio.load(v.data)
      let list = $("div.oxy-posts > div.oxy-post")
      let index = []
      list.each((v, i) => {
        let title = $(i).find("a.oxy-post-title").text()
        let harga = $(i).find("div.harga").text()
        let link = $(i).find("a.oxy-post-image").attr('href')
        let res = {
          title: title,
          harga: harga,
          link: link
        }
        index.push(res)
      })
      return index
    })
    resolve(result)
  })
}
async function speklengkap(link) {
  return new Promise((resolve, reject) => {
    let result = axios.get(link).then(v => {
      let $ = cheerio.load(v.data)
      let fitur = []
      let spesifikasi = []
      let list = $("div#_dynamic_list-777-114924 > div.ct-div-block")
      list.each((v, i) => {
        let fitur_unggulan = $(i).find("span.ct-span").text()
        fitur.push({
          desc: fitur_unggulan
        })
      })
      let spek = $("div.ct-code-block > div > table.box-info")
      spek.each((v, i) => {
        let name = $(i).find("tr.box-baris > td.kolom-satu").text().trim()
        let fitur = $(i).find("tr.box-baris > td.kolom-dua").text().trim()
        spesifikasi.push({
          name: name,
          fitur: fitur
        })
      })
      let img = $("meta[name='twitter:image']").attr('content')
      return {
        fitur: fitur,
        spek: spesifikasi,
        img: img
      }
    })
    resolve(result)
  })
}
async function moewallsSearch(query) {
  const {
    data
  } = await axios.get('https://moewalls.com/?s=' + query)
  const $ = cheerio.load(data)
  let result = []
  const all = $('#primary > div > div > ul').each(function(a, b) {
    $(b).find('li > article .entry-featured-media > a').each(function() {
      result.push({
        title: $(this).attr('title'),
        thumb: $(this).find('div > img').attr('src'),
        url: $(this).attr('href')
      })
    })
  })
  return result
}
async function txt2imgApi(prompt) {
  return new Promise(async (resolve, reject) => {
    const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2OTY0ODM4MzYsInVzZXJfaWQiOiI2NTFlNDlmYjE4ZDNiNzZjMDQyMjk3NzUifQ.gW46goA2PDifptjkK78J-envYirtRgolRncyehkbCA4";
    const url = "https://api.wizmodel.com/sdapi/v1/txt2img";
    const payload = JSON.stringify({
      "prompt": prompt,
      "steps": 100
    });
    const headers = {
      'content-type': 'application/json',
      'authorization': 'bearer ' + api_key
    };
  })
}
async function igdl2(url) {
  let res = await axios("https://indown.io/");
  let _$ = cheerio.load(res.data);
  let referer = _$("input[name=referer]").val();
  let locale = _$("input[name=locale]").val();
  let _token = _$("input[name=_token]").val();
  let {
    data
  } = await axios.post("https://indown.io/download", new URLSearchParams({
    link: url,
    referer,
    locale,
    _token,
  }), {
    headers: {
      cookie: res.headers["set-cookie"].join("; "),
    },
  });
  let $ = cheerio.load(data);
  let result = [];
  let __$ = cheerio.load($("#result").html());
  __$("video").each(function() {
    let $$ = $(this);
    result.push({
      type: "video",
      thumbnail: $$.attr("poster"),
      url: $$.find("source").attr("src"),
    });
  });
  __$("img").each(function() {
    let $$ = $(this);
    result.push({
      type: "image",
      url: $$.attr("src"),
    });
  });
  return result;
}
async function searchBokepindo(query) {
  try {
    const response = await fetch('https://bokepindo13.mom/?s=' + query);
    if (!response.ok) throw new Error('Failed to fetch data');
    const $ = cheerio.load(await response.text());
    return $('article[data-video-uid]').map((index, element) => ({
      videoUid: $(element).attr('data-video-uid'),
      postId: $(element).attr('data-post-id'),
      title: $(element).find('a').attr('title'),
      thumbnailSrc: $(element).find('img').attr('data-src'),
      hdVideo: $(element).find('.hd-video').text(),
      views: $(element).find('.views').text(),
      duration: $(element).find('.duration').text(),
      videoLink: $(element).find('a').attr('href'), // Menambahkan link video
    })).get();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
async function igstalk(Username) {
  return new Promise((resolve, reject) => {
    axios.get('https://dumpor.com/v/' + Username, {
      headers: {
        "cookie": "_inst_key=SFMyNTY.g3QAAAABbQAAAAtfY3NyZl90b2tlbm0AAAAYWGhnNS1uWVNLUU81V1lzQ01MTVY2R0h1.fI2xB2dYYxmWqn7kyCKIn1baWw3b-f7QvGDfDK2WXr8",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36"
      }
    }).then(res => {
      const $ = cheerio.load(res.data)
      const result = {
        profile: $('#user-page > div.user > div.row > div > div.user__img').attr('style').replace(/(background-image: url\(\'|\'\);)/gi, ''),
        fullname: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > a > h1').text(),
        username: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > div > h4').text(),
        post: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(1)').text().replace(' Posts', ''),
        followers: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(2)').text().replace(' Followers', ''),
        following: $('#user-page > div.user > div > div.col-md-4.col-8.my-3 > ul > li:nth-child(3)').text().replace(' Following', ''),
        bio: $('#user-page > div.user > div > div.col-md-5.my-3 > div').text()
      }
      resolve(result)
    })
  })
}
async function moewallsUrl(url) {
  const {
    data
  } = await axios.get(url, {
    headers: {
      "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
    }
  })
  const $ = cheerio.load(data)
  const result = {}
  $('#secondary > div').find('div > ul > li').each(function(a, b) {
    const p = $(b).find('i').text()
    if (p) result[p] = $(b).text().replace(p, '').trim()
  })
  const preview = $('#content > article > div > div > div.player_responsive').find('div > video > source').attr('src')
  return {
    ...result,
    preview
  }
}
async function formatUptime(uptime) {
  let seconds = Math.floor(uptime % 60);
  let minutes = Math.floor((uptime / 60) % 60);
  let hours = Math.floor((uptime / (60 * 60)) % 24);
  let days = Math.floor(uptime / (60 * 60 * 24));
  let formattedUptime = '';
  if (days > 0) formattedUptime += `${days} days `;
  if (hours > 0) formattedUptime += `${hours} hours `;
  if (minutes > 0) formattedUptime += `${minutes} minutes `;
  if (seconds > 0) formattedUptime += `${seconds} seconds`;
  return formattedUptime;
}
async function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
async function rmbg(buffer) {
  let form = new FormData
  form.append("size", "auto")
  form.append("image_file", fs.createReadStream(buffer), "ntah.webp")
  let res = await axios({
    url: "https://api.remove.bg/v1.0/removebg",
    method: "POST",
    data: form,
    responseType: "arraybuffer",
    headers: {
      "X-Api-Key": "dNaWDqPDEuzQTHDba6TACk57",
      ...form.getHeaders()
    }
  })
  return res.data
}
stickersearch = (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://getstickerpack.com/stickers?query=${query}`)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const source = [];
				const link = [];
				$('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
					source.push($(b).attr('href'))
				})
				axios.get(source[Math.floor(Math.random() * source.length)])
					.then(({
						data
					}) => {
						const $$ = cheerio.load(data)
						$$('#stickerPack > div > div.row > div > img').each(function(c, d) {
							link.push($$(d).attr('src').replace(/&d=200x200/g, ''))
						})
					let result = {
							status: 200,
							author: global.creator,
							title: $$('#intro > div > div > h1').text(),
							sticker_url: link
						}
						resolve(result)
					})
			}).catch(reject)
	})
}

amv1 = async () => {
    const url = 'https://shortstatusvideos.com/anime-video-status-download/'; // Ganti dengan URL yang sesuai
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const videos = [];
    $('a.mks_button.mks_button_small.squared').each((index, element) => {
        const href = $(element).attr('href');
        const title = $(element).closest('p').prevAll('p').find('strong').text();
        videos.push({
            title,
            source: href
        });
    });
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomIndex];
    return randomVideo;
}
amv2 = async () => {
    const url = 'https://mobstatus.com/anime-whatsapp-status-video/'; // Ganti dengan URL yang sesuai
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const videos = [];
    const title = $('strong').text();
    $('a.mb-button.mb-style-glass.mb-size-tiny.mb-corners-pill.mb-text-style-heavy').each((index, element) => {
        const href = $(element).attr('href');
        videos.push({
            title,
            source: href
        });
    });
    const randomIndex = Math.floor(Math.random() * videos.length);
    const randomVideo = videos[randomIndex];
    return randomVideo;
}

rexdldownload = (url) => {
   return new Promise(async (resolve, reject) => {
      try {
         let html = await (await axios.get(url)).data
         let $ = cheerio.load(html)
         let data = []
         let start = await (await axios.get($('span.readdownload > a').attr('href'))).data
         let che = cheerio.load(start)
         let postInfo = {
            thumb: $('img[class="aligncenter lazy"]').attr('data-src'),
            name: $('h1.post-title').text().trim(),
            update: che('li.dl-update').text().split(':')[1].trim(),
            version: che('li.dl-version').text().split(':')[1].trim(),
            size: che('li.dl-size').text().split(':')[1].trim(),
            password: che('li.dl-key').text().split(':')[1].replace(/"/g, '').trim()
         }
         che('ul.dl').find('a').each(function(i, e) {
            let isUrl = $(e).attr('href')
            if (isUrl.endsWith('.apk') || isUrl.endsWith('.zip')) data.push({
               filename: isUrl.split('/')[isUrl.split('/').length - 1],
               url: isUrl
            })
         })
         if (data.length == 0) return resolve({
            creator: global.creator,
            status: false
         })
         resolve({
            creator: global.creator,
            status: true,
            ...postInfo,
            data
         })
      } catch (e) {
         console.log(e)
         return resolve({
            creator: global.creator,
            status: false
         })
      }
   })
}

dafontSearch = async (query) => {
const base = `https://www.dafont.com`
const res = await axios.get(`${base}/search.php?q=${query}`)
const $ = cheerio.load(res.data)
const hasil = []
const total = $('div.dffont2').text().replace(` fonts on DaFont for ${query}`, '') 
$('div').find('div.container > div > div.preview').each(function(a, b) {
$('div').find('div.container > div > div.lv1left.dfbg').each(function(c, d) { 
$('div').find('div.container > div > div.lv1right.dfbg').each(function(e, f) { 
let link = `${base}/` + $(b).find('a').attr('href')
let judul = $(d).text() 
let style = $(f).text() 
hasil.push({ judul, style, link, total}) 
}) 
}) 
}) 
return hasil
}

dafontDown = async (link) => {
const des = await axios.get(link)
const sup = cheerio.load(des.data)
const result = []
let style = sup('div').find('div.container > div > div.lv1right.dfbg').text() 
let judul = sup('div').find('div.container > div > div.lv1left.dfbg').text() 
try {
isi = sup('div').find('div.container > div > span').text().split('.ttf')
output = sup('div').find('div.container > div > span').eq(0).text().replace('ttf' , 'zip')
} catch {
isi = sup('div').find('div.container > div > span').text().split('.otf')
output = sup('div').find('div.container > div > span').eq(0).text().replace('otf' , 'zip')
}

let down = 'http:' + sup('div').find('div.container > div > div.dlbox > a').attr('href')
result.push({ style, judul, isi, output, down})
return result
}


async function obfus(query) {
return new Promise((resolve, reject) => {
try {
const obfuscationResult = jsobfus.obfuscate(query,
{
compact: false,
controlFlowFlattening: true,
controlFlowFlatteningThreshold: 1,
numbersToExpressions: true,
simplify: true, 
stringArrayShuffle: true,
splitStrings: true,
stringArrayThreshold: 1
}
);
const result = {
status: 200,
author: `kayy`,
result: obfuscationResult.getObfuscatedCode()
}
resolve(result)
} catch (e) {
reject(e)
}
})
}

remini2 = (imageData, operation) => {
    return new Promise(async (resolve, reject) => {
        const availableOperations = ["enhance", "recolor", "dehaze"];
        if (availableOperations.includes(operation)) {
            operation = operation;
        } else {
            operation = availableOperations[0];
        }
        const baseUrl = "https://inferenceengine.vyro.ai/" + operation + ".vyro";
        const formData = new FormData();
        formData.append("image", Buffer.from(imageData), { filename: "enhance_image_body.jpg", contentType: "image/jpeg" });
        formData.append("model_version", 1, { "Content-Transfer-Encoding": "binary", contentType: "multipart/form-data; charset=utf-8" });

        const options = {
            method: 'POST',
            hostname: 'inferenceengine.vyro.ai',
            path: "/" + operation,
            protocol: 'https:',
            headers: {
                'User-Agent': 'okhttp/4.9.3',
                'Connection': 'Keep-Alive',
                'Accept-Encoding': 'gzip',
                ...formData.getHeaders()
            }
        };

        const req = https.request(options, function (res) {
            const chunks = [];
            res.on("data", function (chunk) {
                chunks.push(chunk);
            });
            res.on("end", function () {
                resolve(Buffer.concat(chunks));
            });
            res.on("error", function (err) {
                reject(err);
            });
        });

        formData.pipe(req);

        req.on('error', function (err) {
            reject(err);
        });

        req.end();
    });
}

jarakkota = (dari, ke) => {
   return new Promise(async (resolve, reject) => {
	var html = (await axios(`https://www.google.com/search?q=${encodeURIComponent('jarak ' + dari + ' ke ' + ke)}&hl=id`)).data
	var $ = cheerio.load(html), obj = {}
	var img = html.split("var s=\'")?.[1]?.split("\'")?.[0]
	obj.img = /^data:.*?\/.*?;base64,/i.test(img) ? Buffer.from(img.split`,` [1], 'base64') : ''
	obj.desc = $('div.BNeawe.deIvCb.AP7Wnd').text()?.trim()
	resolve(obj)
   })
}

function generateRandomPassword() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#%^&*';
  const length = 15;
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
}

async function msToDate(ms) {
  let years = Math.floor(ms / (1000 * 60 * 60 * 24 * 365));
  let months = Math.floor(
    (ms % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );
  let weeks = Math.floor(
    (ms % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24 * 7)
  );
  let days = Math.floor(
    (ms % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24)
  );
  return `${years} tahun ${months} bulan ${weeks} minggu ${days} hari`;
};
async function msToDay(ms) {
  let temp = ms;
  let years = Math.floor(temp / (365 * 24 * 60 * 60 * 1000));
  temp = temp % (365 * 24 * 60 * 60 * 1000);
  let months = Math.floor(temp / (30 * 24 * 60 * 60 * 1000));
  temp = temp % (30 * 24 * 60 * 60 * 1000);
  let weeks = Math.floor(temp / (7 * 24 * 60 * 60 * 1000));
  temp = temp % (7 * 24 * 60 * 60 * 1000);
  let days = Math.floor(temp / (24 * 60 * 60 * 1000));
  temp = temp % (24 * 60 * 60 * 1000);
  let hours = Math.floor(temp / (60 * 60 * 1000));
  temp = temp % (60 * 60 * 1000);
  let minutes = Math.floor(temp / (60 * 1000));
  temp = temp % (60 * 1000);

  let result = "";
  if (years > 0) {
    result += years + (years > 1 ? " tahun " : " tahun ");
  }
  if (months > 0) {
    result += months + (months > 1 ? " bulan " : " bulan ");
  }
  if (weeks > 0) {
    result += weeks + (weeks > 1 ? " minggu " : " minggu ");
  }
  if (days > 0) {
    result += days + (days > 1 ? " hari " : " hari ");
  }
  if (hours > 0) {
    result += hours + (hours > 1 ? " jam " : " jam ");
  }
  if (minutes > 0) {
    result += minutes + (minutes > 1 ? " menit " : " menit ");
  }
  return result.trim();
};

async function googleImage(query) {
   const data = await got(`https://www.google.com/search?q=${query}&tbm=isch`, {
      headers: {
         accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
         'accept-encoding': 'gzip, deflate, br',
         'accept-language': 'en-US,en;q=0.9,id;q=0.8',
         'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36'
      }
   }).text();
   const $ = await cheerio.load(data);
   const pattern = /\[1,\[0,"(?<id>[\d\w\-_]+)",\["https?:\/\/(?:[^"]+)",\d+,\d+\]\s?,\["(?<url>https?:\/\/(?:[^"]+))",\d+,\d+\]/gm;
   const matches = $.html().matchAll(pattern);
   const decodeUrl = (url) => decodeURIComponent(JSON.parse(`"${url}"`));
   return [...matches]
      .map(({
         groups
      }) => decodeUrl(groups === null || groups === void 0 ? void 0 : groups.url))
      .filter((v) => /.*\.jpe?g|png$/gi.test(v));
}

module.exports = { searchBokepindo, ChatBotz, gptPictures, tiktokdl, aioall, streamBokepindo, generateGpt, hentaivid, hentai, bingimage, generateImages, pixivDl, Draw, bingsearch, lookup, streamToBuffer, ephoto, processing, igdl3, GoogleBardApi, sfileDl, checkWeb, html2img, GoogleBard, spek, speklengkap, moewallsSearch, txt2imgApi, moewallsUrl, formatUptime, formatBytes, rmbg, igstalk, igdl2, stickersearch, amv1, amv2, sfileSearch, rexdldownload, dafontSearch, dafontDown, obfus, remini2, jarakkota, generateRandomPassword, msToDate, msToDay, googleImage }