const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request')
const chalk = require('chalk')
const fs = require("fs")
const { color, bgcolor } = require('./color')
const gis = require("g-i-s")
const ytdl = require('ytdl-core');
const yts = require("yt-search");
const fetch = require("node-fetch");
const FormData = require("form-data");
const cookie = require("cookie");
const token = `e2dbd0c0-d21b-45d2-b60f-d49940f2d0e7`
const vm = require ('vm')



async function savefromV2() {
    let body = new URLSearchParams({
        "sf_url": encodeURI(arguments[0]),
        "sf_submit": "",
        "new": 2,
        "lang": "id",
        "app": "",
        "country": "id",
        "os": "Windows",
        "browser": "Chrome",
        "channel": " main",
        "sf-nomad": 1
    });
    let {
        data
    } = await axios({
        "url": "https://worker.sf-tools.com/savefrom.php",
        "method": "POST",
        "data": body,
        "headers": {
            "content-type": "application/x-www-form-urlencoded",
            "origin": "https://id.savefrom.net",
            "referer": "https://id.savefrom.net/",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36"
        }
    });
    let exec = '[]["filter"]["constructor"](b).call(a);';
    data = data.replace(exec, `\ntry {\ni++;\nif (i === 2) scriptResult = ${exec.split(".call")[0]}.toString();\nelse (\n${exec.replace(/;/, "")}\n);\n} catch {}`);
    let context = {
        "scriptResult": "",
        "i": 0
    };
    vm.createContext(context);
    new vm.Script(data).runInContext(context);
    return JSON.parse(context.scriptResult.split("window.parent.sf.videoResult.show(")?.[1].split(");")?.[0])
}

async function ChatGpt(query) {
  const requestData = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Referer": "https://2chat.c3r.ink/",
      "accept": "application/json, text/plain, */*"
    },
    body: JSON.stringify({
      prompt: query,
      options: {},
      regenerate: false,
      roomId: 1002,
      uuid: Date.now(),
      systemMessage: "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.",
      top_p: 1,
      temperature: 0.8
    })
  };

  const response = await fetch("https://chatapicn.a3r.fun/api/chat-process", requestData);
  const data = await response.text();
  // Handle the response data here
  let out = JSON.parse(data.split("\n").pop());
  return out;
}


async function searchfilm (query) {
  let list = [];
  try {
    let page = await axios.get(`https://www.filmapik21.sbs/?s=${query}`).catch(err => err.response);
    let html = page.data;
    let $ = cheerio.load(html);
    $(".search-page > .result-item", html).each(function() {
      let title = $(this).find("article > .details > .title").text();
      let rating = $(this).find("article > .details > .meta").text();
      let sinopsis = $(this).find("article > .details > .contenido").text();
      let thumb = $(this).find("article > .image > .thumbnail.animation-2 > a > img").attr("src");
      let url = $(this).find("article > .image > .thumbnail.animation-2 > a").attr("href");
      list.push({
        title,
        rating,
        sinopsis,
        thumb,
        url
      });
    });
    return list;
  } catch (error) {
    console.error(error);
    return [];
  }
};


