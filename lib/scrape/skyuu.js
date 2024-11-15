const axios = require('axios')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const request = require('request')
const FormData = require('form-data')
const bing = require('bing-scraper')

const PasteGG = require("paste.gg");
const moment = require("moment-timezone");
const pasteGg = new PasteGG();
const exp = moment().tz("America/Asuncion").add(60, "minutes").format();

function styleText(teks) {
  return new Promise((resolve, reject) => {
    axios.get('http://qaz.wtf/u/convert.cgi?text=' + teks)
      .then(({ data }) => {
        let $ = cheerio.load(data)
        let hasil = []
        $('table > tbody > tr').each(function(a, b) {
          hasil.push({ name: $(b).find('td:nth-child(1) > span').text(), result: $(b).find('td:nth-child(2)').text().trim() })
        })
        resolve(hasil)
      })
  })
}

function pinterest(querry) {
  return new Promise(async (resolve, reject) => {
    axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
      headers: {
        "cookie": "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
      }
    }).then(({ data }) => {
      const $ = cheerio.load(data)
      const result = [];
      const hasil = [];
      $('div > a').get().map(b => {
        const link = $(b).find('img').attr('src')
        result.push(link)
      });
      result.forEach(v => {
        if (v == undefined) return
        hasil.push(v.replace(/236/g, '736'))
      })
      hasil.shift();
      resolve(hasil)
    })
  })
}

function ringtone(title) {
  return new Promise((resolve, reject) => {
    axios.get('https://meloboom.com/en/search/' + title)
      .then((get) => {
        let $ = cheerio.load(get.data)
        let hasil = []
        $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function(a, b) {
          hasil.push({ title: $(b).find('h4').text(), source: 'https://meloboom.com' + $(b).find('a').attr('href'), audio: $(b).find('audio').attr('src') })
        })
        resolve(hasil)
      })
  })
}

function wikimedia(title) {
  return new Promise((resolve, reject) => {
    axios.get(`https://commons.wikimedia.org/w/index.php?search=${title}&title=Special:MediaSearch&go=Go&type=image`)
      .then((res) => {
        let $ = cheerio.load(res.data)
        let hasil = []
        $('.sdms-search-results__list-wrapper > div > a').each(function(a, b) {
          hasil.push({
            title: $(b).find('img').attr('alt'),
            source: $(b).attr('href'),
            image: $(b).find('img').attr('data-src') || $(b).find('img').attr('src')
          })
        })
        resolve(hasil)
      })
  })
}

async function tiktokStalk(user) {
  let res = await axios.get(`https://urlebird.com/user/${user}/`)
  let $ = cheerio.load(res.data), obj = {}
  obj.pp_user = $('div[class="col-md-auto justify-content-center text-center"] > img').attr('src')
  obj.name = $('h1.user').text().trim()
  obj.username = $('div.content > h5').text().trim()
  obj.followers = $('div[class="col-7 col-md-auto text-truncate"]').text().trim().split(' ')[1]
  obj.following = $('div[class="col-auto d-none d-sm-block text-truncate"]').text().trim().split(' ')[1]
  obj.description = $('div.content > p').text().trim()
  return obj
}

async function igStalk(username) {
  username = username.replace(/^@/, '')
  const html = await (await fetch(`https://dumpor.com/v/${username}`)).text()
  const $$ = cheerio.load(html)
  const name = $$('div.user__title > a > h1').text().trim()
  const Uname = $$('div.user__title > h4').text().trim()
  const description = $$('div.user__info-desc').text().trim()
  const profilePic = $$('div.user__img').attr('style')?.replace("background-image: url('", '').replace("');", '')
  const row = $$('#user-page > div.container > div > div > div:nth-child(1) > div > a')
  const postsH = row.eq(0).text().replace(/Posts/i, '').trim()
  const followersH = row.eq(2).text().replace(/Followers/i, '').trim()
  const followingH = row.eq(3).text().replace(/Following/i, '').trim()
  const list = $$('ul.list > li.list__item')
  const posts = parseInt(list.eq(0).text().replace(/Posts/i, '').trim().replace(/\s/g, ''))
  const followers = parseInt(list.eq(1).text().replace(/Followers/i, '').trim().replace(/\s/g, ''))
  const following = parseInt(list.eq(2).text().replace(/Following/i, '').trim().replace(/\s/g, ''))
  return {
    name,
    username: Uname,
    description,
    postsH,
    posts,
    followersH,
    followers,
    followingH,
    following,
    profilePic
  }
}

function twitter(url) {
  return new Promise((resolve, reject) => {
    let params = new URLSearchParams()
    params.append('URL', url)
    fetch('https://twdown.net/download.php', { method: 'POST', body: params })
      .then(res => res.text())
      .then(res => {
        const $ = cheerio.load(res);
        data = []
        $('div.container').find('tbody > tr > td').each(function(index, element) {
          x = $(this).find('a').attr('href')
          if (x !== '#') {
            if (typeof x !== 'undefined') {
              data.push({ url: x })
            }
          }
        })
        if (data.length == 0) return resolve({ status: false })
        resolve({ status: true, data })
      }).catch(reject)
  })
}

function wallpaper(nominal) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.wallpaperflare.com/search?wallpaper=${nominal}&page=1`)
      .then(({
        data
      }) => {
        const $ = cheerio.load(data)
        let title = []
        let img = []
        $('#gallery > li > figure > a > img').get().map((rest) => {
          img.push($(rest).attr('data-src'))
        })
        $('#gallery > li > figure > a > img').get().map((rest) => {
          title.push($(rest).attr('title'))
        })
        let result = []
        for (let i = 0; i < img.length; i++) {
          result.push({
            image: img[i],
            title: title[i]
          })
        }

        const res = {
          status: 200,
          createdBy: 'ZSofttt',
          result: result
        }
        resolve(res)
      })
      .catch(reject)
  })
}

async function pShadow(text1) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: 'https://photooxy.com/logo-and-text-effects/shadow-text-effect-in-the-sky-394.html',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      formData: { text_1: text1, login: 'OK' }
    };

    request(options, async function(error, response, body) {
      if (error) throw new Error(error);
      const $ = cheerio.load(body)
      const result = {
        url: $('div.btn-group > a').attr('href')
      }
      resolve(result);
    });
  })
}

async function stickerSearch(query) {
  return new Promise((resolve) => {
    axios.get(`https://getstickerpack.com/stickers?query=${query}`)
      .then(({
        data
      }) => {
        const $ = cheerio.load(data)
        const link = [];
        $('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
          link.push($(b).attr('href'))
        })
        let rand = link[Math.floor(Math.random() * link.length)]
        axios.get(rand)
          .then(({
            data
          }) => {
            const $$ = cheerio.load(data)
            const url = [];
            $$('#stickerPack > div > div.row > div > img').each(function(a, b) {
              url.push($$(b).attr('src').split('&d=')[0])
            })
            resolve({
              creator: "Wudysoft",
              title: $$('#intro > div > div > h1').text(),
              author: $$('#intro > div > div > h5 > a').text(),
              author_link: $$('#intro > div > div > h5 > a').attr('href'),
              sticker: url
            })
          })
      })
  })
}

async function searchGore(query) {
  return new Promise(async (resolve, reject) => {
    axios.get('https://seegore.com/?s=' + query).then(dataa => {
      const $$$ = cheerio.load(dataa)
      let pagina = $$$('#main > div.container.main-container > div > div.bb-col.col-content > div > div > div > div > nav > ul > li:nth-child(4) > a').text();
      let slink = 'https://seegore.com/?s=' + query
      axios.get(slink)
        .then(({
          data
        }) => {
          const $ = cheerio.load(data)
          const link = [];
          const judul = [];
          const uploader = [];
          const format = [];
          const thumb = [];
          $('#post-items > li > article > div.content > header > h2 > a').each(function(a, b) {
            link.push($(b).attr('href'))
          })
          $('#post-items > li > article > div.content > header > h2 > a').each(function(c, d) {
            let jud = $(d).text();
            judul.push(jud)
          })
          $('#post-items > li > article > div.content > header > div > div.bb-cat-links > a').each(function(e, f) {
            let upl = $(f).text();
            uploader.push(upl)
          })
          $('#post-items > li > article > div.post-thumbnail > a > div > img').each(function(g, h) {
            thumb.push($(h).attr('src'))
          })
          for (let i = 0; i < link.length; i++) {
            format.push({
              title: judul[i],
              uploader: uploader[i],
              thumb: thumb[i],
              link: link[i]
            })
          }
          const result = {
            creator: "Wudysoft",
            data: format
          }
          resolve(result)
        })
        .catch(reject)
    })
  })
}