const tafsir = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://tafsirq.com/topik/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = []
                $('body > div:nth-child(4) > div > div.col-md-6 > div ').each(function(a, b) {
                    let result = {
                    status: 200,
                    surah: $(b).find('> div.panel-heading.panel-choco > div > div > a').text(),
                    tafsir: $(b).find('> div.panel-body.excerpt').text().trim(),
                    type: $(b).find('> div.panel-heading.panel-choco > div > div > span').text(),
                    source: $(b).find('> div.panel-heading.panel-choco > div > div > a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}

async function instagram4(url) {
      let res = await axios("https://indown.io/");
      let _$ = cheerio.load(res.data);
      let referer = _$("input[name=referer]").val();
      let locale = _$("input[name=locale]").val();
      let _token = _$("input[name=_token]").val();
      let { data } = await axios.post(
        "https://indown.io/download",
        new URLSearchParams({
          link: url,
          referer,
          locale,
          _token,
        }),
        {
          headers: {
            cookie: res.headers["set-cookie"].join("; "),
          },
        }
      );
      let $ = cheerio.load(data);
      let result = [];
      let __$ = cheerio.load($("#result").html());
      __$("video").each(function () {
        let $$ = $(this);
        result.push({
          type: "video",
          thumbnail: $$.attr("poster"),
          url: $$.find("source").attr("src"),
        });
      });
      __$("img").each(function () {
        let $$ = $(this);
        result.push({
          type: "image",
          url: $$.attr("src"),
        });
      });

      return result;
}


async function capcutdl(Url) {
  try {
    let { request } = await axios.get(Url);
    let res = request.res.responseUrl;
    let token = res.match(/\d+/)[0];
    const { data } = await axios({
      url: `https://ssscap.net/api/download/${token}`,
      method: 'GET',
      headers: {
        'Cookie': 'sign=2cbe441f7f5f4bdb8e99907172f65a42; device-time=1685437999515'
      }
    });    
return data
  } catch (error) {
    console.log(error);
  }
}


async function instagram3(match) {
const result = []
				const form = {
					url: match,
					submit: '',
				}
				const { data } = await axios(`https://downloadgram.org/`, {
					method: 'POST',
					data: form
				})
				const $ = cheerio.load(data)
                $('#downloadhere > a').each(function (a,b) {
				const url = $(b).attr('href')
				if (url) result.push(url)
			})
            return result
}


async function mediafiredll(url) {
const res = await axios.get(`https://www-mediafire-com.translate.goog/${url.replace('https://www.mediafire.com/','')}?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp`);
const $ = cheerio.load(res.data);
const link = $('#downloadButton').attr('href');
const name = $('body > main > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').attr('title').replaceAll(' ','').replaceAll('\n','');
const date = $('body > main > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text()
const size = $('#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '').replaceAll(' ','');
let mime = '';
let rese = await axios.head(link)
mime = rese.headers['content-type']
return { name ,size ,date ,mime ,link };
  }




async function instagram2(url) {
    let res = await axios("https://indown.io/")
    let _$ = cheerio.load(res.data)
    let referer = _$("input[name=referer]").val()
    let locale = _$("input[name=locale]").val()
    let _token = _$("input[name=_token]").val()
    let {
        data
    } = await axios.post("https://indown.io/download", new URLSearchParams({
        link: url,
        referer,
        locale,
        _token
    }), {
        headers: {
            cookie: res.headers["set-cookie"].join("; ")
        }
    })
    let $ = cheerio.load(data)
    let result = []
    let __$ = cheerio.load($("#result").html())
    __$("video").each(function() {
        let $$ = $(this)
        result.push({
            type: "video",
            thumbnail: $$.attr("poster"),
            url: $$.find("source").attr("src")
        })
    })
    __$("img").each(function() {
        let $$ = $(this)
        result.push({
            type: "image", 
            url: $$.attr("src")
        })
    })
   //console.log(`${__$}`)
    return result 
}




async function cekkuota() {
  return new Promise(async (resolve, reject) => {

    function bar(p) {
      let titik = "▒".repeat(10).split("");
      for (let i = 1; i <= p; i++) {
        if (i % 10 === 0) {
          titik[(i / 10) - 1] = "█";
        }
      }
      return "[ " + titik.join(" ") + " ]";
    }

    try {
      /*
      let getuser = await axios({
        headers: {
          "x-app-version": "8.11.0",
          "Authorization": `${query}`,
          "User-Agent": "okhttp/4.2.2"
        },
        method: "GET",
        url: "https://profile.api.axis.co.id/getuser"
      });

      let { msisdn } = JSON.parse(atob(getuser.data.data));
      console.log("*NOMOR: " + msisdn + "*\n");
*/
      let quota = await axios({
        headers: {
          "x-app-version": "8.11.0",
          "Authorization": `e2dbd0c0-d21b-45d2-b60f-d49940f2d0e7`,
          "User-Agent": "okhttp/4.2.2"
        },
        method: "GET",
        url: "https://quota.api.axis.co.id/quota"
      });

      let { result } = JSON.parse(atob(quota.data.data));
      let sisakuota = "";
      for (let kuota of result.detail) {
        let dateberlaku = new Date(kuota.benefitData.activeUntil);
        let bulan0 = dateberlaku.toLocaleDateString('id', { month: 'long' });
        let bulan = bulan0[0] + bulan0[1] + bulan0[2];
        sisakuota += "*" + kuota.name + "*\n" + bar(kuota.percentRemaining) + "\n" + kuota.remaining + "/" + kuota.total + " s.d " + dateberlaku.getDate() + " " + bulan + " " + dateberlaku.getFullYear() + " " + dateberlaku.getHours() + ":" + dateberlaku.getMinutes() + "\n\n";
      }
      resolve(sisakuota);
    } catch (error) {
      reject(error);
    }
  });
  }


async function tele (query) {
    return new Promise((resolve) => {
        axios.get(`https://getstickerpack.com/stickers?query=${query}`).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            const link = []
            $('#stickerPacks > div > div:nth-child(3) > div > a').each(function(a, b) {
                link.push($(b).attr('href'))
            })
            let rand = link[Math.floor(Math.random() * link.length)]
            axios.get(rand).then(({
                data
            }) => {
                const $$ = cheerio.load(data)
                const url = []
                $$('#stickerPack > div > div.row > div > img').each(function(a, b) {
                    url.push($$(b).attr('src').split('&d=')[0])
                })
                resolve({
                    creator: 'Fajar Ihsana',
                    title: $$('#intro > div > div > h1').text(),
                    author: $$('#intro > div > div > h5 > a').text(),
                    author_link: $$('#intro > div > div > h5 > a').attr('href'),
                    sticker: url,
                })
            })
        })
    })
}



async function emoji (emoji)  {
    return new Promise((resolve, reject) => {
        axios.get(`https://emojipedia.org/search/?q=${encodeURIComponent(emoji)}`).then(({
            data
        }) => {
            const $ = cheerio.load(data)
            resolve({
                creator: 'Fajar Ihsana',
                nama: $('body > div.container > div.content > article > h1').text(),
                result: {
                    apple: $('body').find('li:nth-child(1) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    google: $('body').find('li:nth-child(2) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    samsung: $('body').find('li:nth-child(3) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    microsoft: $('body').find('li:nth-child(4) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    whatsapp: $('body').find('li:nth-child(5) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    twitter: $('body').find('li:nth-child(6) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    facebook: $('body').find('li:nth-child(7) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    skype: $('body').find('li:nth-child(8) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    joypixels: $('body').find('li:nth-child(9) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    openemoji: $('body').find('li:nth-child(10) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    emojidex: $('body').find('li:nth-child(11) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    messenger: $('body').find('li:nth-child(12) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    lg: $('body').find('li:nth-child(13) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    htc: $('body').find('li:nth-child(14) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    mozilla: $('body').find('li:nth-child(15) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    softbank: $('body').find('li:nth-child(16) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                    docomo: $('body').find('li:nth-child(17) > div.vendor-container.vendor-rollout-target > div.vendor-image > img').attr('src'),
                },
            })
        })
    })
}

async function ytPlayMp4(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = ytdl.getVideoID(url[0])
                const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].container == 'mp4' && pormat[i].hasVideo == true && pormat[i].hasAudio == true) {
                        let vid = pormat[i]
                        video.push(vid.url)
                    }
                   }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: video[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
}

async function ytPlayMp3(query) {
    return new Promise((resolve, reject) => {
        try {
            const search = yts(query)
            .then((data) => {
                const url = []
                const pormat = data.all
                for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].type == 'video') {
                        let dapet = pormat[i]
                        url.push(dapet.url)
                    }
                }
                const id = ytdl.getVideoID(url[0])
                const yutub = ytdl.getInfo(`https://www.youtube.com/watch?v=${id}`)
                .then((data) => {
                    let pormat = data.formats
                    let audio = []
                    let video = []
                    for (let i = 0; i < pormat.length; i++) {
                    if (pormat[i].mimeType == 'audio/webm; codecs=\"opus\"') {
                        let aud = pormat[i]
                        audio.push(aud.url)
                    }
                    }
                    const title = data.player_response.microformat.playerMicroformatRenderer.title.simpleText
                    const thumb = data.player_response.microformat.playerMicroformatRenderer.thumbnail.thumbnails[0].url
                    const channel = data.player_response.microformat.playerMicroformatRenderer.ownerChannelName
                    const views = data.player_response.microformat.playerMicroformatRenderer.viewCount
                    const published = data.player_response.microformat.playerMicroformatRenderer.publishDate
                    const result = {
                    status: true,
                    code: 200,
                    creator: '@tkim×',
                    title: title,
                    thumb: thumb,
                    channel: channel,
                    published: published,
                    views: views,
                    url: audio[0]
                    }
                    return(result)
                })
                return(yutub)
            })
            resolve(search)
        } catch (error) {
            reject(error)
        }
        console.log(error)
    })
                      }



async function ephoto(url, texk) {
      let form = new FormData();
      let gT = await axios.get(url, {
        headers: {
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        },
      });
      let $ = cheerio.load(gT.data);
      let text = texk;
      let token = $('input[name=token]').val();
      let build_server = $('input[name=build_server]').val();
      let build_server_id = $('input[name=build_server_id]').val();
      form.append('text[]', text);
      form.append('token', token);
      form.append('build_server', build_server);
      form.append('build_server_id', build_server_id);
      let res = await axios({
        url: url,
        method: 'POST',
        data: form,
        headers: {
          Accept: '*/*',
          'Accept-Language': 'en-US,en;q=0.9',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
          cookie: gT.headers['set-cookie']?.join('; '),
          ...form.getHeaders(),
        },
      });
      let $$ = cheerio.load(res.data);
      let json = JSON.parse($$('input[name=form_value_input]').val());
      json['text[]'] = json.text;
      delete json.text;
      let { data } = await axios.post(
        'https://en.ephoto360.com/effect/create-image',
        new URLSearchParams(json),
        {
          headers: {
            'user-agent':
              'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
            cookie: gT.headers['set-cookie'].join('; '),
          },
        }
      );
      return build_server + data.image;
    }

async function surah(query){ 
    let { data }= await axios.get(`https://litequran.net/${query}`)
    const $ = cheerio.load(data)
    const Result = []
    const Isi = []
    var surah = $('body > main > article > h1').text()
    var bismillah = $('body > main > article > p').text()
    $('body > main > article > ol > li:nth-child(n)').each((i, e) => {
      const arabic = $(e).find('p.arabic').text()
      const baca = $(e).find('p.translate').text()
      const arti = $(e).find('p.meaning').text()
      Isi.push({
        arabic,
        baca,
        arti,
      });
    });
    Result.push({surah, bismillah}, Isi)
    return Result
}


async function listsurah(){
  let { data }= await axios.get('https://litequran.net/')
  const $ = cheerio.load(data)
  const Result = []
  $('body > main > ol > li:nth-child(n)').each((i, e) => {
    const name_surah = $(e).find('a').text()
    const link = 'https://litequran.net/' + $(e).find('a').attr('href')
    Result.push({
      link,
      name_surah,
    });
  });
  return Result
}

async function selectSurah(link){ 
    let { data }= await axios.get(link)
    const $ = cheerio.load(data)
    const Result = []
    const Isi = []
    var surah = $('body > main > article > h1').text()
    var bismillah = $('body > main > article > p').text()
    $('body > main > article > ol > li:nth-child(n)').each((i, e) => {
      const arabic = $(e).find('p.arabic').text()
      const baca = $(e).find('p.translate').text()
      const arti = $(e).find('p.meaning').text()
      Isi.push({
        arabic,
        baca,
        arti,
      });
    });
    Result.push({surah, bismillah}, Isi)
    return Result
	}

async function getSurah(surahIndex) {
  const surahList = await listsurah();
  if (surahIndex < 1 || surahIndex > surahList.length) {
    return "Nomor surah tidak valid.";
  }
  const selectedSurah = surahList[surahIndex - 1];
  const surahContent = await selectSurah(selectedSurah.link);
  let response = `*Berikut ${surahContent[0].surah}*\n\n`;
  surahContent[1].forEach((ayah) => {
    response += `${ayah.arabic}\n${ayah.baca}\n${ayah.arti}\n\n\n`;
  });
  return response;
}


const clean = (data) => {
  let regex = /(<([^>]+)>)/gi;
  data = data.replace(/(<br?\s?\/>)/gi, " \n");
  return data.replace(regex, "");
};

async function shortener(url) {
  return url;
}

async function Tiktok(query) {
  let response = await axios("https://lovetik.com/api/ajax/search", {
    method: "POST",
    data: new URLSearchParams(Object.entries({ query })),
  });

  result = {};

  result.creator = "takim";
  result.title = clean(response.data.desc);
  result.author = clean(response.data.author);
  result.nowm = await shortener(
    (response.data.links[0].a || "").replace("https", "http")
  );
  result.watermark = await shortener(
    (response.data.links[1].a || "").replace("https", "http")
  );
  result.audio = await shortener(
    (response.data.links[2].a || "").replace("https", "http")
  );
  result.thumbnail = await shortener(response.data.cover);
  return result;
}


async function ffstalk(userId) {
  let data = {
    "voucherPricePoint.id": 8050,
    "voucherPricePoint.price": "",
    "voucherPricePoint.variablePrice": "",
    "email": "",
    "n": "",
    "userVariablePrice": "",
    "order.data.profile": "",
    "user.userId": userId,
    "voucherTypeName": "FREEFIRE",
    "affiliateTrackingId": "",
    "impactClickId": "",
    "checkoutId": "",
    "tmwAccessToken": "",
    "shopLang": "in_ID",
  }
  let ff = await axios({
    "headers": {
    "Content-Type": "application/json; charset\u003dutf-8"
    },
    "method": "POST",
    "url": "https://order.codashop.com/id/initPayment.action",
    "data": data
  })
  return {
    id: userId,
    nickname: ff.data["confirmationFields"]["roles"][0]["role"]
  }
}

async function mlstalk(id, zoneId) {
    return new Promise(async (resolve, reject) => {
      axios
        .post(
          'https://api.duniagames.co.id/api/transaction/v1/top-up/inquiry/store',
          new URLSearchParams(
            Object.entries({
              productId: '1',
              itemId: '2',
              catalogId: '57',
              paymentId: '352',
              gameId: id,
              zoneId: zoneId,
              product_ref: 'REG',
              product_ref_denom: 'AE',
            })
          ),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Referer: 'https://www.duniagames.co.id/',
              Accept: 'application/json',
            },
          }
        )
        .then((response) => {
          resolve(response.data.data.gameDetail)
        })
        .catch((err) => {
          reject(err)
        })
    })
}


async function mediafire (url) {
   const res = await axios.get(url) 
   const $ = cheerio.load(res.data)
   const link = $('a#downloadButton').attr('href')
   const size = $('a#downloadButton').text().replace('Download', '').replace('(', '').replace(')', '').replace('\n', '').replace('\n', '').replace('                         ', '')
   const seplit = link.split('/')
   const nama = seplit[5]
   mime = nama.split('.')
   mime = mime[1]
   return { nama, mime, size, link }
}

async function post(url, formdata = {}, cookies) {
  let encode = encodeURIComponent;
  let body = Object.keys(formdata)
    .map((key) => {
      let vals = formdata[key];
      let isArray = Array.isArray(vals);
      let keys = encode(key + (isArray ? "[]" : ""));
      if (!isArray) vals = [vals];
      let out = [];
      for (let valq of vals) out.push(keys + "=" + encode(valq));
      return out.join("&");
    })
    .join("&");
  return await fetch(`${url}?${body}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: cookies,
    },
  });
}

async function textpro(url, text) {
  if (!/^https:\/\/textpro\.me\/.+\.html$/.test(url))
    throw new Error("Url Salah!!");
  const geturl = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "GoogleBot",
    },
  });
  const caritoken = await geturl.text();
  let hasilcookie = geturl.headers
    .get("set-cookie")
    .split(",")
    .map((v) => cookie.parse(v))
    .reduce((a, c) => {
      return { ...a, ...c };
    }, {});
  hasilcookie = {
    __cfduid: hasilcookie.__cfduid,
    PHPSESSID: hasilcookie.PHPSESSID,
  };
  hasilcookie = Object.entries(hasilcookie)
    .map(([name, value]) => cookie.serialize(name, value))
    .join("; ");
  const $ = cheerio.load(caritoken);
  const token = $('input[name="token"]').attr("value");
  const form = new FormData();
  if (typeof text === "string") text = [text];
  for (let texts of text) form.append("text[]", texts);
  form.append("submit", "Go");
  form.append("token", token);
  form.append("build_server", "https://textpro.me");
  form.append("build_server_id", 1);
  const geturl2 = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent": "GoogleBot",
      Cookie: hasilcookie,
      ...form.getHeaders(),
    },
    body: form.getBuffer(),
  });
  const caritoken2 = await geturl2.text();
  const token2 = /<div.*?id="form_value".+>(.*?)<\/div>/.exec(caritoken2);
  if (!token2) throw new Error("Token Tidak Ditemukan!!");
  const prosesimage = await post(
    "https://textpro.me/effect/create-image",
    JSON.parse(token2[1]),
    hasilcookie
  );
  const hasil = await prosesimage.json();
  return `https://textpro.me${hasil.fullsize_image}`;
}



//Pinterest
async function pinterest(query) {
	return new Promise((resolve, reject) => {
	  let err = { status: 404, message: "Terjadi kesalahan" }
	  gis({ searchTerm: query + ' site:id.pinterest.com', }, (er, res) => {
	   if (er) return err
	   let hasil = {
		  status: 200,
		  creator: '@takim._×',
		  result: []
	   }
	   res.forEach(x => hasil.result.push(x.url))
	   resolve(hasil)
	  })
	})
}


//KodePos
async function kodepos(kota) {
return new Promise(async (resolve, reject) => {
let postalcode = 'https://carikodepos.com/';
let url = postalcode+'?s='+kota;
await request.get({
headers: {
'Accept': 'application/json, text/javascript, */*;',
'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4209.3 Mobile Safari/537.36',
'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
'Origin': postalcode,
'Referer': postalcode
},
url: url,
}, function(error, response, body) {
if (error) return reject(error);
let $ = cheerio.load(body);
var search = $('tr');
if (!search.length) return reject('No result could be found');
var results = [];
search.each(function(i) {
if (i != 0) {
var td = $(this).find('td');
var result = {};
td.each(function(i) {
var value = $(this).find('a').html();
var key = (i == 0) ? 'province' : (i == 1) ? 'city' : (i == 2) ? 'subdistrict' : (i == 3) ? 'urban' : 'postalcode';
result[key] = value;
})
results.push(result);
}
});
return resolve(results);
console.log(results)
});
});
};


async function igdl(url_media) {

    return new Promise(async (resolve,reject)=>{

        const BASE_URL = "https://instasupersave.com/"

        

        //New Session = Cookies

        try {

            const resp = await axios(BASE_URL);

            const cookie = resp.headers["set-cookie"]; // get cookie from request

            const session = cookie[0].split(";")[0].replace("XSRF-TOKEN=","").replace("%3D", "")

            

            //REQUEST CONFIG

            var config = {

                method: 'post',

                url: `${BASE_URL}api/convert`,

                headers: { 

                    'origin': 'https://instasupersave.com', 

                    'referer': 'https://instasupersave.com/pt/', 

                    'sec-fetch-dest': 'empty', 

                    'sec-fetch-mode': 'cors', 

                    'sec-fetch-site': 'same-origin', 

                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 Edg/107.0.1418.52', 

                    'x-xsrf-token': session, 

                    'Content-Type': 'application/json', 

                    'Cookie': `XSRF-TOKEN=${session}; instasupersave_session=${session}`

                },

                data : {

                    url: url_media

                }

            };



            //REQUEST

            axios(config).then(function (response) {

                let ig = []

                if(Array.isArray(response.data)){

                    response.data.forEach(post => { ig.push(post.sd === undefined ? post.thumb : post.sd.url)})

                } else {

                    ig.push(response.data.url[0].url)    

                }

                

                resolve({

                    results_number : ig.length,

                    url_list: ig

                })

            })

            .catch(function (error) {

                reject(error.message)

            })

        } catch(e){

            reject(e.message)

        }

    })

}

async function porno() {
    return new Promise((resolve, reject) => {
        axios.get('https://tikporntok.com/?random=1')
        .then((res) => {
            const $ = cheerio.load(res.data)
            const hasil = {}
            hasil.title = $('article > h1').text()
            hasil.source = $('article > div.video-wrapper.vxplayer').attr('data-post') || 'Web Not Response'
            hasil.thumb = $('article > div.video-wrapper.vxplayer > div.vx_el').attr('data-poster') || 'https://4.bp.blogspot.com/-hyMqjmQQq4o/W6al-Rk4IpI/AAAAAAAADJ4/m-lVBA_GC9Q5d4BIQg8ZO3fYmQQC3LqSACLcBGAs/s1600/404_not_found.png'
            hasil.desc = $('article > div.intro').text()
            hasil.upload = $('article > div.single-pre-meta.ws.clearfix > time').text()
            hasil.like = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(1) > span').text()
            hasil.dislike = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(2) > span').text()
            hasil.favorite = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(3) > span').text()
            hasil.views = $('article > div.single-pre-meta.ws.clearfix > div > span:nth-child(4) > span').text()
            hasil.tags = $('article > div.post-tags').text()
            hasil.video = $('article > div.video-wrapper.vxplayer > div.vx_el').attr('src') || $('article > div.video-wrapper.vxplayer > div.vx_el').attr('data-src') || 'https://4.bp.blogspot.com/-hyMqjmQQq4o/W6al-Rk4IpI/AAAAAAAADJ4/m-lVBA_GC9Q5d4BIQg8ZO3fYmQQC3LqSACLcBGAs/s1600/404_not_found.png'
            resolve(hasil)
        })
    })
}

module.exports = {savefromV2, ChatGpt, searchfilm,getSurah, tafsir, instagram4, capcutdl, instagram3, mediafiredll, cekkuota,tele, instagram2, ytPlayMp4, ytPlayMp3, kodepos, pinterest, igdl, textpro, mediafire, ffstalk, mlstalk, Tiktok,surah, listsurah, porno, ephoto, emoji}





let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.bgGreen(color("[  UPDATE ]", "black")),chalk.white(`${__filename}`) )
delete require.cache[file]
require(file)
})