async function happymod(query) {
  return new Promise((resolve, reject) => {
    axios.get('https://www.happymod.com/search.html?q=' + query)
      .then(({
        data
      }) => {
        const $ = cheerio.load(data)
        const nama = [];
        const link = [];
        const rating = [];
        const thumb = [];
        const format = [];
        $('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > h3 > a').each(function(a, b) {
          let nem = $(b).text();
          nama.push(nem)
          link.push('https://happymod.com' + $(b).attr('href'))
        })
        $('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > div.clearfix > span').each(function(c, d) {
          let rat = $(d).text();
          rating.push(rat)
        })
        $('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > a > img').each(function(e, f) {
          thumb.push($(f).attr('data-original'))
        })
        for (let i = 0; i < 15; i++) {
          format.push({
            title: nama[i],
            thumb: thumb[i],
            rating: rating[i],
            link: link[i]
          })
        }
        const result = {
          creator: "Wudysoft",
          data: format
        }
        resolve(result)
      })
      .catch(reject)
  })
}

async function wattpad(query) {
  return new Promise((resolve, reject) => {
    axios.get('https://www.wattpad.com/search/' + query)
      .then(({
        data
      }) => {
        const $ = cheerio.load(data)
        const result = [];
        const linkk = [];
        const judull = [];
        const thumb = [];
        const dibaca = [];
        const vote = [];
        const bab = [];
        $('ul.list-group > li.list-group-item').each(function(a, b) {
          linkk.push('https://www.wattpad.com' + $(b).find('a').attr('href'))
          thumb.push($(b).find('img').attr('src'))
        })
        $('div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(1) > div.icon-container > div > span.stats-value').each(function(e, f) {
          let baca = $(f).text();
          dibaca.push(baca)
        })
        $('div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(2) > div.icon-container > div > span.stats-value').each(function(g, h) {
          let vot = $(h).text();
          vote.push(vot)
        })
        $('div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(3) > div.icon-container > div > span.stats-value').each(function(i, j) {
          let bb = $(j).text();
          bab.push(bb)
        })
        $('div.story-card-data.hidden-xxs > div.story-info > div.title').each(function(c, d) {
          let titel = $(d).text();
          judull.push(titel)
        })
        for (let i = 0; i < linkk.length; i++) {
          if (!judull[i] == '') {
            result.push({
              title: judull[i],
              readings: dibaca[i],
              votes: vote[i],
              thumb: thumb[i],
              link: linkk[i]
            })
          }
        }
        resolve(result)
      })
      .catch(reject)
  })
}

async function wallpaperHd(chara) {
  return new Promise((resolve, reject) => {
    axios.get('https://wall.alphacoders.com/search.php?search=' + chara + '&filter=4K+Ultra+HD')
      .then(({
        data
      }) => {
        const $ = cheerio.load(data)
        const result = [];
        $('div.boxgrid > a > picture').each(function(a, b) {
          result.push($(b).find('img').attr('src').replace('thumbbig-', ''))
        })
        resolve(result)
      })
      .catch(reject)
  })
}

async function anime(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.anime-planet.com/anime/all?name=${query}`)
      .then((data) => {
        const $ = cheerio.load(data.data)
        const result = [];
        const judul = [];
        const link = [];
        const thumb = [];
        $('#siteContainer > ul.cardDeck.cardGrid > li > a > h3').each(function(a, b) {
          let deta = $(b).text();
          judul.push(deta)
        })
        $('#siteContainer > ul.cardDeck.cardGrid > li > a').each(function(a, b) {
          link.push('https://www.anime-planet.com' + $(b).attr('href'))
        })
        $('#siteContainer > ul.cardDeck.cardGrid > li > a > div.crop > img').each(function(a, b) {
          thumb.push($(b).attr('src'))
        })
        for (let i = 0; i < judul.length; i++) {
          result.push({
            title: judul[i],
            thumb: thumb[i],
            link: link[i]
          })
        }
        resolve(result)
      })
      .catch(reject)
  })
}

async function ttp(text) {
  return new Promise((resolve, reject) => {
    const options = {
      method: 'POST',
      url: `https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
        "Cookie": "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1"
      },
      formData: {
        'TextToRender': text,
        'FontSize': '100',
        'Margin': '30',
        'LayoutStyle': '0',
        'TextRotation': '0',
        'TextColor': 'ffffff',
        'TextTransparency': '0',
        'OutlineThickness': '3',
        'OutlineColor': '000000',
        'FontName': 'Lekton',
        'ResultType': 'view'
      }
    };
    request(options, async function(error, response, body) {
      if (error) throw new Error(error)
      const $ = cheerio.load(body)
      const result = 'https://www.picturetopeople.org' + $('#idResultFile').attr('value')
      resolve({ status: 200, author: 'David132', result: result })
    });
  })
}

async function attp(text) {
  return new Promise(async (resolve, reject) => {
    const getid = await axios.get('https://id.bloggif.com/text')
    const id = cheerio.load(getid.data)('#content > form').attr('action')
    const options = {
      method: "POST",
      url: `https://id.bloggif.com${id}`,
      headers: {
        "content-type": 'application/x-www-form-urlencoded',
        "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
      },
      formData: {
        target: 1,
        text: text,
        glitter_id: Math.floor(Math.random() * 2821),
        font_id: 'lucida_sans_demibold_roman',
        size: 50,
        bg_color: 'FFFFFF',
        transparent: 1,
        border_color: '000000',
        border_width: 2,
        shade_color: '000000',
        shade_width: 1,
        angle: 0,
        text_align: 'center'
      },
    };
    request(options, async function(error, response, body) {
      if (error) return new Error(error)
      const $ = cheerio.load(body)
      const url = $('#content > div:nth-child(10) > a').attr('href')
      resolve({ status: 200, author: 'David132', result: 'https://id.bloggif.com' + url })
    })
  })
}

async function bingSearch(query) {
  return new Promise((resolve, reject) => {
    bing.search({ q: query, enforceLanguage: true }, function(err, resp) {
      if (err) {
        console.log(err)
      } else {
        const result = {
          status: 200,
          author: 'David132',
          ...resp
        }
        resolve(result)
      }
    })
  })
}

async function bingImage(query) {
  return new Promise((resolve, reject) => {
    bing.imageSearch({ q: query, enforceLanguage: true }, function(err, resp) {
      if (err) {
        console.log(err)
      } else {
        const result = {
          status: 200,
          author: 'David132',
          ...resp
        }
        resolve(result)
      }
    })
  })
}

function lirics(judul) {
  return new Promise(async (resolve, reject) => {
    axios.get('https://www.musixmatch.com/search/' + judul)
      .then(async ({ data }) => {
        const $ = cheerio.load(data)
        const hasil = {};
        let limk = 'https://www.musixmatch.com/'
        const link = limk + $('div.media-card-body > div > h2').find('a').attr('href')
        await axios.get(link)
          .then(({ data }) => {
            const $$ = cheerio.load(data)
            hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
            $$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function(a, b) {
              hasil.lirik = $$(b).find('span > p > span').text() + '\n' + $$(b).find('span > div > p > span').text()
            })
          })
        resolve(hasil)
      })
      .catch(reject)
  })
}

function teleSticker(url) {
  return new Promise(async (resolve, reject) => {
    packName = url.replace("https://t.me/addstickers/", "")
    data = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packName)}`, { method: "GET", headers: { "User-Agent": "GoogleBot" } })
    const hasil = []
    for (let i = 0; i < data.data.result.stickers.length; i++) {
      fileId = data.data.result.stickers[i].thumb.file_id
      data2 = await axios(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${fileId}`)
      result = {
        status: 200,
        author: 'David132',
        url: "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + data2.data.result.file_path
      }
      hasil.push(result)
    }
    resolve(hasil)
  })
}

function wattpadUser(query) {
  return new Promise((resolve, reject) => {
    axios.get(`https://www.wattpad.com/user/${query}`)
      .then(({
        data
      }) => {
        const $ = cheerio.load(data)
        $('#app-container > div > header ').each(function(a, b) {
          $('#profile-about > div > div ').each(function(c, d) {
            result = {
              status: 200,
              author: '@rasel.ganz',
              username: $(b).find('> div.badges > h1').text().trim(),
              works: $(b).find('> div.row.header-metadata > div:nth-child(1) > p:nth-child(1)').text(),
              reading_list: $(b).find('> div.row.header-metadata > div.col-xs-4.scroll-to-element > p:nth-child(1)').text(),
              followers: $(b).find('> div.row.header-metadata > div.col-xs-4.on-followers > p.followers-count').text(),
              joined: $(d).find('> ul > li.date.col-xs-12.col-sm-12 > span').text().trim().replace('Joined', ''),
              pp_picture: `https://img.wattpad.com/useravatar/${query}.128.851744.jpg`,
              about: $(d).find('> div.description > pre').text() ? $(d).find('> div.description > pre').text() : 'Not found'
            }
            resolve(result)
          })
        })
      })
      .catch(reject)
  })
}

function serverMc(country) {
  return new Promise((resolve, reject) => {
    axios.get(`https://minecraftpocket-servers.com/country/` + country).then(tod => {
      const $ = cheerio.load(tod.data)
      hasil = []
      $("tr").each(function(c, d) {
        ip = $(d).find("button.btn.btn-secondary.btn-sm").eq(1).text().trim().replace(':19132', '')
        port = '19132'
        versi = $(d).find("a.btn.btn-info.btn-sm").text()
        player = $(d).find("td.d-none.d-md-table-cell > strong").eq(1).text().trim()
        const Data = {
          ip: ip,
          port: port,
          versi: versi,
          player: player
        }
        hasil.push(Data)
      })
      resolve(hasil)
    }).catch(reject)
  })
}

async function pastegg(code, options = { "title": "DavidModzz", "description": "daag.16 on instagram", "nameFile": "Mishigang.txt" }) {
  if (!code) {
    throw new Error("Input code !!");
    return false;
  }
  if (options[0]) {
    throw new Error("Options not object");
  }
  if (options) {
    if (typeof options !== "object") {
      throw new Error("Options not object !!");
    }
  }
  !options.title ? (options.title = "Unknown Files") : options.title;
  !options.description
    ? (options.description = "Uploaded By Nathan")
    : options.description;
  !options.nameFile ? (options.nameFile = "uknown.txt") : options.nameFile;

  let hasilPost = await pasteGg.post({
    name: options.title, // Optional
    description: options.description,
    files: [
      {
        name: options.nameFile,
        content: {
          format: "text",
          value: `${code}`,
        },
      },
    ],
  });

  return hasilPost;
}

async function githubRepo(repo) {
  return new Promise(async (resolve, reject) => {
    await axios.get(`https://api.github.com/search/repositories?q=${repo}`)
      .then(response => {
        if (response.status == 200) {
          const results = response.data.items;
          data = {};
          data.date = 'rem-comp';
          data.count = response.data.total_count;
          data.result = [];
          data.warning = "It is strictly forbidden to reupload this code, copyright © 2022 by rem-comp";
          if (data.count != 0) {
            results.forEach((res) => {
              data.result.push({
                id: res.id,
                node_d: res.node_id,
                name_repo: res.name,
                full_name_repo: res.full_name,
                url_repo: res.html_url,
                description: res.description,
                git_url: res.git_url,
                ssh_url: res.ssh_url,
                clone_url: res.clone_url,
                svn_url: res.svn_url,
                homepage: res.homepage,
                stargazers: res.stargazers_count,
                watchers: res.watchers,
                forks: res.forks,
                default_branch: res.default_branch,
                language: res.language,
                is_private: res.private,
                is_fork: res.fork,
                created_at: res.created_at,
                updated_at: res.updated_at,
                pushed_at: res.pushed_at,
              });
            });
          } else {
            data.items = "Repositories not found";
          }
          resolve(data);
        } else {
          reject({
            code: 404,
            message: "Internal Server Error, Repeat in a few more moments, if there is still an error, please contact the coder"
          });
        }
      })
      .catch(err => {
        reject(err);
      });
  });
}

function isTikTokLink(url) {
  const regex = /^(https?:\/\/)?(www\.)?tiktok\.com\/@?[a-zA-Z0-9_]+(\/video\/[a-zA-Z0-9]+)?/;
  return regex.test(url);
}

module.exports.styleText = styleText
module.exports.pinterest = pinterest
module.exports.ringtone = ringtone
module.exports.wikimedia = wikimedia
module.exports.tiktokStalk = tiktokStalk
module.exports.igStalk = igStalk
module.exports.twitter = twitter
module.exports.wallpaper = wallpaper
module.exports.pShadow = pShadow
module.exports.stickerSearch = stickerSearch
module.exports.searchGore = searchGore
module.exports.happymod = happymod
module.exports.wattpad = wattpad
module.exports.wallpaperHd = wallpaperHd
module.exports.anime = anime
module.exports.ttp = ttp
module.exports.attp = attp
module.exports.bingSearch = bingSearch
module.exports.bingImage = bingImage
module.exports.lirics = lirics
module.exports.teleSticker = teleSticker
module.exports.wattpadUser = wattpadUser
module.exports.serverMc = serverMc
module.exports.pastegg = pastegg
module.exports.githubRepo = githubRepo
module.exports.isTikTokLink = isTikTokLink

