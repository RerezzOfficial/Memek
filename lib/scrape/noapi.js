    const cheerio = require('cheerio')
const axios = require('axios')
const _url = require('url')
const cookie = require("cookie")
const chalk = require('chalk')
const bing = require('bing-scraper')
const request = require('request');
const child = require('child_process')
const FormData = require('form-data')
const qs = require('qs')
const fs = require('fs')
const Jimp = require('jimp')
const https = require('https');
const yt = require('ytdl-core')
const yts = require('yt-search')
const mime = require('mime-types')
const ffmpeg = require('fluent-ffmpeg')
const headers = {
	"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
	"cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg"
}
function _token(host) {
	return new Promise(async (resolve, reject) => {
		axios.request({
			url: host, method: 'GET', headers
		}).then(({ data }) => {
			let $ = cheerio.load(data)
			let token = $('#token').attr('value')
			resolve(token)
		})
	})
}

	duration = (value) => {
      const sec = parseInt(value, 10)
      let hours = Math.floor(sec / 3600)
      let minutes = Math.floor((sec - (hours * 3600)) / 60)
      let seconds = sec - (hours * 3600) - (minutes * 60)
      if (hours < 10) hours = '0' + hours
      if (minutes < 10) minutes = '0' + minutes
      if (seconds < 10) seconds = '0' + seconds
      if (hours == parseInt('00')) return minutes + ':' + seconds
      return hours + ':' + minutes + ':' + seconds
   }

 bingimage = (query) => {
	return new Promise((resolve, reject) => {
		bing.imageSearch({q: query,enforceLanguage: true}, function(err, resp) {
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

 bingsearch = (query) => {
	return new Promise((resolve, reject) => {
		bing.search({q: query,enforceLanguage: true}, function(err, resp) {
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

blacbox = async(query) => {
	return new Promise(async(resolve,reject) => {		
axios.post("https://www.useblackbox.io/chat-request-v4", {
  "textInput": query,
  "allMessages": [
    {
      "user": query
    }
  ],
  "stream": "",
  "clickedContinue": false
}).then(res => { 
let yanz = res.data.response[0][0]
 resolve(yanz) 
})
})
}
openAi = async (you_qus) => {
  try {
    const response = await fetch("https://forward.free-chat.asia/v1/chat/completions", {
      method: "POST",
      headers: {
        "Origin": "https://anse.free-chat.asia",
        "Referer": "https://anse.free-chat.asia/",
        "Authorization": "Bearer undefined", // Replace 'authToken' with your actual token
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [{ role: "user", content: you_qus }],
        model: "gpt-3.5-turbo-16k",
        temperature: 0.7,
        max_tokens: 4096,
        stream: false
      })
    });
    const data = await response.json();
    return data.choices[0].message.content;
    console.log(data.choices[0].message.content)
  } catch (error) {
    console.log(error);
  }
}



 aiimg = async (query) => {
  try {
    const formData = new FormData();
    formData.append('action', 'createAIImages');
    formData.append('returnUrl', '/')
    formData.append('searchType', 'aiPrompt')
    formData.append('aiPrompt', query)
    formData.append('numPerPage', '12');
    formData.append('currentPage', '1');    
    const response = await fetch("https://freeimagegenerator.com/queries/queryCreateAIImagesFromTextPrompt.php?server=1", {
      method: "POST",
      body: formData
    });  
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}



ghstalk = (username) => {
      return new Promise(async (resolve) => {
         try {
            let json = await Func.fetchJson('https://api.github.com/users/' + username)
            if (typeof json.message != 'undefined') return resolve({
               creator: global.creator,
               status: false
            })
            resolve({
               creator: global.creator,
               status: true,
               data: json
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

bibbleDays = () => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get("https://www.bible.com/id/verse-of-the-day")
        .then(({ data }) => {
          const $ = cheerio.load(data);
          const title = $("amp-img.br2.img-wrap").attr("alt");
          const date = $("p.f5.fw4.yv-gray25.mt0.mb0").text();
          const thumbnail =
            "https://" +
            $("amp-img.br2.img-wrap").attr("src").split("https://")[1];
          const url =
            "https://www.bible.com" +
            $("div.relative.img-wrap > a").attr("href");
          const ayat = $("p.yv-gray50.mt0.mb2").text();
          resolve({
            title,
            date,
            thumbnail,
            url,
            ayat,
          });
        })
        .catch(reject);
    });
  }

distance = async (from, to) => {
    let getFrom = await axios.get("http://id.toponavi.com/searchcity1/" + from);
    let getTo = await axios.get("http://id.toponavi.com/searchcity1/" + to);
    const execFrom =
      /onclick='addValue1\(this.getAttribute\("rel"\), "(.*?)"\)'/.exec(
        getFrom.data,
      )[1];
    const execTo =
      /onclick='addValue1\(this.getAttribute\("rel"\), "(.*?)"\)'/.exec(
        getTo.data,
      )[1];
    const url = "http://id.toponavi.com/" + execFrom + "-" + execTo;
    let result = {};
    try {
      const getDistance = await axios.request({
        method: "GET",
        url,
        timeout: 5000,
        withCredentials: true,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 9; CPH1923) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.101 Mobile Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          Referer: url,
          "Accept-Language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
        },
      });
      if (isAxiosError()) throw "Axios error";
      const $ = cheerio.load(getDistance.data);
      const getInformation = $("div.tn_info_text").text();
      result.distance =
        /koordinat — (.*?)mil./g.exec(getInformation)[1] + "mil";
      result.description = getInformation.trim().replace(/\t/g, "");
    } catch (error) {
      throw error;
    }
    return result;
  }
  
sfileDown2 = (url) => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(url)
        .then(({ data }) => {
          if (isAxiosError()) throw "Axios error";
          let $ = cheerio.load(data);
          let title = /<b>(.*?)<\/b>/g.exec(data)[1].trim();
          let mimetype = $("div.list").eq(0).text().split(" - ")[1];
          let owner = $("div.list:nth-child(4) > a:nth-child(2)").text();
          let uploaded = $("div.list").eq(2).text().split(":")[1].trim();
          let downloads = $("div.list").eq(3).text().split(":")[1].trim();
          let size = $("div.list").eq(5).find("a").text().split(/\(|\)/g)[1];
          let link = $("div.list").eq(5).find("a").attr("href");
          let result = {
            title,
            owner,
            mimetype,
            uploaded,
            downloads,
            size,
            url: link,
          };
          resolve(result);
        })
        .catch(reject);
    });
  }
  
sfileSearch = (query) => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(`https://sfile.mobi/search.php?q=${query}&search=Search`)
        .then(({ data }) => {
          const $ = cheerio.load(data);
          let result = new Array();
          $("div.w3-card.white > div.list")
            .get()
            .map((m) => {
              let url = $(m).find("a").attr("href");
              let title = $(m).find("a").text().trim();
              let size = $(m).text().split(/\(|\)/g)[1];
              result.push({
                title,
                url,
                size,
              });
            });
          resolve(result.filter((a) => a.url !== undefined));
        })
        .catch(reject);
    });
  }
  
apkmirror = (query) => {
    return new Promise(async (resolve, reject) => {
      await axios
        .get(
          "https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=" +
            query,
        )
        .then(({ data }) => {
          if (isAxiosError()) throw "Axios error";
          const $ = cheerio.load(data);
          let title = new Array();
          let developer = new Array();
          let update = new Array();
          let size = new Array();
          let downCount = new Array();
          let version = new Array();
          let url = new Array();
          let result = new Array();
          $("div#content > div > div > div.appRow > div > div").each(
            function (a, b) {
              let judul = $(this).find("div > h5 > a").text();
              let dev = $(this).find("div > a").text().replace(/\n/g, "");
              let link = $(this)
                .find("div > div.downloadIconPositioning > a")
                .attr("href");
              if (judul !== "") title.push(judul);
              if (dev !== "") developer.push(dev);
              if (link !== undefined) url.push(link);
            },
          );
          $(
            "div#content > div > div > div.infoSlide > p > span.infoSlide-value",
          ).each(function (c, d) {
            let serialize = $(this).text();
            if (serialize.match("MB")) {
              size.push(serialize.trim());
            } else if (serialize.match("UTC")) {
              update.push(serialize.trim());
            } else if (!isNaN(serialize) || serialize.match(",")) {
              downCount.push(serialize.trim());
            } else {
              version.push(serialize.trim());
            }
          });
          for (let i = 0; i < url.length; i++) {
            result.push({
              title: title[i],
              developer: developer[i],
              version: version[i],
              updated: update[i],
              downloadCount: downCount[i] || "1,000",
              size: size[i],
              url: "https://www.apkmirror.com" + url[i],
            });
          }
          resolve(result);
        })
        .catch(reject);
    });
  }
  
randomGoore = async () => {
    const getData = await axios.get(
      "https://deepgoretube.site/page/" + Math.floor(Math.random() * 5),
    );
    if (isAxiosError()) throw "Axios error";
    const $ = cheerio.load(getData.data);
    let data = new Array();
    $("body > section.btp_inner_page > div > div > div > div > div").each(
      function (a, b) {
        const thumbnail = $(this).find("img.btp_post_card__img").attr("src");
        const title = $(this).find("img.btp_post_card__img").attr("alt");
        const quality = $(this)
          .find("div.card-img-overlay > div:nth-child(1)")
          .text()
          .split(/\n| /g)
          .join("");
        const duration = $(this)
          .find("div.card-img-overlay > div:nth-child(2)")
          .text()
          .split(/\n| /g)
          .join("");
        const url = $(this).find("a.btp_post_card__title").attr("href");
        const authorname = $(this)
          .find("a.btp_post_card__author > span.btp_post_card__author_text")
          .text()
          .split(/\n| /g)
          .join("");
        const author_url = $(this).find("a.btp_post_card__author").attr("href");
        const published = $(this)
          .find("small.mr-2")
          .text()
          .split(/\n/g)
          .join("")
          .trim();
        data.push({
          title,
          authorname,
          author_url,
          published,
          quality,
          duration,
          thumbnail,
          url,
        });
      },
    );
    return data;
  }
  
  getGoore = async (link) => {
    if (!/https?:\/\/deepgoretube\.site\/[A-Za-z0-9-_]+/.test(link))
      throw "invalid url";
    const getData = await axios.get(link);
    if (isAxiosError()) throw "Axios error";
    const $ = cheerio.load(getData.data);
    const getVideo = /'encrypt:(.*?)'/g.exec(getData.data)[1];
    const metadata = $("script.yoast-schema-graph")
      .get()
      .map((a) => {
        let response;
        if (a && a.children && a.children[0] && a.children[0].data) {
          response = JSON.parse(a.children[0].data);
        } else response = {};
        return response;
      })[0]["@graph"];
    let title = metadata[3].name;
    let author = metadata[6].name;
    let likes =
      $("span.wp_ulike_counter_up")
        .attr("data-ulike-counter-value")
        .split("+")
        .join("") + " like";
    let dislikes =
      $("span.wp_ulike_counter_down").attr("data-ulike-counter-value") +
      " dislike";
    let comments = metadata[5].commentCount.toString() + " comments";
    let description = metadata[6].description || "no description";
    let keyword = metadata[5].keywords.join("\n");
    let article = metadata[5].articleSection.join("\n");
    let published = $("p.btp_single_post_entry > span").text();
    let thumbnail = metadata[5].thumbnailUrl;
    let url = Buffer.from(getVideo, "base64").toString();
    return {
      source: "https://deepgoretube.site",
      title,
      author,
      published,
      likes,
      dislikes,
      comments,
      article,
      keyword,
      description,
      thumbnail,
      url,
    };
  }

  recipes = (query) => {
    return new Promise(async (resolve, reject) => {
      let getUrl = await axios.get("https://resepkoki.id/?s=" + query);

      const $ = cheerio.load(getUrl.data);
      let link = new Array();
      $(
        "body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a",
      ).each(function (a, b) {
        link.push($(b).attr("href"));
      });
      const randomLink = link[Math.floor(Math.random() * link.length)];
      await axios
        .get(randomLink)
        .then(async ({ data }) => {
          if (isAxiosError()) throw Error("error get Data");
          const $ = cheerio.load(data);
          let bahan = new Array();
          let takaran = new Array();
          let tahap = new Array();
          $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name",
          ).each(function (a, b) {
            bahan.push($(b).text());
          });
          $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount",
          ).each(function (c, d) {
            takaran.push($(d).text());
          });
          $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p",
          ).each(function (e, f) {
            tahap.push($(f).text());
          });
          const title = $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1",
          ).text();
          const timer = $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span",
          ).text();
          const portion = $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span",
          )
            .text()
            .split(": ")[1];
          const level = $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span",
          )
            .text()
            .split(": ")[1];
          const thumbnail = $(
            "body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img",
          )
            .attr("src")
            .split("?")[0];
          let Ingredient = "";
          for (let i = 0; i < bahan.length; i++) {
            Ingredient += bahan[i] + " " + takaran[i] + "\n";
          }
          let Tahap = "";
          for (let i = 0; i < tahap.length; i++) {
            Tahap += tahap[i] + "\n";
          }
          if (!(portion && level && thumbnail && Tahap))
            throw "result undefined";
          const result = {
            title,
            timer,
            portion,
            level,
            thumbnail,
            ingredient: Ingredient,
            step: Tahap,
          };
          resolve(result);
        })
        .catch(reject);
    });
  }

instagram = (url) => {
     return new Promise(async(resolve, reject) => {
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
             return resolve({
                    creator: global.creator,
                    status: true,
                    result
                    })
            })
          }
fbdl = url => {
   return new Promise(async (resolve, reject) => {
      try {
         let Go = await fetch('https://fbreels.app/en', {
            method: 'GET',
            headers: {
               'User-Agent': 'GoogleBot'
            }
         })
         let isCookie = Go.headers.get('set-cookie').split(',').map((v) => cookie.parse(v)).reduce((a, c) => {
            return {
               ...a,
               ...c
            }
         }, {})
         let isHtml = await Go.text()
         isCookie = {
            '.AspNetCore.Antiforgery.oY8VhknnI_Q': isCookie['.AspNetCore.Antiforgery.oY8VhknnI_Q'],
         }
         isCookie = Object.entries(isCookie).map(([name, value]) => cookie.serialize(name, value)).join(' ')
         let $ = cheerio.load(isHtml)
         let token = $('input[name=__RequestVerificationToken]').attr('value')
         let form = new FormData
         form.append('__RequestVerificationToken', token)
         form.append('q', url)
         let json = await (await fetch('https://fbreels.app/api/ajaxSearch', {
            method: 'POST',
            headers: {
               Accept: '*/*',
               'Accept-Language': 'en-US,enq=0.9',
               'User-Agent': 'GoogleBot',
               Cookie: isCookie,
               'X-CSRF-TOKEN': token,
               ...form.getHeaders()
            },
            body: form
         })).json()
         let ch = cheerio.load(json.data)
         let data = []
         ch('tr').each((i, e) => data.push({
            type: /HD/.test($(e).find('td.video-quality').text()) ? 'HD' : 'SD',
            url: $(e).find('td > a').attr('href'),
            response: $(e).find('td > a').attr('href') ? 200 : 404
         }))
         const result = data.filter(v => v.url)
         if (result.ength == 0) return resolve({
            creator: global.creator,
            status: false
         })
         return resolve({
            creator: global.creator,
            status: true,
            data: result
         })
      } catch (e) {
         console.log(e)
         resolve({
            creator: global.creator,
            status: false
         })
      }
   })
}

twitter = (link) => {
	return new Promise((resolve, reject) => {
		let config = {
			'URL': link
		}
		axios.post('https://twdown.net/download.php',qs.stringify(config),{
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
				"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1388798541.1625064838; _gid=GA1.2.1351476739.1625064838; __gads=ID=7a60905ab10b2596-229566750eca0064:T=1625064837:RT=1625064837:S=ALNI_Mbg3GGC2b3oBVCUJt9UImup-j20Iw; _gat=1"
			}
		})
		.then(({ data }) => {
		const $ = cheerio.load(data)
		resolve({
		        creator: global.creator,
                status: true,
				desc: $('div:nth-child(1) > div:nth-child(2) > p').text().trim(),
				thumb: $('div:nth-child(1) > img').attr('src'),
				HD: $('tbody > tr:nth-child(1) > td:nth-child(4) > a').attr('href'),
				SD: $('tr:nth-child(2) > td:nth-child(4) > a').attr('href'),
				audio: 'https://twdown.net/' + $('body > div.jumbotron > div > center > div.row > div > div:nth-child(5) > table > tbody > tr:nth-child(3) > td:nth-child(4) > a').attr('href')
			})
		})
	.catch(reject)
	})
}
inews = () => {
	return new Promise((resolve, reject) => {
		axios.get(`https://www.inews.id/news`)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const hasil = [];
				$('#news-list > li ').each(function(a, b) {
					let result = {
						status: 200,
						author: global.creator,
						berita: $(b).find('> a > div > div > div.float-left.width-400px.margin-130px-left > div.title-news-update.padding-0px-top').text().trim(),
						upload_time: $(b).find('> a > div > div > div.float-left.width-400px.margin-130px-left > div.date.margin-10px-left').text().trim().split('|')[0],
						link: $(b).find('> a').attr('href'),
						thumbnail: $(b).find('> a > div > div > div.float-left.width-130px.position-absolute > img').attr('data-original'),
						info_berita: $(b).find('> a > div > div > div.float-left.width-400px.margin-130px-left > p').text()
					}
					hasil.push(result)
				})
				resolve(hasil)
			})
			.catch(reject)
	})
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
pinterest = async (querry) => {
	return new Promise(async (resolve, reject) => {
		axios.get('https://id.pinterest.com/search/pins/?autologin=true&q=' + querry, {
			headers: {
				"cookie": "_auth=1; _b=\"AVna7S1p7l1C5I9u0+nR3YzijpvXOPc6d09SyCzO+DcwpersQH36SmGiYfymBKhZcGg=\"; _pinterest_sess=TWc9PSZHamJOZ0JobUFiSEpSN3Z4a2NsMk9wZ3gxL1NSc2k2NkFLaUw5bVY5cXR5alZHR0gxY2h2MVZDZlNQalNpUUJFRVR5L3NlYy9JZkthekp3bHo5bXFuaFZzVHJFMnkrR3lTbm56U3YvQXBBTW96VUgzVUhuK1Z4VURGKzczUi9hNHdDeTJ5Y2pBTmxhc2owZ2hkSGlDemtUSnYvVXh5dDNkaDN3TjZCTk8ycTdHRHVsOFg2b2NQWCtpOWxqeDNjNkk3cS85MkhhSklSb0hwTnZvZVFyZmJEUllwbG9UVnpCYVNTRzZxOXNJcmduOVc4aURtM3NtRFo3STlmWjJvSjlWTU5ITzg0VUg1NGhOTEZzME9SNFNhVWJRWjRJK3pGMFA4Q3UvcHBnWHdaYXZpa2FUNkx6Z3RNQjEzTFJEOHZoaHRvazc1c1UrYlRuUmdKcDg3ZEY4cjNtZlBLRTRBZjNYK0lPTXZJTzQ5dU8ybDdVS015bWJKT0tjTWYyRlBzclpiamdsNmtpeUZnRjlwVGJXUmdOMXdTUkFHRWloVjBMR0JlTE5YcmhxVHdoNzFHbDZ0YmFHZ1VLQXU1QnpkM1FqUTNMTnhYb3VKeDVGbnhNSkdkNXFSMXQybjRGL3pyZXRLR0ZTc0xHZ0JvbTJCNnAzQzE0cW1WTndIK0trY05HV1gxS09NRktadnFCSDR2YzBoWmRiUGZiWXFQNjcwWmZhaDZQRm1UbzNxc21pV1p5WDlabm1UWGQzanc1SGlrZXB1bDVDWXQvUis3elN2SVFDbm1DSVE5Z0d4YW1sa2hsSkZJb1h0MTFpck5BdDR0d0lZOW1Pa2RDVzNySWpXWmUwOUFhQmFSVUpaOFQ3WlhOQldNMkExeDIvMjZHeXdnNjdMYWdiQUhUSEFBUlhUVTdBMThRRmh1ekJMYWZ2YTJkNlg0cmFCdnU2WEpwcXlPOVZYcGNhNkZDd051S3lGZmo0eHV0ZE42NW8xRm5aRWpoQnNKNnNlSGFad1MzOHNkdWtER0xQTFN5Z3lmRERsZnZWWE5CZEJneVRlMDd2VmNPMjloK0g5eCswZUVJTS9CRkFweHc5RUh6K1JocGN6clc1JmZtL3JhRE1sc0NMTFlpMVErRGtPcllvTGdldz0=; _ir=0"
			}
		}).then(({
			data
		}) => {
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
character = (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://www.anime-planet.com/characters/all?name=${query}`)
			.then(({
				data
			}) => {
				const hasil = []
				const $ = cheerio.load(data)
				$('#siteContainer > table > tbody > tr').each(function(a, b) {
					let result = {
						status: 200,
						author: global.creator,
						character: $(b).find('> td.tableCharInfo > a').text(),
						link: 'https://www.anime-planet.com' + $(b).find('> td.tableCharInfo > a').attr('href'),
						thumbnail: $(b).find('> td.tableAvatar > a > img').attr('src').startsWith('https://') ? $(b).find('> td.tableAvatar > a > img').attr('src') : 'https://www.anime.planet.com' + $(b).find('> td.tableAvatar > a > img').attr('src')
					};
					hasil.push(result);
				});
				resolve(hasil)
			})
			.catch(reject)
	})
}
anime = (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://www.anime-planet.com/anime/all?name=${query}`)
			.then(({
				data
			}) => {
				const hasil = []
				const $ = cheerio.load(data)
				$('#siteContainer > ul.cardDeck.cardGrid > li ').each(function(a, b) {
			      let result = {
						status: 200,
						author: global.creator,
						judul: $(b).find('> a > h3').text(),
						link: 'https://www.anime-planet.com' + $(b).find('> a').attr('href'),
						thumbnail: $(b).find('> a > div.crop > img').attr('src').startsWith('https://') ? $(b).find('> a > div.crop > img').attr('src') : 'https://www.anime.planet.com' + $(b).find('> a > div.crop > img').attr('src')
					};
					hasil.push(result);
				});
				resolve(hasil)
			}).catch(reject)
	})
}
manga = (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://www.anime-planet.com/manga/all?name=${query}`)
			.then(({
				data
			}) => {
				const hasil = []
				const $ = cheerio.load(data)
				$('#siteContainer > ul.cardDeck.cardGrid > li ').each(function(a, b) {
					result = {
						status: 200,
						author: global.creator,
						judul: $(b).find('> a > h3').text(),
						link: 'https://www.anime-planet.com' + $(b).find('> a').attr('href'),
						thumbnail: $(b).find('> a > div.crop > img').attr('src').startsWith('https://') ? $(b).find('> a > div.crop > img').attr('src') : 'https://www.anime.planet.com' + $(b).find('> a > div.crop > img').attr('src')
					};
					hasil.push(result);
				});
				resolve(hasil)
			})
			.catch(reject)
	})
}
otakudesu = (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://otakudesu.wiki/?s=${query}&post_type=anime`).then(({
			data
		}) => {
			const hasil = []
			const $ = cheerio.load(data)
			$('#venkonten > div > div.venser > div > div > ul > li').each(function(a, b) {
				let result = {
					status: 200,
					author: global.creator,
					judul: $(b).find('> h2 > a').text(),
					thumbnail: $(b).find('> img').attr('src'),
					link: $(b).find('> h2 > a').attr('href')
				};
				hasil.push(result);
			});
			resolve(hasil)
		}).catch(reject)
	})
}
otakudesuinfo = (url) => {
	return new Promise((resolve, reject) => {
		axios.get(url).then(({
			data
		}) => {
			const $ = cheerio.load(data)
			let result = {
				status: 200,
				author: global.creator,
				judul: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(1) > span').text().split(': ')[1],
				japanese: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(2) > span').text().split(': ')[1],
				rating: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(3) > span').text().split(': ')[1],
				produser: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(4) > span').text().split(': ')[1],
				tipe: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(5) > span').text().split(': ')[1],
				anime_status: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(6) > span').text().split(': ')[1],
				total_episode: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(7) > span').text().split(': ')[1],
				durasi: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(8) > span').text().split(': ')[1],
				rilis: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(9) > span').text().split(': ')[1],
				studio: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(10) > span').text().split(': ')[1],
				genre: $('#venkonten > div.venser > div.fotoanime > div.infozin > div > p:nth-child(11)').text().split(': ')[1],
				download_lengkap: $('#venkonten > div.venser > div:nth-child(10) > ul > li > span:nth-child(1) > a').attr('href'),
				thumbnail: $('#venkonten > div.venser > div.fotoanime > img').attr('src'),
				sinopsis: $('#venkonten > div.venser > div.fotoanime > div.sinopc').text().trim()
			};
			resolve(result)
		}).catch(reject)
	})
}
kiryu = (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://kiryuu.id/?s=${query}`)
			.then(({
				data
			}) => {
				const hasil = []
				const $ = cheerio.load(data)
				$('#content > div.wrapper > div.postbody > div > div.listupd > div ').each(function(a, b) {
					let result = {
						status: 200,
						author: global.creator,
						judul: $(b).find('> div > a').attr('title'),
						manga_status: $(b).find('> div > a > div.limit > span.status.Completed').text() ? $(b).find('> div > a > div.limit > span.status.Completed').text() : 'Not Complete',
						last_chapter: $(b).find('> div > a > div.bigor > div.adds > div.epxs').text(),
						ranting: $(b).find('> div > a > div.bigor > div.adds > div.rt > div > div.numscore').text(),
						thumbnail: $(b).find('> div > a > div.limit > img').attr('src'),
						link: $(b).find('> div > a').attr('href')
					};
					hasil.push(result);
				});
				resolve(hasil)
			})
			.catch(reject)
	})
}
gempa = async () => {
	return new Promise(async (resolve, reject) => {
		axios.get('https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg')
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const drasa = [];
				$('table > tbody > tr:nth-child(1) > td:nth-child(6) > span').get().map((rest) => {
					let dir = $(rest).text();
					drasa.push(dir.replace('\t', ' '))
				})
				teks = ''
				for (let i = 0; i < drasa.length; i++) {
					teks += drasa[i] + '\n'
				}
				const rasa = teks
				const format = {
					imagemap: $('div.modal-body > div > div:nth-child(1) > img').attr('src'),
					magnitude: $('table > tbody > tr:nth-child(1) > td:nth-child(4)').text(),
					kedalaman: $('table > tbody > tr:nth-child(1) > td:nth-child(5)').text(),
					wilayah: $('table > tbody > tr:nth-child(1) > td:nth-child(6) > a').text(),
					waktu: $('table > tbody > tr:nth-child(1) > td:nth-child(2)').text(),
					lintang_bujur: $('table > tbody > tr:nth-child(1) > td:nth-child(3)').text(),
					dirasakan: rasa
				}
				const result = {
					creator: 'Fajar Ihsana',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}
cariresep = async (query) => {
	return new Promise(async (resolve, reject) => {
		axios.get('https://resepkoki.id/?s=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const link = [];
				const judul = [];
				const upload_date = [];
				const format = [];
				const thumb = [];
				$('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a').each(function(a, b) {
					link.push($(b).attr('href'))
				})
				$('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a').each(function(c, d) {
					jud = $(d).text();
					judul.push(jud)
				})
				for (let i = 0; i < link.length; i++) {
					format.push({
						judul: judul[i],
						link: link[i]
					})
				}
				const result = {
					creator: global.creator,
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}

happymod = (query) => {
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
					nem = $(b).text();
					nama.push(nem)
					link.push('https://happymod.com' + $(b).attr('href'))
				})
				$('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > div > div.clearfix > span').each(function(c, d) {
					rat = $(d).text();
					rating.push(rat)
				})
				$('body > div.container-row.clearfix.container-wrap > div.container-left > section > div > a > img').each(function(e, f) {
					thumb.push($(f).attr('data-original'))
				})
				for (let i = 0; i < link.length; i++) {
					format.push({
						judul: nama[i],
						thumb: thumb[i],
						rating: rating[i],
						link: link[i]
					})
				}
				const result = {
					creator: global.creator,
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}
jadwalsholat = (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://umrotix.com/jadwal-sholat/${query}`)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				$('body > div > div.main-wrapper.scrollspy-action > div:nth-child(3) ').each(function(a, b) {
					result = {
						status: 200,
						author: global.creator,
						tanggal: $(b).find('> div:nth-child(2)').text(),
						imsyak: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(1) > p:nth-child(2)').text(),
						subuh: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(2) > p:nth-child(2)').text(),
						dzuhur: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(3) > p:nth-child(2)').text(),
						ashar: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(4) > p:nth-child(2)').text(),
						maghrib: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(5) > p:nth-child(2)').text(),
						isya: $(b).find('> div.panel.daily > div > div > div > div > div:nth-child(6) > p:nth-child(2)').text()
					}
					resolve(result)
				})
			})
			.catch(reject)
	})
}
cocofun = (url) => {
	return new Promise((resolve, reject) => {
		axios({
			url,
			method: "get",
			headers: {
				"Cookie": "client_id=1a5afdcd-5574-4cfd-b43b-b30ad14c230e",
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
			}
		}).then(data => {
			let $ = cheerio.load(data.data)
			let json
			const res = $('script#appState').get()
			for (let i of res) {
				if (i.children && i.children[0] && i.children[0].data) {
					let ress = i.children[0].data.split('window.APP_INITIAL_STATE=')[1]
					json = JSON.parse(ress)
				}
				const result = {
					status: 200,
					author: global.creator,
					topic: json.share.post.post.content ? json.share.post.post.content : json.share.post.post.topic.topic,
					caption: $("meta[property='og:description']").attr('content'),
					play: json.share.post.post.playCount,
					like: json.share.post.post.likes,
					share: json.share.post.post.share,
					duration: json.share.post.post.videos[json.share.post.post.imgs[0].id].dur,
					thumbnail: json.share.post.post.videos[json.share.post.post.imgs[0].id].coverUrls[0],
					watermark: json.share.post.post.videos[json.share.post.post.imgs[0].id].urlwm,
					no_watermark: json.share.post.post.videos[json.share.post.post.imgs[0].id].url
				}
				resolve(result)
			}
		}).catch(reject)
	})
}
filesearch = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://sfile.mobi/search.php?q=' + query + '&search=Search')
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const result = [];
				const link = [];
				const neme = [];
				const size = [];
				$('div.w3-card.white > div.list > a').each(function(a, b) {
				 link.push($(b).attr('href'))
				})
				$('div.w3-card.white > div.list > a').each(function(c, d) {
				let name = $(d).text();
				 neme.push(name)
				})
				$('div.w3-card.white > div.list').each(function(e, f) {
				let siz = $(f).text();
				 size.push(siz.split('(')[1])
				})
				for (let i = 0; i < link.length; i++) {
					result.push({
						nama: neme[i],
						size: size[i].split(')')[0],
						link: link[i]
					})
				}
				resolve(result)
			})
			.catch(reject)
	})
}
sfiledown = async (link) => {
	return new Promise((resolve, reject) => {
		axios.get(link)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const nama = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(2) > b').text();
				const size = $('#download').text().split('Download File')
				const desc = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(7) > center > h1').text();
				const type = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(4) > a:nth-child(3)').text();
				const upload = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(5)').text();
				const uploader = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(4) > a:nth-child(2)').text();
				const download = $('body > div.w3-row-padding.w3-container.w3-white > div > div:nth-child(6)').text();
				const link = $('#download').attr('href')
				other = link.split('/')[7].split('&is')[0]
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
				}
				const result = {
					creator: global.creator,
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}
carigc = (nama) => {
	return new Promise((resolve, reject) => {
		axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=' + nama + '&searchby=name')
			.then(({
				data
			}) => {
				const $ = cheerio.load(data);
				const result = [];
				const lnk = [];
				const nm = [];
				$('div.wa-chat-title-container').each(function(a, b) {
					const limk = $(b).find('a').attr('href');
					lnk.push(limk)
				})
				$('div.wa-chat-title-text').each(function(c, d) {
					const name = $(d).text();
					nm.push(name)
				})
				for (let i = 0; i < lnk.length; i++) {
					result.push({
						nama: nm[i].split('. ')[1],
						link: lnk[i].split('?')[0]
					})
				}
				resolve(result)
			})
			.catch(reject)
	})
}
wikisearch = async (query) => {
	const res = await axios.get(`https://id.m.wikipedia.org/w/index.php?search=${query}`)
	const $ = cheerio.load(res.data)
	const hasil = []
	let wiki = $('#mf-section-0').find('p').text()
	let thumb = $('#mf-section-0').find('div > div > a > img').attr('src')
	thumb = thumb ? thumb : '//pngimg.com/uploads/wikipedia/wikipedia_PNG35.png'
	thumb = 'https:' + thumb
	let judul = $('h1#section_0').text()
	hasil.push({
		wiki,
		thumb,
		judul
	})
	return hasil
}
konachan = (chara) => {
	return new Promise((resolve, reject) => {
		let text = chara.replace(' ', '_')
		axios.get('https://konachan.net/post?tags=' + text + '+')
			.then(({
				data
			}) => {
				const $$ = cheerio.load(data)
				const no = [];
				$$('div.pagination > a').each(function(c, d) {
					no.push($$(d).text())
				})
				let mat = Math.floor(Math.random() * no.length)
				axios.get('https://konachan.net/post?page=' + mat + '&tags=' + text + '+')
					.then(({
						data
					}) => {
						const $ = cheerio.load(data)
						const result = [];
						$('#post-list > div.content > div:nth-child(4) > ul > li > a.directlink.largeimg').each(function(a, b) {
							result.push($(b).attr('href'))
						})
						resolve(result)
					})
			})
			.catch(reject)
	})
}
wallpaper = (query) => {
      return new Promise(async (resolve) => {
         try {
            let html = await (await axios.get('https://www.wallpaperflare.com/search?wallpaper=' + query)).data
            let $ = cheerio.load(html)
            let data = []
            $('li[itemprop="associatedMedia"]').each((i, e) => data.push({
               size: $(e).find('meta[itemprop="contentSize"]').attr('content'),
               dimention: $(e).find('span.res').text().replace(new RegExp('px', 'g'), '').replace(/x/i, ' × ').trim(),
               url: $(e).find('img').attr('data-src')
            }))
            if (data.length == 0) return resolve({
               creator: global.creator,
               status: false
            })
            resolve({
               creator: global.creator,
               status: true,
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
wattpad = (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://www.wattpad.com/search/${query}`)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const hasil = [];
				$('div.story-card-data.hidden-xxs > div.story-info ').each(function(a, b) {
					$('ul.list-group > li.list-group-item').each(function(c, d) {
						let result = {
							status: 200,
							author: global.creator,
							judul: $(b).find('> div.title').text(),
							dibaca: $(b).find('> ul > li:nth-child(1) > div.icon-container > div > span.stats-value').text(),
							divote: $(b).find('> ul > li:nth-child(2) > div.icon-container > div > span.stats-value').text(),
							bab: $(b).find('> ul > li:nth-child(3) > div.icon-container > div > span.stats-value').text(),
							waktu: $(b).find('> ul > li:nth-child(4) > div.icon-container > div > span.stats-value').text(),
							url: 'https://www.wattpad.com' + $(d).find('a').attr('href'),
							thumb: $(d).find('img').attr('src'),
							description: $(b).find('> div.description').text().replace(/\n/g, '')
						}
						hasil.push(result)
					})
				})
				resolve(hasil)
			})
			.catch(reject)
	})
}
cloudsearch = (query) => {
      return new Promise(async (resolve) => {
         try {
            let json = await (await axios.get('https://api-mobi.soundcloud.com/search/tracks?q=' + encodeURI(query) + '&client_id=iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX&stage=', {
               headers: {
                  "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36"
               }
            })).data
            if (json.collection.length == 0) return resolve({
               creator: global.creator,
               status: false
            })
            let data = []
            json.collection.map(v => data.push({
               title: v.title,
               artist: v.user.username,
               genre: v.genre || 'Unknown',
               duration: this.duration(v.full_duration / 1000),
               plays: Number(v.playback_count).toLocaleString().replace(/[,]/g, '.'),
               likes: Number(v.likes_count).toLocaleString().replace(/[,]/g, '.'),
               comments: Number(v.comment_count),
               url: v.permalink_url
            }))
            return resolve({
               creator: global.creator,
               status: true,
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

cloudownload = (url) => {
      return new Promise(async (resolve) => {
         try {
            let json = await (await axios.post('https://api.downloadsound.cloud/track', {
               url
            }, {
               headers: {
                  "Accept": "application/json, text/plain, */*",
                  "Content-Type": "application/json;charset=utf-8",
                  "User-Agent": "Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36"
               }
            })).data
            if (!json.url) return resolve({
               creator: global.creator,
               status: false
            })
            return resolve({
               creator: global.creator,
               status: true,
               data: json
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
spotify = (url) => {
return new Promise(async (resolve) => {
const res=await fetch('https://api.spotify-downloader.com/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:'link='+url})
return res.json();
})
}

hentaivid = () => {
	return new Promise((resolve, reject) => {
		const page = Math.floor(Math.random() * 1153)
		axios.get('https://sfmcompile.club/page/' + page)
			.then((data) => {
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
lirik = (judul) => {
	return new Promise(async (resolve, reject) => {
		axios.get('https://www.musixmatch.com/search/' + judul)
			.then(async ({
				data
			}) => {
				const $ = cheerio.load(data)
				const hasil = {};
				let limk = 'https://www.musixmatch.com'
				const link = limk + $('div.media-card-body > div > h2').find('a').attr('href')
				await axios.get(link)
					.then(({
						data
					}) => {
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
chara = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://www.wallpaperflare.com/search?wallpaper=' + query, {
				headers: {
					"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
					"cookie": "_ga=GA1.2.863074474.1624987429; _gid=GA1.2.857771494.1624987429; __gads=ID=84d12a6ae82d0a63-2242b0820eca0058:T=1624987427:RT=1624987427:S=ALNI_MaJYaH0-_xRbokdDkQ0B49vSYgYcQ"
				}
			})
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const result = [];
				$('#gallery > li > figure > a').each(function(a, b) {
					result.push($(b).find('img').attr('data-src'))
				})
				resolve(result)
			})
			.catch({
				status: 'err'
			})
	})
}
gore = () => {
	return new Promise((resolve, reject) => {
		const page = Math.floor(Math.random() * 228)
		axios.get('https://seegore.com/gore/page/' + page)
			.then((res) => {
				const $ = cheerio.load(res.data)
				const link = [];
				$('ul > li > article').each(function(a, b) {
					link.push({
						title: $(b).find('div.content > header > h2').text(),
						link: $(b).find('div.post-thumbnail > a').attr('href'),
						thumb: $(b).find('div.post-thumbnail > a > div > img').attr('src'),
						view: $(b).find('div.post-thumbnail > div.post-meta.bb-post-meta.post-meta-bg > span.post-meta-item.post-views').text(),
						vote: $(b).find('div.post-thumbnail > div.post-meta.bb-post-meta.post-meta-bg > span.post-meta-item.post-votes').text(),
						tag: $(b).find('div.content > header > div > div.bb-cat-links').text(),
						comment: $(b).find('div.content > header > div > div.post-meta.bb-post-meta > a').text()
					})
				})
				const random = link[Math.floor(Math.random() * link.length)]
				axios.get(random.link)
					.then((resu) => {
						const $$ = cheerio.load(resu.data)
						const hasel = {}
						hasel.title = random.title
						hasel.source = random.link
						hasel.thumb = random.thumb
						hasel.tag = $$('div.site-main > div > header > div > div > p').text()
						hasel.upload = $$('div.site-main').find('span.auth-posted-on > time:nth-child(2)').text()
						hasel.author = $$('div.site-main').find('span.auth-name.mf-hide > a').text()
						hasel.comment = random.comment
						hasel.vote = random.vote
						hasel.view = $$('div.site-main').find('span.post-meta-item.post-views.s-post-views.size-lg > span.count').text()
						hasel.video1 = $$('div.site-main').find('video > source').attr('src')
						hasel.video2 = $$('div.site-main').find('video > a').attr('href')
						resolve(hasel)
					})
			})
	})
}
quotes = (input) => {
	return new Promise((resolve, reject) => {
		fetch('https://jagokata.com/kata-bijak/kata-' + input.replace(/\s/g, '_') + '.html?page=1')
			.then(res => res.text())
			.then(res => {
				const $ = cheerio.load(res)
				let data = []
				$('div[id="main"]').find('ul[id="citatenrijen"] > li').each(function(index, element) {
					let x = $(this).find('div[class="citatenlijst-auteur"] > a').text().trim()
					let y = $(this).find('span[class="auteur-beschrijving"]').text().trim()
					let z = $(element).find('q[class="fbquote"]').text().trim()
					data.push({
						author: x,
						bio: y,
						quote: z
					})
				})
				data.splice(2, 1)
				if (data.length == 0) return resolve({
					creator: global.creator,
					status: false
				})
				resolve({
					creator: global.creator,
					status: true,
					data
				})
			}).catch(reject)
	})
}
cerpen = (category) => {
	return new Promise(async (resolve, reject) => {
        let title = category.toLowerCase().replace(/[()*]/g, "")
        let judul = title.replace(/\s/g, "-")
        let page = Math.floor(Math.random() * 5)
        axios.get('http://cerpenmu.com/category/cerpen-'+judul+'/page/'+page)
        .then((get) => {
            let $ = cheerio.load(get.data)
            let link = []
            $('article.post').each(function (a, b) {
                link.push($(b).find('a').attr('href'))
            })
            let random = link[Math.floor(Math.random() * link.length)]
            axios.get(random)
            .then((res) => {
                let $$ = cheerio.load(res.data)
                let hasil = {
                    title: $$('#content > article > h1').text(),
                    author: $$('#content > article').text().split('Cerpen Karangan: ')[1].split('Kategori: ')[0],
                    kategori: $$('#content > article').text().split('Kategori: ')[1].split('\n')[0],
                    lolos: $$('#content > article').text().split('Lolos moderasi pada: ')[1].split('\n')[0],
                    cerita: $$('#content > article > p').text()
                }
                resolve(hasil)
            })
        })
    })
}
remini = (imageData, operation) => {
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
 kodepos = (kota) => {
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
            }, url: url, }, function(error, response, body) {
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
                        var key = (i == 0) ? 'province': (i == 1) ? 'city': (i == 2) ? 'subdistrict': (i == 3) ? 'urban': 'postalcode';
                        result[key] = value;
                    })
                    results.push(result);
                }
            });
            return resolve(results);
        });
    });
};
ephoto = async (url, texk) => {
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
let { data } = await axios.post("https://en.ephoto360.com/effect/create-image", new URLSearchParams(json), {
  headers: {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36",
    cookie: gT.headers["set-cookie"].join("; ")
    }
})
return build_server + data.image
}

mediafire = (url) => {
   return new Promise(async (resolve) => {
      try {
         let html = await (await axios.get(url)).data
         let $ = cheerio.load(html)
         let filename = $($('.filename')[0]).text().trim()
         let size = $($('.details').find('li > span')[0]).text().trim()
         let uploaded = $($('.details').find('li > span')[1]).text().trim()
         let link = $('a[aria-label="Download file"]').attr('href')
         let extension = '.' + link.split`.` [link.split`.`.length - 1]
         resolve({
            creator: global.creator,
            status: true,
            data: {
               filename,
               size,
               mime: mime.lookup(extension),
               extension,
               uploaded,
               link
            }
         })
      } catch (e) {
         console.log(e)
         resolve({
            creator: global.creator,
            status: false
         })
      }
   })
}
drakor = query => {
      return new Promise(async (resolve) => {
         try {
            let html = await (await axios.get('https://173.212.240.190/?s=' + query.replace(new RegExp('\s', 'g'), '+') + '&post_type=post')).data
            let $ = cheerio.load(html)
            let data = []
            $('div#post').each((i, e) => {
               let addr = $(e).text().split('Eps')[0].split(' ')
               data.push({
                  title: $(e).find('h2').text().trim(),
                  episode: addr[addr.length - 1].trim(),
                  release: addr[addr.length - 3].trim(),
                  genre: $(e).find('div.genrenya').text().trim().split(' '),
                  url: $(e).find('a').attr('href')                 
               })
            })
            if (data.length == 0) return resolve({
               creator: global.creator,
               status: false
            })
            resolve({
               creator: global.creator,
               status: true,
               data
            })
         } catch (e) {
            console.log(e)
            resolve({
               creator: global.creator,
               status: false
            })
         }
      })
   }
   drakordetail = url => {
      return new Promise(async (resolve) => {
         try {
            let html = await (await axios.get(url)).data
            let $ = cheerio.load(html)
            let P = $($('div.detail > p')[0]).text().split('/')
            let cast = []
            $('p.text-xs').find('a').each((i, e) => cast.push($(e).text().trim()))
            let episode = []
            $('table.mdl-data-table').find('tr').each((i, e) => {
               let urls = []
               $($(e).find('td')[1]).find('a').each((i, e) => urls.push({
                  provider: $(e).text().trim(),
                  url: $(e).attr('href')
               }))
               episode.push({
                  episode: $($(e).find('td')[0]).text(),
                  urls
               })
            })
            episode.shift()
            let data = {
               thumbnail: $('div.thumbnail').find('img').attr('src'),
               title: $('div.detail').find('h2').text().split('Episode')[0].trim() + ' (' + P[0].trim() + ')',
               episode: P[2].trim(),
               release: P[1].trim(),
               genre: $('p.gens').text().trim().split(' '),
               duration: ($('div.durs').text().trim()).replace(/\D/g, '') + ' Minutes',
               channel: $('div.durs').find('a').text().trim(),
               cast,
               sinopsis: $('p.caps').text().trim(),
               episodes: episode
            }
            resolve({
               creator: global.creator,
               status: true,
               data
            })
         } catch (e) {
            console.log(e)
            resolve({
               creator: global.creator,
               status: false
            })
         }
      })
   }

ssweb = (url, device = 'tablet') => {
     return new Promise((resolve, reject) => {
          const base = 'https://www.screenshotmachine.com'
          const param = {
            url: url,
            device: device,
            cacheLimit: 0
          }
          axios({url: base + '/capture.php',
               method: 'POST',
               data: new URLSearchParams(Object.entries(param)),
               headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
               }
          }).then((data) => {
               const cookies = data.headers['set-cookie']
               if (data.data.status == 'success') {
                    axios.get(base + '/' + data.data.link, {
                         headers: {
                              'cookie': cookies.join('')
                         },
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                         resolve({
                            creator: global.creator,
                            status: true,
                            result: data
                        })
                    })
               } else {
                    reject({ creator: global.creator, status: false })
               }
          }).catch(reject)
     })
}

     ssphone = (url, device = 'phone') => {
     return new Promise((resolve, reject) => {
          const base = 'https://www.screenshotmachine.com'
          const param = {
            url: url,
            device: device,
            cacheLimit: 0
          }
          axios({url: base + '/capture.php',
               method: 'POST',
               data: new URLSearchParams(Object.entries(param)),
               headers: {
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
               }
          }).then((data) => {
               const cookies = data.headers['set-cookie']
               if (data.data.status == 'success') {
                    axios.get(base + '/' + data.data.link, {
                         headers: {
                              'cookie': cookies.join('')
                         },
                         responseType: 'arraybuffer'
                    }).then(({ data }) => {
                         resolve({
                            creator: global.creator,
                            status: true,
                            result: data
                        })
                    })
               } else {
                    reject({ creator: global.creator, status: false })
               }
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
emojimix = (str) => {
   return new Promise(async (resolve) => {
      try {
         let [emo1, emo2] = str.split('_')
         if (!emo1 || !emo2) return resolve({
            creator: global.creator,
            status: false,
            msg: 'Give 2 emoticon to be mixed.'
         })
         let json = await (await axios.get('https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=' + encodeURIComponent(emo1.trim() + '_' + emo2.trim()))).data
         if (json.results.length == 0) return resolve({
            creator: global.creator,
            status: false,
            msg: 'Emoticon is not supported.'
         })
         resolve({
            creator: global.creator,
            status: true,
            data: {
               url: json.results[0].media_formats.png_transparent.url
            }
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
telesticker = (url) => {
      return new Promise(async (resolve, reject) => {
         try {
            let packname = url.replace('https://t.me/addstickers/', '')
            let json = await (await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=${encodeURIComponent(packname)}`, {
               headers: {
                  'User-Agent': 'GoogleBot'
               }
            })).data
            let data = []
            let id = json.result.stickers.map(v => v.thumb.file_id)
            for (let i = 0; i < id.length; i++) {
               let path = await (await axios.get(`https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=${id[i]}`)).data
               data.push({
                  url: 'https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/' + path.result.file_path
               })
            }
            resolve({
               creator: global.creator,
               status: true,
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
steam = (search) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.get('https://store.steampowered.com/search/?term=' + search)
      const $ = cheerio.load(data)
      const hasil = []
      $('#search_resultsRows > a').each((a, b) => {
        const link = $(b).attr('href')
        const judul = $(b).find(`div.responsive_search_name_combined > div.col.search_name.ellipsis > span`).text()
        const harga = $(b).find(`div.responsive_search_name_combined > div.col.search_price_discount_combined.responsive_secondrow > div.col.search_price.responsive_secondrow `).text().replace(/ /g, '').replace(/\n/g, '')
        var rating = $(b).find(`div.responsive_search_name_combined > div.col.search_reviewscore.responsive_secondrow > span`).attr('data-tooltip-html')
        const img = $(b).find(`div.col.search_capsule > img`).attr('src')
        const rilis = $(b).find(`div.responsive_search_name_combined > div.col.search_released.responsive_secondrow`).text()

        if (typeof rating === 'undefined') {
          var rating = 'no ratings'
        }
        if (rating.split('<br>')) {
          let hhh = rating.split('<br>')
          var rating = `${hhh[0]} ${hhh[1]}`
        }
        hasil.push({
          judul: judul,
          img: img,
          link: link,
          rilis: rilis,
          harga: harga ? harga : 'no price',
          rating: rating
        })
      })
      if (hasil.every(x => x === undefined)) return resolve({ creator: global.creator, mess: 'no result found' })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
 kusonimeget = async (linkGan) => {
	const dataWrap = await axios.get(linkGan)
	const $ = cheerio.load(dataWrap.data)
	let result = {}
	let info = []
	$('.lexot .info p').each((i, el) => {
		info[i] = $(el).toString().trim()
	})
	const thumbnail = $('#venkonten > div.vezone > div.venser > div.post-thumb').find('img').attr('src')
	const scrapLink = $('.lexot .dlbodz')
	let download = []
	scrapLink.each((i, el) => {
		let link = {}
		let resolution = ''
		$(el).find('.smokeurlrh').each((index2, el2) => {
			resolution = $(el2).find('strong').text()
			$(el2)
				.find('a')
				.each((index3, el3) => {
					link[$(el3).text().replace(/ |\./, '_')] = $(el3).attr('href')
				})
			download.push({ resolution, link })
		})
	})
	info = info.map(v => v.replace(/(<([^>]+)>)/gi, ''))
		.map(v => [v.split(':')[0].trim()
		.replaceAll(' ','_'), v.split(':')
		.slice(1)+''])
		.reduce((acc, [key, value])=>({...acc, [key]: value}), {})
	result = { ...info, thumbnail, download }
	return result
}
nhentainew = () => {
		return new Promise(async (resolve, reject) => {
		await axios.request({
        url: "https://nhentai.to", 
        method: "GET",
        headers
        })
   	.then(( response ) => {
		const $ = cheerio.load(response.data)
		const result = $("div.container.index-container > div.gallery").map((_, el) => {
		return {
    	id: $(el).find("a").attr("href").match(/\d+/)[0],
		title: $(el).find("a > div.caption").text().trim(),
		thumbnail: $(el).find("a > img").attr("data-src"),
		link: "https://nhentai.to" + $(el).find("a").attr("href"),
		}
		}).get()
		resolve(result)
		})
   	.catch((e) => {
		reject(e)
		})
		})
    	}
nhentaisearch = (query) => {
			return new Promise(async (resolve, reject) => {
				await axios
				.request({
					baseURL: "https://nhentai.to",
					url: "/search?q=" + encodeURIComponent(query),
					method: "GET",
					headers
				})
				.then(( response ) => {
					const $ = cheerio.load(response.data)
					const result = $("div.container.index-container > div.gallery").map((_, el) => {
					return {
						id: $(el).find("a").attr("href").match(/\d+/)[0],
						title: $(el).find("a > div.caption").text().trim(),
						thumbnail: $(el).find("a > img").attr("src"),
						link: "https://nhentai.to" + $(el).find("a").attr("href"),
					}
				}).get()
				resolve(result)
				}).catch((e) => { reject(e)
			})
		})
	}
nhentaiget = (id) => {
		return new Promise(async (resolve, reject) => {
			await axios
				.request({
					url: "https://nhentai.to/g/" + id,
					method: "GET",
					headers
				})
				.then(( response ) => {
					const $ = cheerio.load(response.data)
					const data = {
						id: '',
						title: '',
						titleJa: '',
						cover: '',
						parodies: [],
						characters: [],
						tags: [],
						artists: [],
						groups: [],
						languages: [],
						categories: [],
						uploaded: '',
						pages: []
					};
					data.id = $('div#info > h3').text().trim()
					data.title = $('div#info > h1').text().trim()
					data.cover = $("div#cover > a > img").attr("src")
					data.titleJa = $('div#info > h2').text().trim()
					data.uploaded = $('div.tag-container.field-name span.tags time').attr('datetime');
					$("div#thumbnail-container > div.thumb-container").each((index, element) => {
						const pages = $(element).find("a > img").attr("data-src")
						data.pages.push(pages)
					})
					$('a.tag.tag-66049').each((index, element) => {
						const parodyName = $(element).find('span.name').text();
						data.parodies.push(parodyName);
					});
					$('a.tag.tag-62150, a.tag.tag-62151').each((index, element) => {
						const characterName = $(element).find('span.name').text();
						data.characters.push(characterName);
					});
					$('a.tag').not('.tag-66049, .tag-62150, .tag-62151').each((index, element) => {
						const tagName = $(element).find('span.name').text();
						data.tags.push(tagName);
					});
					$('a.tag.tag-19368').each((index, element) => {
						const artistName = $(element).find('span.name').text();
						data.artists.push(artistName);
					});
					$('a.tag.tag-22152').each((index, element) => {
						const groupName = $(element).find('span.name').text();
						data.groups.push(groupName);
					});
					$('a.tag.tag-19, a.tag.tag-17').each((index, element) => {
						const languageName = $(element).find('span.name').text();
						data.languages.push(languageName);
					});
					$('a.tag.tag-9').each((index, element) => {
						const categoryName = $(element).find('span.name').text();
						data.categories.push(categoryName);
					});
					resolve(data);
				})
				.catch((e) => { reject(e)
			})
		})
	}

 searchApkmirror = async (query) => {
    const url = `https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=${encodeURIComponent(query)}`;
    try {
        const response = await fetch(url);
        const body = await response.text();
        const $ = cheerio.load(body);
        return $('.appRow')
            .map((_, element) => ({
                image: "https://www.apkmirror.com" + $(element).find('.ellipsisText').attr('src'),
                link: "https://www.apkmirror.com" + $(element).find('.appRowTitle a').attr('href'),
                title: $(element).find('.appRowTitle a').text().trim(),
                developer: $(element).find('.byDeveloper').text().trim(),
                uploadDate: $(element).find('.dateyear_utc').text().trim(),
                version: $(element).next('.infoSlide').find('.infoSlide-value').eq(0).text().trim(),
                fileSize: $(element).next('.infoSlide').find('.infoSlide-value').eq(2).text().trim(),
                downloads: $(element).next('.infoSlide').find('.infoSlide-value').eq(3).text().trim()
            }))
            .get()
            .filter(obj => Object.values(obj).every(value => value !== ''))
    } catch (error) {
        throw error;
    }
}
 getApkmirror = async (url) => {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const link = 'https://www.apkmirror.com' + $('.downloadButton').attr('href');
        if (link.includes('#downloads')) {
            const link2 = $('meta[property="og:url"]').attr('content') + "#downloads";
            const responses2 = await fetch(link2);
            const htmls2 = await responses2.text();
            const $s = cheerio.load(htmls2);
            const result = [];
            $s('.table-row.headerFont').each((index, row) => {
                const rowData = {
                    version: $s(row).find('a.accent_color').text().trim(),
                    bundle: $s(row).find('.apkm-badge.success').eq(0).text().trim(),
                    splits: $s(row).find('.apkm-badge.success').eq(1).text().trim(),
                    apkUrl: 'https://www.apkmirror.com' + $s(row).find('a.accent_color').attr('href'),
                    downloadDate: $s(row).find('.dateyear_utc').data('utcdate')
                };
                const hasOutput = Object.values(rowData).some(value => value !== undefined && value !== '');
                if (hasOutput) {
                    result.push(rowData);
                }
            });
            if (result.length > 1) {
                const response3 = await fetch(result[1].apkUrl);
                const html3 = await response3.text();
                const $t = cheerio.load(html3);
                const link3 = 'https://www.apkmirror.com' + $t('.downloadButton').attr('href');
                const response2 = await fetch(link3);
                const html2 = await response2.text();
                const $$ = cheerio.load(html2);
                const formElement2 = $$('#filedownload');
                const id2 = formElement2.find('input[name="id"]').attr('value');
                const key2 = formElement2.find('input[name="key"]').attr('value');
                const linkdl = `https://www.apkmirror.com/wp-content/themes/APKMirror/download.php?id=${id2}&key=${key2}`;
                return {
                    title: $('meta[property="og:title"]').attr('content'),
                    gambar: $('meta[property="og:image"]').attr('content'),
                    link: link,
                    linkdl: linkdl,
                    downloadText: $('.downloadButton').text().trim(),
                    author: url.split('/')[4].toUpperCase(),
                    info: $('.infoSlide').text().trim(),
                    description: $('#description .notes').text().trim()
                };
            }
        } else {
            const response2 = await fetch(link);
            const html2 = await response2.text();
            const $$ = cheerio.load(html2);
            const formElement = $$('#filedownload');
            const id = formElement.find('input[name="id"]').attr('value');
            const key = formElement.find('input[name="key"]').attr('value');
            const forcebaseapk = formElement.find('input[name="forcebaseapk"]').attr('value');
            const linkdl = `https://www.apkmirror.com/wp-content/themes/APKMirror/download.php?id=${id}&key=${key}&forcebaseapk=${forcebaseapk}`;
            return {
                title: $('meta[property="og:title"]').attr('content'),
                gambar: $('meta[property="og:image"]').attr('content'),
                link: link,
                linkdl: linkdl,
                downloadText: $('.downloadButton').text().trim(),
                author: url.split('/')[4].toUpperCase(),
                info: $('.appspec-value').text().trim(),
                description: $('#description .notes').text().trim(),
                size: $('.appspec-row:nth-child(2) .appspec-value').text().trim(),
                tanggal: $('.appspec-row:last-child .appspec-value .datetime_utc').attr('data-utcdate')
            };
        }
    } catch (error) {
        console.error('Error occurred:', error);
        throw error; // rethrow the error to indicate failure
    }
}

 searchApp = async(q) => {
  try {
    const url = 'https://m.playmods.net/id/search/' + q; // Ganti dengan URL sumber HTML
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const dataArray = [];
    $('a.beautify.ajax-a-1').each((index, element) => {
      const $element = $(element);
      const data = {
        link: 'https://m.playmods.net' + $element.attr('href'),
        title: $element.find('.common-exhibition-list-detail-name').text().trim(),
        menu: $element.find('.common-exhibition-list-detail-menu').text().trim(),
        detail: $element.find('.common-exhibition-list-detail-txt').text().trim(),
        image: $element.find('.common-exhibition-list-icon img').attr('data-src'),
        downloadText: $element.find('.common-exhibition-line-download').text().trim(),
      };
      dataArray.push(data);
    });
    return dataArray;
  } catch (error) {
    console.log(error);
  }
}

 getApp = async (url) => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    const data = {
      title: $('h1.name').text().trim(),
      image: $('.icon').attr('src'),
      name: $('.app-name span').text().trim(),
      score: $('.score').text().trim(),
      edisi: $('.edition').text().trim(),
      size: $('.size .operate-cstTime').text().trim(),
      create: $('.size span').text().trim(),
      link: $('a.a_download').attr('href'),
      detail: $('.game-describe-gs').text().trim(),
      screenshots: $('.swiper-slide img').map((index, element) => $(element).attr('data-src')).get(),
      describe: $('.datail-describe-pre div').text().trim(),
    };
    return data;
  } catch (error) {
    console.log(error);
  }
}
 attp = async (text) => {
    try {
        const baseUrl = "https://id.bloggif.com";
        const getidResponse = await fetch(`${baseUrl}/text`);
        const getidText = await getidResponse.text();
        const id = cheerio.load(getidText)("#content > form").attr("action");
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/x-www-form-urlencoded",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
            },
            body: new URLSearchParams({
                target: 1,
                text: text,
                glitter_id: Math.floor(Math.random() * 2821),
                font_id: "lucida_sans_demibold_roman",
                size: 100,
                bg_color: "FFFFFF",
                transparent: 1,
                border_color: "000000",
                border_width: 2,
                shade_color: "000000",
                shade_width: 1,
                angle: 0,
                text_align: "center",
            }),
        };
        const response = await fetch(`${baseUrl}${id}`, options);
        const bodyText = await response.text();
        const $ = cheerio.load(bodyText);
        const entries = [];
        $('div.box.center a').each((index, element) => {
            const title = $(element).text();
            const url = $(element).attr('href');
            entries.push({
                title,
                url: `${baseUrl}${url}`
            });
        });
        return entries;
    } catch (error) {
        console.error('Error in attp:', error.message);
        return [];
    }
}

 ttp = async (text) => {
    try {
        const response = await fetch("https://www.picturetopeople.org/p2p/text_effects_generator.p2p/transparent_text_effect", {
        method: "POST",
         headers: {
         "Content-Type": "application/x-www-form-urlencoded",
         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
          Cookie: "_ga=GA1.2.1667267761.1655982457; _gid=GA1.2.77586860.1655982457; __gads=ID=c5a896288a559a38-224105aab0d30085:T=1655982456:RT=1655982456:S=ALNI_MbtHcmgQmVUZI-a2agP40JXqeRnyQ; __gpi=UID=000006149da5cba6:T=1655982456:RT=1655982456:S=ALNI_MY1RmQtva14GH-aAPr7-7vWpxWtmg; _gat_gtag_UA_6584688_1=1",
          },
          body: new URLSearchParams({
          TextToRender: text,
          FontSize: "100",
          Margin: "30",
          LayoutStyle: "0",
          TextRotation: "0",
          TextColor: "ffffff",
          TextTransparency: "0",
          OutlineThickness: "3",
          OutlineColor: "000000",
          FontName: "Lekton",
          ResultType: "view",
          }).toString(),
          });
          const bodyText = await response.text();
          const $ = cheerio.load(bodyText);
          const results = [];
          $('form[name="MyForm"]').each((index, formElement) => {
          const resultFile = $(formElement).find('#idResultFile').attr('value');
          const refTS = $(formElement).find('#idRefTS').attr('value');
          results.push({
          url: 'https://www.picturetopeople.org' + resultFile,
          title: refTS
          });
          });
          return results;
          } catch (error) {
          console.error('Error:', error);
          return [];
          }
          }

  Draw = async (prompt) => {
  const Blobs = await fetch("https://api-inference.huggingface.co/models/prompthero/openjourney-v2",{
  method: "POST",
  headers: {
   "content-type": "application/json",
   Authorization: "Bearer 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",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );
  const arrayBuffer = await Blobs.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return buffer;
};

 jamesearch = async (query, limitValue = 50) => {
    try {
        const { data } = await axios.get('https://api.jamendo.com/v3.0/tracks/', {
            params: {
                client_id: "f5db3eb4",
                format: "json",
                limit: validatingLimit(limitValue),
                order: "downloads_total",
                include: "",
                imagesize: "200",
                groupby: "artist_id",
                namesearch: query,
            },
        }).catch((e) => e?.response);
        if (data &&
            data.results &&
            Array.isArray(data.results) &&
            data.results.length) {
            const _sortie = [];
            const _filtered = data.results.filter((v) => v.audiodownload_allowed && v.audio);
            for (const obj of _filtered) {
                _sortie.push({
                    title: obj.name,
                    artist: obj.artist_name,
                    album: obj.album_name,
                    release_date: obj.releasedate,
                    thumbnail: obj.image,
                    audio: obj.audio,
                });
            }
            return _sortie;
        } else {
            throw new Error(data?.headers?.error_message ||
                data?.headers?.warnings ||
                `Failed to retrieve data`);
        }
    } catch (e) {
        return {
            error: true,
            message: String(e),
        };
    }
}

Spotifysearch = async (query) => {
    try {
        let url = await fetch('https://sa.caliph.eu.org/api/search/tracks?q=' + query, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let res = await url.json();
        console.log(res)
        return res; 
    } catch (error) {
        console.error(error); // Log any errors
        return null; // Or handle the error appropriately
    }
}

bokepsindetail = async (url) => {
    if (!url.includes('https://bokepsin.digital/')) {
        return {
            error: true,
            message: `Invalid base url`,
        };
    }
    try {
        const { data } = await axios.get(url).catch((e) => e?.response);
        const $ = cheerio.load(data);
        const views = $(".single-video-infos")
            .find(".views-number")
            .text()
            .trim();
        const index = $(".video-player");
        const title = $(index)
            .find("meta[itemprop='name']")
            .attr("content");
        const duration = $(index)
            .find("meta[itemprop='duration']")
            .attr("content")
            .replace(/[^DHMS\0-9]/g, "");
        const thumbnail = $(index)
            .find("meta[itemprop='thumbnailUrl']")
            .attr("content");
        const embed = $(index)
            .find("meta[itemprop='embedURL']")
            .attr("content");
        return {
            title,
            views,
            duration,
            thumbnail,
            embed,
        };
    }
    catch (e) {
        return {
            error: true,
            message: String(e),
        };
    }
}

 bokepsinsearch = async (query) => {
    try {
        const { data } = await axios.get(`https://bokepsin.digital/search/${query}`).catch((e) => e?.response);
        const $ = cheerio.load(data);
        const _temp = [];
        $("div.row.no-gutters > div").each((i, e) => {
            const title = $(e).find("a.thumb").attr("title");
            const views = $(e).find("span.views-number").text().trim();
            const duration = $(e).find("span.duration").text().trim();
            const url = $(e).find("a.thumb").attr("href");
            const thumbnail = $(e).find("a.thumb > img").attr("data-src");
            _temp.push({ title, views, duration, url, thumbnail });
        });
        if (Array.isArray(_temp) && _temp.length) {
            return _temp;
        }
        else {
            throw new Error("Results is not an array");
        }
    }
    catch (e) {
        return {
            error: true,
            message: String(e),
        };
    }
}

 wasearch = async (query, page = "1", seed = "3013") => {
    try {
        let StatusWaIndonesiaBaseUrl = 'https://www.videostatusmarket.com';
        const { data } = await axios.post(
            StatusWaIndonesiaBaseUrl +
                "/videostatus_studio/videostatus_indonesia/get_new_video_portrait.php",
            new URLSearchParams({ s: query, seed, page, type: "search" }),
            {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
        ).catch((e) => e?.response);
        if (data && typeof data === "object") {
            return data.items;
        } else {
            throw new Error(`data: ${typeof data}`);
        }
    } catch (e) {
        return {
            error: true,
            message: String(e),
        };
    }
}


wapopular = async (page = "1", seed = "6316") => {
    try {
        let StatusWaIndonesiaBaseUrl = 'https://www.videostatusmarket.com';
        const { data } = await axios.request({
            url: StatusWaIndonesiaBaseUrl +
                "/videostatus_studio/videostatus_indonesia/get_new_video_portrait.php",
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            data: new URLSearchParams({ seed, page, type: "popular" }),
        }).catch((e) => e?.response);
        if (data && typeof data === "object") {
            return data.items;
        } else {
            throw new Error(`data: ${typeof data}`);
        }
    } catch (e) {
        return {
            error: true,
            message: String(e),
        };
    }
}

asupantt = async (query) => {
    try {
        let url = await fetch('https://aemt.me/download/asupantt?username=' + query, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let data = await url.json();
        console.log(data)
        return data; 
    } catch (error) {
        console.error(error); // Log any errors
        return null; // Or handle the error appropriately
    }
}

toanime = async (url) => {
    try {
        let data = await fetch('https://aemt.me/toanime?url=' + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        let datae = await data.json();
        console.log(datae)
        return datae; 
    } catch (error) {
        console.error(error); // Log any errors
        return null; // Or handle the error appropriately
    }
}

async function ttsearch(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios({
        method: 'POST',
        url: 'https://tikwm.com/api/feed/search',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
          'Cookie': 'current_language=en',
          'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36'
        },
        data: {
          keywords: query,
          count: 10,
          cursor: 0,
          HD: 1
        }
      });
      const videos = response.data.data.videos;
      if (videos.length === 0) {
        reject("Tidak ada video ditemukan.");
      } else {
        const gywee = await Math.floor(Math.random() * videos.length);
        const videorndm = videos[gywee];
        const ttle = videos[gywee].title

// Fixx Title By apxxx.com \\
        const result = {
          title: ttle,
          cover: videorndm.cover,
          origin_cover: videorndm.origin_cover,
          no_watermark: videorndm.play,
          watermark: videorndm.wmplay,
          music: videorndm.music
        };
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function joox(query) {
	return new Promise((resolve, reject) => {
		const time = Math.floor(new Date() / 1000);
		axios
			.get(
				"http://api.joox.com/web-fcgi-bin//web_search?lang=id&country=id&type=0&search_input=" +
					query +
					"&pn=1&sin=0&ein=29&_=" +
					time,
			)
			.then(({ data }) => {
				let result = [];
				let hasil = [];
				let promoses = [];
				let ids = [];
				data.itemlist.forEach((result) => {
					ids.push(result.songid);
				});
				for (let i = 0; i < data.itemlist.length; i++) {
					const get =
						"http://api.joox.com/web-fcgi-bin/web_get_songinfo?songid=" +
						ids[i];
					promoses.push(
						axios
							.get(get, {
								headers: {
									Cookie:
										"wmid=142420656; user_type=1; country=id; session_key=2a5d97d05dc8fe238150184eaf3519ad;",
								},
							})
							.then(({ data }) => {
								const res = JSON.parse(
									data.replace("MusicInfoCallback(", "").replace("\n)", ""),
								);
								hasil.push({
									lagu: res.msong,
									album: res.malbum,
									penyanyi: res.msinger,
									publish: res.public_time,
									img: res.imgSrc,
									mp3: res.mp3Url,
								});
								Promise.all(promoses).then(() =>
									resolve({
										creator: "WH MODS DEV",
										status: true,
										data: hasil,
									}),
								);
							})
							.catch(reject),
					);
				}
			})
			.catch(reject);
	});
}

async function trustpositif(url) {
	if (!url) return false;
	let agent = new https.Agent({ rejectUnauthorized: false });
	url = Array.isArray(url) ? encodeURIComponent(url.join("\n")) : url;
	let { data } = await axios({
		url: "https://trustpositif.kominfo.go.id/Rest_server/getrecordsname_home",
		method: "POST",
		httpsAgent: agent,
		data: {
			name: url,
		},
	});
	let result = {};
	for (let i of data.values) {
		result[i.Domain] = i.Status === "Ada";
	}
	return result;
}

async function facebook(url) {
	return new Promise((resolve, reject) => {
		axios({
			url: "https://aiovideodl.ml/",
			method: "GET",
			headers: {
				"user-agent":
					"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				cookie:
					"PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653",
			},
		}).then((src) => {
			let a = cheerio.load(src.data);
			let token = a("#token").attr("value");
			axios({
				url: "https://aiovideodl.ml/wp-json/aio-dl/video-data/",
				method: "POST",
				headers: {
					"user-agent":
						"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
					cookie:
						"PHPSESSID=69ce1f8034b1567b99297eee2396c308; _ga=GA1.2.1360894709.1632723147; _gid=GA1.2.1782417082.1635161653",
				},
				data: new URLSearchParams(Object.entries({ url: link, token: token })),
			}).then(({ data }) => {
				resolve(data);
			});
		});
	});
}

devianart = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://www.deviantart.com/search?q=' + query)
			.then(({
				data
			}) => {
				const $$ = cheerio.load(data)
				no = ''
				$$('#root > div.hs1JI > div > div._3WsM9 > div > div > div:nth-child(3) > div > div > div:nth-child(1) > div > div:nth-child(1) > div > section > a').each(function(c, d) {
					no = $$(d).attr('href')
				})
				axios.get(no)
					.then(({
						data
					}) => {
						const $ = cheerio.load(data)
						const result = [];
						$('#root > main > div > div._2QovI > div._2rKEX._17aAh._1bdC8 > div > div._2HK_1 > div._1lkTS > div > img').each(function(a, b) {
							result.push($(b).attr('src'))
						})
						resolve(result)
					})
			})
			.catch(reject)
	})
}

function xnxxsearch(query) {
	return new Promise((resolve, reject) => {
		const baseurl = 'https://www.xnxx.com'
		fetch(`${baseurl}/search/${query}/${Math.floor(Math.random() * 3) + 1}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			let title = [];
			let url = [];
			let desc = [];
			let results = [];

			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb').each(function(c, d) {
					url.push(baseurl+$(d).find('a').attr('href').replace("/THUMBNUM/", "/"))
				})
			})
			$('div.mozaique').each(function(a, b) {
				$(b).find('div.thumb-under').each(function(c, d) {
					desc.push($(d).find('p.metadata').text())
					$(d).find('a').each(function(e,f) {
					    title.push($(f).attr('title'))
					})
				})
			})
			for (let i = 0; i < title.length; i++) {
				results.push({
					title: title[i],
					info: desc[i],
					link: url[i]
				})
			}
			resolve({
				code: 200,
				status: true,
				result: results
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}

function xnxxdl(URL) {
	return new Promise((resolve, reject) => {
		fetch(`${URL}`, {method: 'get'})
		.then(res => res.text())
		.then(res => {
			let $ = cheerio.load(res, {
				xmlMode: false
			});
			const title = $('meta[property="og:title"]').attr('content');
			const duration = $('meta[property="og:duration"]').attr('content');
			const image = $('meta[property="og:image"]').attr('content');
			const videoType = $('meta[property="og:video:type"]').attr('content');
			const videoWidth = $('meta[property="og:video:width"]').attr('content');
			const videoHeight = $('meta[property="og:video:height"]').attr('content');
			const info = $('span.metadata').text();
			const videoScript = $('#video-player-bg > script:nth-child(6)').html();
			const files = {
				low: (videoScript.match('html5player.setVideoUrlLow\\(\'(.*?)\'\\);') || [])[1],
				high: videoScript.match('html5player.setVideoUrlHigh\\(\'(.*?)\'\\);' || [])[1],
				HLS: videoScript.match('html5player.setVideoHLS\\(\'(.*?)\'\\);' || [])[1],
				thumb: videoScript.match('html5player.setThumbUrl\\(\'(.*?)\'\\);' || [])[1],
				thumb69: videoScript.match('html5player.setThumbUrl169\\(\'(.*?)\'\\);' || [])[1],
				thumbSlide: videoScript.match('html5player.setThumbSlide\\(\'(.*?)\'\\);' || [])[1],
				thumbSlideBig: videoScript.match('html5player.setThumbSlideBig\\(\'(.*?)\'\\);' || [])[1],
			};
			resolve({
				status: 200,
				result: {
					title,
					URL,
					duration,
					image,
					videoType,
					videoWidth,
					videoHeight,
					info,
					files
				}
			})
		})
		.catch(err => reject({code: 503, status: false, result: err }))
	})
}

text2img = async (text) => {
    try {
        const { data } = await axios.request({
            baseURL: "https://aemt.me",
            url: "/ai/text2img",
            method: "GET",
            params: {
                text,
            },
            responseType: 'arraybuffer'
        });
        return {
            creator: global.creator,
            status: true,
            result: data
        };
    } catch (error) {
        console.error(error); // Log any errors
        return null; // Or handle the error appropriately
    }
}

async function removebg(input) {
const baseUrl = 'https://tools.betabotz.org';
  const image = await Jimp.read(input);
  const buffer = await new Promise((resolve, reject) => {
    image.getBuffer(Jimp.MIME_JPEG, (err, buf) => {
      if (err) {
        reject('Terjadi Error Saat Mengambil Data......');
      } else {
        resolve(buf);
      }
    });
  });
  const form = new FormData();
  form.append('image', buffer, { filename: 'removebg.jpg' });
  try {
    const { data } = await axios.post(`${baseUrl}/ai/removebg`, form, {
      headers: {
        ...form.getHeaders(),
        'accept': 'application/json',
      },
    });
    var res = {
      image_data: data.result,
      image_size: data.size
    };
    return res;
  } catch (error) {
    console.error('Identifikasi Gagal:', error);
    return 'Identifikasi Gagal';
  }
}

async function tozombie(input) {
const baseUrl = 'https://tools.betabotz.org';
  const image = await Jimp.read(input);
  const buffer = await new Promise((resolve, reject) => {
    image.getBuffer(Jimp.MIME_JPEG, (err, buf) => {
      if (err) {
        reject('Terjadi Error Saat Mengambil Data......');
      } else {
        resolve(buf);
      }
    });
  });
  const form = new FormData();
  form.append('image', buffer, { filename: 'tozombie.jpg' });
  try {
    const { data } = await axios.post(`${baseUrl}/ai/tozombie`, form, {
      headers: {
        ...form.getHeaders(),
        'accept': 'application/json',
      },
    });
    var res = {
      image_data: data.result,
      image_size: data.size
    };
    return res;
  } catch (error) {
    console.error('Identifikasi Gagal:', error);
    return 'Identifikasi Gagal';
  }
}

function umma(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
        .then((res) => {
            let $ = cheerio.load(res.data)
            let image = []
            $('#article-content > div').find('img').each(function (a, b) {
                image.push($(b).attr('src')) 
            })
            let hasil = {
                title: $('#wrap > div.content-container.font-6-16 > h1').text().trim(),
                author: {
                    name: $('#wrap > div.content-container.font-6-16 > div.content-top > div > div.user-ame.font-6-16.fw').text().trim(),
                    profilePic: $('#wrap > div.content-container.font-6-16 > div.content-top > div > div.profile-photo > img.photo').attr('src')
                },
                caption: $('#article-content > div > p').text().trim(),
                media: $('#article-content > div > iframe').attr('src') ? [$('#article-content > div > iframe').attr('src')] : image,
                type: $('#article-content > div > iframe').attr('src') ? 'video' : 'image',
                like: $('#wrap > div.bottom-btns > div > button:nth-child(1) > div.text.font-6-12').text(),
            }
            resolve(hasil)
        })
    })
}

async function tiktokdl(url) {
  try {
    const data = new URLSearchParams({
      'id': url,
      'locale': 'id',
      'tt': 'RFBiZ3Bi'
    });

    const headers = {
      'HX-Request': true,
      'HX-Trigger': '_gcaptcha_pt',
      'HX-Target': 'target',
      'HX-Current-URL': 'https://ssstik.io/id',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36',
      'Referer': 'https://ssstik.io/id'
    };

    const response = await axios.post('https://ssstik.io/abc?url=dl', data, { headers });
    const html = response.data;

    const $ = cheerio.load(html);

    const author = $('#avatarAndTextUsual h2').text().trim();
    const title = $('#avatarAndTextUsual p').text().trim();
    const video = $('.result_overlay_buttons a.download_link').attr('href');
    const audio = $('.result_overlay_buttons a.download_link.music').attr('href');
    const imgLinks = [];
    $('img[data-splide-lazy]').each((index, element) => {
    const imgLink = $(element).attr('data-splide-lazy');
    imgLinks.push(imgLink); 
    });
    
    const result = {
      author,
      title,
      result: video || imgLinks,
      audio
    };
  return result
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

async function getVideoFPS(videoPath) {
  return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) {
                reject(err);
            } else {
                const fps = metadata.streams
                    .filter(stream => stream.codec_type === 'video')
                    .map(stream => stream.r_frame_rate)
                    .map(rate => {
                        const [numerator, denominator] = rate.split('/');
                        return parseFloat(numerator) / parseFloat(denominator);
                    })[0];
                resolve(fps);
            }
        });
    });
}

async function LK21Scraperlatest(page = 0) {
        try {
            const response = await axios.request({
                method: "GET",
                baseURL: "https://tv2.lk21official.wiki",
                url: `/latest/page/${page}/`,
                headers: {
                    "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
                },
            });

            const $ = cheerio.load(response.data);
            const result = $(`div#grid-wrapper > div.col-lg-2.col-sm-3.col-xs-4.page-${page}.infscroll-item`).map((_, el) => ({
                title: $(el).find(".mega-item > .grid-header > h1").text().trim().replace("Nonton ", '').replace(" Film Subtitle Indonesia Streaming Movie Download", '').trim(),
                link: $(el).find(".mega-item > .grid-poster > a").attr('href'),
                rating: $(el).find(".mega-item > .grid-poster > .grid-meta > .rating").text().trim(),
                quality: $(el).find(".mega-item > .grid-poster > .grid-meta > .quality.quality-HD").text().trim(),
                duration: $(el).find(".mega-item > .grid-poster > .grid-meta > .duration").text().trim(),
                tags: $(el).find(".mega-item > .grid-action > .grid-categories > a").map((_, e) => $(e).text().trim()).get(),
                image: "https:" + $(el).find(".mega-item > .grid-poster > a > picture > img").attr("src")
            })).get();

            return {
                total: result.length,
                page: page,
                result: result
            };
        } catch (error) {
            console.error("Terjadi kesalahan:", error);
            return null;
        }
    }

function XPanas(search = 'indonesia') {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('http://164.68.127.15/?id=' + search)
      const $ = cheerio.load(data)
      const ajg = []
      $('#content > .mozaique.thumbs-5 > center > .thumb-block > .thumb-inside > .thumb > a').each((i, u) => {
        ajg.push({
          nonton: 'https://164.68.127.15' + $(u).attr('href'),
          img: $(u).find('img').attr('data-src'),
          title: $(u).find('img').attr('title')
        })
      })
      if (ajg.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(ajg)
    } catch (err) {
      console.error(err)
    }
  })
}
function WikiMedia(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`https://commons.wikimedia.org/w/index.php?search=${search}&title=Special:MediaSearch&go=Go&type=image`)
      const $ = cheerio.load(data)
      const hasil = []
      $('.sdms-search-results__list-wrapper > div > a').each(function (a, b) {
        hasil.push({
          title: $(b).find('img').attr('alt'),
          source: $(b).attr('href'),
          image: $(b).find('img').attr('data-src') || $(b).find('img').attr('src')
        })
      })
      if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function SoundCloudeS(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.get(`https://soundcloud.com/search?q=${search}`)
      const $ = cheerio.load(data)
      const ajg = []
      $('#app > noscript').each((u, i) => {
        ajg.push($(i).html())
      })
      const _$ = cheerio.load(ajg[1])
      const hasil = []
      _$('ul > li > h2 > a').each((i, u) => {
        if ($(u).attr('href').split('/').length === 3) {
          const linkk = $(u).attr('href')
          const judul = $(u).text()
          const link = linkk ? linkk : 'Tidak ditemukan'
          const jdi = `https://soundcloud.com${link}`
          const jadu = judul ? judul : 'Tidak ada judul'
          hasil.push({
            link: jdi,
            judul: jadu
          })
        }
      })
      if (hasil.every(x => x === undefined)) return { developer: '@xorizn', mess: 'no result found' }
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function RingTone(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://meloboom.com/en/search/' + search)
      let $ = cheerio.load(data)
      let hasil = []
      $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function (a, b) {
        hasil.push({ title: $(b).find('h4').text(), source: 'https://meloboom.com/' + $(b).find('a').attr('href'), audio: $(b).find('audio').attr('src') })
      })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function PlayStore(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.get(`https://play.google.com/store/search?q=${search}&c=apps`)
      const hasil = []
      const $ = cheerio.load(data)
      $('.ULeU3b > .VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.Y8RQXd > .VfPpkd-aGsRMb > .VfPpkd-EScbFb-JIbuQc.TAQqTe > a').each((i, u) => {
        const linkk = $(u).attr('href')
        const nama = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .DdYX5').text()
        const developer = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .wMUdtb').text()
        const img = $(u).find('.j2FCNc > img').attr('src')
        const rate = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div').attr('aria-label')
        const rate2 = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div > span.w2kbF').text()
        const link = `https://play.google.com${linkk}`

        hasil.push({
          link: link,
          nama: nama ? nama : 'No name',
          developer: developer ? developer : 'No Developer',
          img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png',
          rate: rate ? rate : 'No Rate',
          rate2: rate2 ? rate2 : 'No Rate',
          link_dev: `https://play.google.com/store/apps/developer?id=${developer.split(" ").join('+')}`
        })
      })
      if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}

function TixID() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.tix.id/tix-now/')
      const $ = cheerio.load(data)
      const hasil = []
      $('div.gt-blog-list > .gt-item').each((i, u) => {
        hasil.push({
          link: $(u).find('.gt-image > a').attr('href'),
          image: $(u).find('.gt-image > a > img').attr('data-src'),
          judul: $(u).find('.gt-title > a').text(),
          tanggal: $(u).find('.gt-details > ul > .gt-date > span').text(),
          deskripsi: $(u).find('.gt-excerpt > p').text(),
        })
      })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function BukaLapak(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search[keywords]=${search}&search_source=omnisearch_keyword&source=navbar`, {
        headers: {
          "user-agent": 'Mozilla/ 5.0(Windows NT 10.0; Win64; x64; rv: 108.0) Gecko / 20100101 Firefox / 108.0'
        }
      })
      const $ = cheerio.load(data);
      const dat = [];
      const b = $('a.slide > img').attr('src');
      $('div.bl-flex-item.mb-8').each((i, u) => {
        const a = $(u).find('observer-tracker > div > div');
        const img = $(a).find('div > a > img').attr('src');
        if (typeof img === 'undefined') return

        const link = $(a).find('.bl-thumbnail--slider > div > a').attr('href');
        const title = $(a).find('.bl-product-card__description-name > p > a').text().trim();
        const harga = $(a).find('div.bl-product-card__description-price > p').text().trim();
        const rating = $(a).find('div.bl-product-card__description-rating > p').text().trim();
        const terjual = $(a).find('div.bl-product-card__description-rating-and-sold > p').text().trim();

        const dari = $(a).find('div.bl-product-card__description-store > span:nth-child(1)').text().trim();
        const seller = $(a).find('div.bl-product-card__description-store > span > a').text().trim();
        const link_sel = $(a).find('div.bl-product-card__description-store > span > a').attr('href');

        const res_ = {
          title: title,
          rating: rating ? rating : 'No rating yet',
          terjual: terjual ? terjual : 'Not yet bought',
          harga: harga,
          image: img,
          link: link,
          store: {
            lokasi: dari,
            nama: seller,
            link: link_sel
          }
        };

        dat.push(res_);
      })
      if (dat.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(dat)
    } catch (err) {
      console.error(err)
    }
  })
}
function AcaraNow() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.jadwaltv.net/channel/acara-tv-nasional-saat-ini');
      const $ = cheerio.load(data)
      let tv = []
      $('table.table.table-bordered > tbody > tr').each((u, i) => {
        let an = $(i).text().split('WIB')
        if (an[0] === 'JamAcara') return
        if (typeof an[1] === 'undefined') return tv.push('\n' + '*' + an[0] + '*')
        tv.push(`${an[0]} - ${an[1]}`)
      })
      if (tv.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(tv)
    } catch (err) {
      console.error(err)
    }
  })
}
function Jadwal_Sepakbola() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.jadwaltv.net/jadwal-sepakbola');
      const $ = cheerio.load(data)
      let tv = []
      $('table.table.table-bordered > tbody > tr.jklIv').each((u, i) => {
        let an = $(i).html().replace(/<td>/g, '').replace(/<\/td>/g, ' - ')
        tv.push(`${an.substring(0, an.length - 3)}`)
      })
      if (tv.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(tv)
    } catch (err) {
      console.error(err)
    }
  })
}
function JadwalTV(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.jadwaltv.net/channel/' + query);
      const $ = cheerio.load(data);
      const tv = []
      $('table.table.table-bordered > tbody > tr.jklIv').each((u, i) => {
        let an = $(i).text().split('WIB')
        tv.push(`${an[0]} - ${an[1]}`)
      })
      if (tv.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(tv.join('\n'))
    } catch (err) {
      console.error(err)
    }
  })
}
function Steam2(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.get('https://store.steampowered.com/search/?term=' + search)
      const $ = cheerio.load(data)
      const hasil = []
      $('#search_resultsRows > a').each((a, b) => {
        const link = $(b).attr('href')
        const judul = $(b).find(`div.responsive_search_name_combined > div.col.search_name.ellipsis > span`).text()
        const harga = $(b).find(`div.responsive_search_name_combined > div.col.search_price_discount_combined.responsive_secondrow > div.col.search_price.responsive_secondrow `).text().replace(/ /g, '').replace(/\n/g, '')
        var rating = $(b).find(`div.responsive_search_name_combined > div.col.search_reviewscore.responsive_secondrow > span`).attr('data-tooltip-html')
        const img = $(b).find(`div.col.search_capsule > img`).attr('src')
        const rilis = $(b).find(`div.responsive_search_name_combined > div.col.search_released.responsive_secondrow`).text()

        if (typeof rating === 'undefined') {
          var rating = 'no ratings'
        }
        if (rating.split('<br>')) {
          let hhh = rating.split('<br>')
          var rating = `${hhh[0]} ${hhh[1]}`
        }
        hasil.push({
          judul: judul,
          img: img,
          link: link,
          rilis: rilis,
          harga: harga ? harga : 'no price',
          rating: rating
        })
      })
      if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function Steam_Detail(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.get(url)
      const $ = cheerio.load(data)
      const xorizn = []
      const img = $('#gameHeaderImageCtn > img').attr('src')
      $('div.game_area_sys_req.sysreq_content.active > div > ul > ul > li').each((u, i) => { xorizn.push($(i).text()) })
      const hasil = $('#genresAndManufacturer').html().replace(/\n/g, '').replace(/<br>/g, '\n').replace(/\t/g, '').replace(/<b>/g, '').replace(/<\/div>/g, '\n').replace(/ /g, '').replace(/<\/b>/g, ' ').replace(/<[^>]*>/g, '')
      const desc = $('div.game_description_snippet').text().replace(/\t/g, '').replace(/\n/g, '')
      const hasill = {
        desc: desc ? desc : 'Error',
        img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png',
        system: xorizn.join('\n') ? xorizn.join('\n') : 'Error',
        info: hasil
      }
      resolve(hasill)
    } catch (err) {
      console.error(err)
    }
  })
}
function WattPad(judul) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.wattpad.com/search/' + judul, {
        headers: {
          cookie: 'wp_id=d92aecaa-7822-4f56-b189-f8c4cc32825c; sn__time=j%3Anull; fs__exp=1; adMetrics=0; _pbkvid05_=0; _pbeb_=0; _nrta50_=0; lang=20; locale=id_ID; ff=1; dpr=1; tz=-8; te_session_id=1681636962513; _ga_FNDTZ0MZDQ=GS1.1.1681636962.1.1.1681637905.0.0.0; _ga=GA1.1.1642362362.1681636963; signupFrom=search; g_state={"i_p":1681644176441,"i_l":1}; RT=r=https%3A%2F%2Fwww.wattpad.com%2Fsearch%2Fanime&ul=1681637915624',
          'suer-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0'
        }
      }),
        $ = cheerio.load(data),
        limk = 'https://www.wattpad.com',
        _data = [];
      $('.story-card-container > ul.list-group.new-list-group > li.list-group-item').each(function (i, u) {
        let link = limk + $(u).find('a').attr('href')
        let judul = $(u).find('a > div > div.story-info > div.title').text().trim()
        let img = $(u).find('a > div > div.cover > img').attr('src')
        let desc = $(u).find('a > div > div.story-info > .description').text().replace(/\s+/g, ' ')
        let _doto = []
        $(u).find('a > div > div.story-info > .new-story-stats > .stats-item').each((u, i) => {
          _doto.push($(i).find('.icon-container > .tool-tip > .sr-only').text())
        })
        _data.push({
          title: judul,
          thumb: img,
          desc: desc,
          reads: _doto[0],
          vote: _doto[1],
          chapter: _doto[2],
          link: link,
        })
      })

      resolve(_data)
    } catch (err) {
      console.error(err)
    }
  })
}
function LinkWa(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=' + query + '&searchby=name')
      const $ = cheerio.load(data),
        _title = [],
        _link = [],
        result = [];
      $('.wa-chat-title > .wa-chat-title-text').each((u, i) => {
        $('span[style="display:none;"]').remove();
        _title.push($(i).html().replace(/<\/?[^>]+(>|$)/g, ''))
      })
      $('.wa-chat-message > a').each((u, i) => {
        _link.push($(i).text().trim())
      })
      for (let i = 0; i < _link.length; i++) {
        result.push({
          title: _title[i],
          link: _link[i]
        })
      }
      resolve(result)
    } catch (err) {
      console.error(err)
    }
  })
}
function Lirik2(judul) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.musixmatch.com/search/' + judul),
        $ = cheerio.load(data),
        hasil = {},
        limk = 'https://www.musixmatch.com',
        link = limk + $('div.media-card-body > div > h2').find('a').attr('href');
      await axios.get(link).then(({ data }) => {
        const $$ = cheerio.load(data)
        hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
        $$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function (a, b) {
          hasil.lirik = $$(b).find('span > p > span').text() + '\n' + $$(b).find('span > div > p > span').text()
        })
      })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function KBBI(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://kbbi.kemdikbud.go.id/entri/' + query);
      const $ = cheerio.load(data);
      let _kata = []
      let _arti = []
      let _ol = []
      $('h2[style="margin-bottom:3px"]').each((i, u) => {
        _kata.push($(u).text().trim())
      })
      $('div.container.body-content').find('li').each((i, u) => {
        let hasil = $(u).html().replace(/<[^>]+>/g, ' ').replace(/ {2,}/g, ' ').trim()
        _arti.push(hasil)
      })
      $('ol > li').each(function (i, u) {
        _ol.push($(u).html().replace(/<[^>]+>/g, ' ').replace(/ {2,}/g, ' ').trim())
      })
      _arti.splice(_arti.length - 3, 3);
      if (!(_ol.length === 0)) {
        resolve({
          lema: _kata[0],
          arti: _ol
        })
      } else {
        resolve({
          lema: _kata[0],
          arti: _arti
        })
      }
    } catch (err) {
      console.error(err)
    }
  })
}
function Nomina(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://tesaurus.kemdikbud.go.id/tematis/lema/' + query + '/nomina');
      const $ = cheerio.load(data);
      let _arti = []
      $('.search-result-area > .result-par > .contain > .result-set').each((i, u) => {
        _arti.push($(u).text().trim())
      })
      resolve({
        lema: query,
        nomina: _arti,
        length: _arti.length
      })
    } catch (err) {
      console.error(err)
    }
  })
}
function KodePos(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://nomorkodepos.com/?s=' + query);
      const $ = cheerio.load(data);
      let _data = []

      $('table.pure-table.pure-table-horizontal > tbody > tr').each((i, u) => {
        let _doto = [];
        $(u).find('td').each((l, p) => {
          _doto.push($(p).text().trim())
        })
        _data.push({
          province: _doto[0],
          city: _doto[1],
          subdistrict: _doto[2],
          village: _doto[3],
          postalcode: _doto[4]
        })
      })
      resolve(_data)
    } catch (err) {
      console.error(err)
    }
  })
}
function ListHero() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://mobile-legends.fandom.com/wiki/List_of_heroes');
      const $ = cheerio.load(data);
      let _data = []

      $('table.wikitable.sortable > tbody > tr').each((i, u) => {
        let hero_icon = $(u).find('td:nth-child(1) > center > a > img').attr('data-src')
        if (typeof hero_icon === 'undefined') return
        let name = $(u).find('td:nth-child(2)').text().trim()
        let hero_code = $(u).find('td:nth-child(3)').text().trim()
        let role = $(u).find('td:nth-child(4)').text().trim()
        let specialties = $(u).find('td:nth-child(5)').text().trim()
        let laning = $(u).find('td:nth-child(6)').text().trim()
        let release = $(u).find('td:nth-child(7)').text().trim()
        let price = $(u).find('td:nth-child(8)').text().trim()
        _data.push({
          hero_icon: hero_icon,
          name: name,
          hero_code: hero_code,
          role: role,
          specialties: specialties,
          laning: laning,
          release: release,
          price: price,
        })
      })
      resolve(_data)
    } catch (err) {
      console.error(err)
    }
  })
}
function Hero(querry) {
  return new Promise(async (resolve, reject) => {
    try {
      let upper = querry.charAt(0).toUpperCase() + querry.slice(1).toLowerCase()
      const { data, status } = await axios.get('https://mobile-legends.fandom.com/wiki/' + upper);
      if (status === 200) {
        const $ = cheerio.load(data);
        let atributes = []
        let rill = []
        let rull = []
        let rell = []
        let hero_img = $('figure.pi-item.pi-image > a > img').attr('src')
        let desc = $('div.mw-parser-output > p:nth-child(6)').text()
        $('.mw-parser-output > table:nth-child(9) > tbody > tr').each((u, i) => {
          let _doto = []
          $(i).find('td').each((o, p) => { _doto.push($(p).text().trim()) })
          if (_doto.length === 0) return
          atributes.push({
            attribute: _doto[0],
            level_1: _doto[1],
            level_15: _doto[2],
            growth: _doto.pop()
          })
        })
        $('div.pi-item.pi-data.pi-item-spacing.pi-border-color > div.pi-data-value.pi-font').each((i, u) => { rill.push($(u).text().trim()) })
        $('aside.portable-infobox.pi-background.pi-border-color.pi-theme-wikia.pi-layout-default').each((i, u) => { rull.push($(u).html()) })
        const _$ = cheerio.load(rull[1])
        _$('.pi-item.pi-data.pi-item-spacing.pi-border-color').each((l, m) => {
          rell.push(_$(m).text().trim().replace(/\n/g, ':').replace(/\t/g, ''))
        })
        const result = rell.reduce((acc, curr) => {
          const [key, value] = curr.split('::');
          acc[key] = value;
          return acc;
        }, {});
        let anu = {
          hero_img: hero_img,
          desc: desc,
          release: rill[0],
          role: rill[1],
          specialty: rill[2],
          lane: rill[3],
          price: rill[4],
          gameplay_info: {
            durability: rill[5],
            offense: rill[6],
            control_effect: rill[7],
            difficulty: rill[8],
          },
          story_info_list: result,
          story_info_array: rell,
          attributes: atributes
        }
        resolve(anu)
      } else if (status === 400) {
        resolve({ mess: 'hh'})
      }
      console.log(status)
    } catch (err) {
      resolve({ mess: 'asu'})
    }
  })
}

function designer(prompt) {
      return new Promise(async (resolve) => {
         try {
            let axios = require('axios')
            let FormData = require('form-data')
            let form = new FormData()
            form.append('dalle-caption', prompt)
            form.append('dalle-scenario-name', 'TextToImage')
            form.append('dalle-batch-size', 4)
            form.append('dalle-image-response-format', 'UrlWithBase64Thumbnail')
            form.append('dalle-seed', 182)
            form.append('ClientFlights', 'EnableBICForDALLEFlight')
            let json = await (await axios.post('https://designerapp.officeapps.live.com/designerapp/DallE.ashx?action=GetDallEImagesCogSci', form, {
            headers: {
            "Accept": "application/json, text/plain, */*",
            "Accept-Language": "id-ID,id;q=0.9,en-GB;q=0.8,en;q=0.7,en-US;q=0.6,ms;q=0.5",
            "Authorization": "taroh token ligin bing ngentod",
            "Dnt": "1",
            "Content-Type": "multipart/form-data",
            "Origin": "https://designer.microsoft.com",
            "Referer": "https://designer.microsoft.com/",
            "Sec-Ch-Ua": '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
            "Sec-Ch-Ua-Mobile": "?0",
            "Sec-Ch-Ua-Platform": "Windows",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mcde": "cors",
            "Sec-Fetch-Site": "same-site",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            ...form.getHeaders()
            }})).data
            resolve(json)
         } catch (e) {
            console.log(e)
            return resolve({
               creator: global.creator,
               status: false,
               msg: e.response.data
            })
         }
      })
   }

async function stabilityai(prompt) {
  return new Promise((resolve, reject) => {
    /*
      * wm
      * By Arifzyn 
    */
    axios.post('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', {
        inputs: prompt
    }, {
        headers: {
            'authorization': 'Bearer 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',
            'content-type': 'text/plain;charset=UTF-8',
            'Referer': 'https://stability.my.id/',
        },
        responseType: 'arraybuffer' 
    })
    .then(response => {
        resolve(response.data);
    })
    .catch(error => {
        reject(error);
    });
  });
}

 async function upscale(buffer) {
	let req = await require('axios').post('https://backend.zyro.com/v1/ai/upscale-image', {
		image: `data:image/jpeg;base64,${buffer.toString('base64')}`
	}).catch(e => e.response)
	if (req.status !== 200) throw req.data || req.statusText
	return Buffer.from(req.data.result.split(',')[1], 'base64')
}

async function nexLibur() {
  const { data } = await axios.get("https://www.liburnasional.com/");
  let libnas_content = [];
  let $ = cheerio.load(data);
  let result = {
    nextLibur:
      "Hari libur" +
      $("div.row.row-alert > div").text().split("Hari libur")[1].trim(),
    libnas_content,
  };
  $("tbody > tr > td > span > div").each(function (a, b) {
    const summary = $(b).find("span > strong > a").text();
    const days = $(b).find("div.libnas-calendar-holiday-weekday").text();
    const dateMonth = $(b).find("time.libnas-calendar-holiday-datemonth").text();
    const img = $(b).find(".libnas-holiday-calendar-img").attr("src")
    libnas_content.push({ summary, days, dateMonth, img });
  });
  return result;
}

async function spotify2 (url) {
let data = axios.get(`https://api.spotify.com?media=${url}`)
return data
console.log('done')
}

async function facebook2(link) {
	return new Promise((resolve,reject) => {
	let config = {
		'url': link
		}
	axios('https://www.getfvid.com/downloader',{
			method: 'POST',
			data: new URLSearchParams(Object.entries(config)),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent":  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
				"cookie": "_ga=GA1.2.1310699039.1624884412; _pbjs_userid_consent_data=3524755945110770; cto_bidid=rQH5Tl9NNm5IWFZsem00SVVuZGpEd21sWnp0WmhUeTZpRXdkWlRUOSUyQkYlMkJQQnJRSHVPZ3Fhb1R2UUFiTWJuVGlhVkN1TGM2anhDT1M1Qk0ydHlBb21LJTJGNkdCOWtZalRtZFlxJTJGa3FVTG1TaHlzdDRvJTNE; cto_bundle=g1Ka319NaThuSmh6UklyWm5vV2pkb3NYaUZMeWlHVUtDbVBmeldhNm5qVGVwWnJzSUElMkJXVDdORmU5VElvV2pXUTJhQ3owVWI5enE1WjJ4ZHR5NDZqd1hCZnVHVGZmOEd0eURzcSUyQkNDcHZsR0xJcTZaRFZEMDkzUk1xSmhYMlY0TTdUY0hpZm9NTk5GYXVxWjBJZTR0dE9rQmZ3JTNEJTNE; _gid=GA1.2.908874955.1625126838; __gads=ID=5be9d413ff899546-22e04a9e18ca0046:T=1625126836:RT=1625126836:S=ALNI_Ma0axY94aSdwMIg95hxZVZ-JGNT2w; cookieconsent_status=dismiss"
			}
		})
	.then(async({ data }) => {
		const $ = cheerio.load(data)	
		resolve({
			video_sd: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
			video_hd: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(1) > a').attr('href'),
			audio: $('body > div.page-content > div > div > div.col-lg-10.col-md-10.col-centered > div > div:nth-child(3) > div > div.col-md-4.btns-download > p:nth-child(2) > a').attr('href')
			})
		})
	.catch(reject)
	})
}

async function capcut(urlCapcut) {
const url = "https://www.capcut.com/watch/7347877014747024647?use_new_ui=0&template_id=7347877014747024647&share_token=3573980f-397c-4b35-927a-9de4a16550c5&enter_from=template_detail&region=ID&language=en&platform=copy_link&is_copy_link=1";
const json = { "url": url };
const { data } = await Functs.axios.post("https://api.teknogram.id/v1/capcut", json, { headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
});

const link = data.url.replace("open.", "");

return data;
}

async function chatgpt(prompt) {
  
   const response = await axios.get("https://tools.revesery.com/ai/ai.php?query=" + prompt, {
     headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36'
      }
    });
    const res = response.data
    const result = res.result
    return result
  }

async function findSongs(text) {
    try {
        const {
            data
        } = await axios.get("https://songsear.ch/q/" + encodeURIComponent(text));
        const $ = cheerio.load(data);
        const result = {
            title: $("div.results > div:nth-child(1) > .head > h3 > b").text() + " - " + $("div.results > div:nth-child(1) > .head > h2 > a").text(),
            album: $("div.results > div:nth-child(1) > .head > p").text(),
            number: $("div.results > div:nth-child(1) > .head > a").attr("href").split("/")[4],
            thumb: $("div.results > div:nth-child(1) > .head > a > img").attr("src")
        };

        const {
            data: lyricData
        } = await axios.get(`https://songsear.ch/api/song/${result.number}?text_only=true`);
        const lyrics = lyricData.song.text_html.replace(/<br\/>/g, "\n").replace(/&#x27;/g, "'");

        return {
            status: true,
            title: result.title,
            album: result.album,
            thumb: result.thumb,
            lyrics: lyrics
        };
    } catch (err) {
        console.log(err);
        return {
            status: false,
            error: "Unknown error occurred"
        };
    }
}

async function imgHd(url, scales) {
 let data = axios(`https://toolsapi.spyne.ai/api/forward`, {
    method: "post",
    data: {
      image_url: url,
      scale: scales,
      save_params: {
        extension: ".png",
        quality: 100,
      },
    },
    headers: {
      "content-type": "application/json",
      accept: "*/*",
    },
  })
  return data
}

async function chatgpt3(prompt) {
  try {
   const response = await axios.get("https://tools.revesery.com/ai/ai.php?query=" + prompt, {
     headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36'
      }
    });
    const res = response.data
    const result = res.result
    return result
  } catch (error) {
  console.error(error)
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

  const bardRes = await fetch("https://bard.google.com/", { method: 'get', headers });
  const bardText = await bardRes.text();

  const [snlM0e, blValue] = [bardText.match(/"SNlM0e":"(.*?)"/)?.[1], bardText.match(/"cfb2h":"(.*?)"/)?.[1]];

  const bodyData = `f.req=[null,"[[\\"${encodeURIComponent(query)}\\"],null,[\\"\\",\\"\\",\\"\\"]]\"]&at=${snlM0e}`;
  const response = await fetch(`https://bard.google.com/_/BardChatUi/data/assistant.lamda.BardFrontendService/StreamGenerate?bl=${blValue}&_reqid=229189&rt=c`, { method: 'post', headers, body: bodyData });
  const answer = JSON.parse(JSON.parse((await response.text()).split("\n").reduce((a, b) => (a.length > b.length ? a : b), ""))[0][2])[4][0][1];

  return answer;
}

async function aio(url){
	return new Promise(async(resolve,reject) => {
		
 const { data: rest } = await axios.get("https://steptodown.com/")
    const $ = cheerio.load(rest) 
    const tokens = $("input[name='token']").val()
    const data = new URLSearchParams(
      Object.entries({
        url: url,
        token: tokens 
      })
    )    
    await axios.post("https://steptodown.com/wp-json/aio-dl/video-data/", data, {
      headers: {
        "cookie": "PHPSESSID=658754a80bacc095aced0be8e110f3b4; pll_language=en",
        "user-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      }
    })
    .then(( response ) => {
      resolve(response.data)
    })
    .catch((e) => {
      reject(e)
    })
  })
}

async function fetchDoods(url) {
    return new Promise(async (resolve, reject) => {
        const base_url = "https://api.hunternblz.com/doodstream";
        try {
            const { data } = await axios.post(
                base_url,
                {
                    pesan: "API+INI+BEBAS+DIPAKAI",
                    url,
                },
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
                    },
                }
            );
            resolve(data);
        } catch (error) {
            reject(error.response.data);
        }
    });
}

async function InstagramStory(User) {
  return new Promise((resolve, reject) => {
    axios(`https://igs.sf-converter.com/api/profile/${User}`, {
      method: "GET",
      headers: {
        "accept": "*/*",
        "origin": "https://id.savefrom.net",
        "referer": "https://id.savefrom.net/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Windows; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36"
      }
    }).then(({ data }) => {
      let id = data.result.id;
      axios(`https://igs.sf-converter.com/api/stories/${id}`, {
        method: "GET",
        headers: {
          "accept": "*/*",
          "origin": "https://id.savefrom.net",
          "referer": "https://id.savefrom.net/",
          "user-agent": "Mozilla/5.0 (Windows NT 10.0; Windows; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.5060.114 Safari/537.36"
        }
      }).then(({ data }) => {
        let result = [];
        data.result.forEach((obj) => {
          let image_url, video_url;
          obj?.image_versions2?.candidates?.forEach((candidate) => {
            if (candidate.width === 1080) {
              image_url = candidate.url;
            }
          });
          obj?.video_versions?.forEach((video) => {
            if (video.type === 101) {
              video_url = video.url;
            }
          });
          let fileType = obj.video ? 'mp4' : 'jpg';
          let newObject = {
            "type": fileType,
            "url": obj.video ? video_url : image_url
          };
          result.push(newObject);
        });

        let responseData = {
          "creator": `@${User}`,
          "status": true,
          "data": result
        };

        resolve(responseData);
      }).catch(reject);
    }).catch(reject);
  });
}

async function animeFilter(image) {
  return new Promise(async (resolve, reject) => {
    axios("https://akhaliq-animeganv2.hf.space/api/queue/push/", {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      },
      data: {
        "fn_index": 0,
        "data": [
          "data:image/jpeg;base64," + image.toString('base64'),
          "version 2 (🔺 robustness,🔻 stylization)"
        ],
        "action": "predict",
        "session_hash": "38qambhlxa8"
      },
      method: "POST"
    }).then(a => {
      let id = a.data.hash;
      axios("https://akhaliq-animeganv2.hf.space/api/queue/status/", {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
        },
        data: {
          "hash": id
        },
        method: "POST"
      }).then(tes => {
        resolve(tes.data.data.data);
      });
    });
  });
}

async function RemoveBackground(url, ibbkey) {
    let Response = null;
    let task_id;
    await fetch("https://api.simplified.com/api/v1/growth-tools", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: "REMOVE_BACKGROUND",
                image_url: url,
                image_type: "image/jpg",
            }),
        })
        .then((res) => res.json())
        .then((json) => {
            task_id = json.task_id;
        })
        .catch((err) => console.log(err));

    while (true) {
        Response = await (
            await fetch("https://api.simplified.com/api/v1/tasks/" + task_id, {
                method: "GET",
                hostname: "api.simplified.com",
            })
        ).json();
        if (Response.info != "") {
            let IBB = await UploadToIBB(Response.info.data.url, 600, ibbkey)
            return IBB;
        }
    }
}

async function GPT(text) {
  return new Promise(async (resolve, reject) => {
    axios("https://www.chatgptdownload.org/wp-json/mwai-ui/v1/chats/submit", {
      "headers": {
        "content-type": "application/json",
        "User-Agent": "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Mobile Safari/537.36"
      },
      data: {
        "id": null,
        "botId": "default",
        "session": "y2cog0j45q",
        "clientId": "7tzjniqtrgx",
        "contextId": 443,
        "messages": [{
          "id": "fkzhaikd7vh",
          "role": "assistant",
          "content": "Ini adalah Ai, yang diciptakan oleh perusaan Rokumo Enterpise",
          "who": "AI: ",
          "timestamp": 1695725910365
        }],
        "newMessage": text,
        "stream": false
      },
      "method": "POST"
    }).then(response => {
      resolve(response.data);
    });
  });
}

async function imageAnime(url) {
  return new Promise(async(resolve, reject) => {
    let { data } = await axios({
      url: "https://tools.revesery.com/image-anime/convert.php",
      method: "POST",
      data: new URLSearchParams(Object.entries({
        "image-url": url
      })),
      headeres: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    console.log(data)
    resolve(data)
  })
  
}

async function playaudio(query) {
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
                const id = yt.getVideoID(url[0])
                const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
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

async function playvideo(query) {
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
                const id = yt.getVideoID(url[0])
                const yutub = yt.getInfo(`https://www.youtube.com/watch?v=${id}`)
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

async function getUserTiktok(username) {
   return new Promise(async (resolve) => {
      try {
         const json = await (
            await axios.get(
               'https://tiktok-video-no-watermark2.p.rapidapi.com/user/posts?unique_id=@' +
                  username +
                  '&count=15',
               {
                  headers: {
                     Accept: '*/*',
                     'User-Agent': 'TikTok 16.6.5 rv:166515 (iPhone; iOS 13.6; en_US) Cronet',
                     Origin: 'https://tik.storyclone.com',
                     Referer: 'https://tik.storyclone.com/',
                     'Referrer-Policy': 'strict-origin-when-cross-origin',
                     'sec-ch-ua': '"Chromium";v="107", "Not=A?Brand";v="24"',
                     'sec-ch-ua-platform': 'Android',
                     'sec-fetch-dest': 'empty',
                     'sec-fetch-mode': 'cors',
                     'sec-fetch-site': 'same-origin',
                     'x-rapiapi-host': 'tiktok-video-no-watermark2.p.rapidapi.com',
                     'x-rapidapi-key': '533115be6amsh2515f73f171c6f1p160d9djsn833294e42f10',
                     'x-requested-with': 'XMLHttpRequest',
                  },
               }
            )
         ).data.data.videos;
         if (json.length < 1)
            return resolve({
               creator: 'Wudysoft',
               status: false,
               msg: `Content not available!`,
            });
         const data = [];
         json.map((v) =>
            data.push({
               caption: v.title,
               author: { ...v.author, username: v.author.unique_id },
               stats: {
                  play_count: v.play_count,
                  digg_count: v.digg_count,
                  share_count: v.share_count,
                  comment_count: v.comment_count,
               },
               music: v.music_info,
               duration: v.duration,
               video: v.play,
            })
         );
         resolve({
            creator: 'Wudysoft',
            status: true,
            data: data[Math.floor(Math.random() * data.length)],
         });
      } catch (e) {
         console.log(e);
         resolve({
            creator: 'Wudysoft',
            status: false,
            msg: e.message,
         });
      }
   });
}

async function searchApk(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const nama = [];
				const developer = [];
				const lupdate = [];
				const size = [];
				const down = [];
				const version = [];
				const link = [];
				const format = [];
				$('#content > div > div > div.appRow > div > div > div > h5 > a').each(function(a, b) {
					const nem = $(b).text();
					nama.push(nem)
				})
				$('#content > div > div > div.appRow > div > div > div > a').each(function(c, d) {
					const dev = $(d).text();
					developer.push(dev)
				})
				$('#content > div > div > div.appRow > div > div > div > div.downloadIconPositioning > a').each(function(e, f) {
					link.push('https://www.apkmirror.com' + $(f).attr('href'))
				})
				$('#content > div > div > div.infoSlide > p > span.infoslide-value').each(function(g, h) {
					data = $(h).text();
					if (data.match('MB')) {
						size.push(data)
					} else if (data.match('UTC')) {
						lupdate.push(data)
					} else if (!isNaN(data) || data.match(',')) {
						down.push(data)
					} else {
						version.push(data)
					}
				})
				for (let i = 0; i < link.length; i++) {
					format.push({
						judul: nama[i],
						dev: developer[i],
						size: size[i],
						version: version[i],
						uploaded_on: lupdate[i],
						download_count: down[i],
						link: link[i]
					})
				}
				const result = {
					creator: 'Hanya Orang Biasa',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}

 async function apkDl(url) {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const $ = cheerio.load(html);

      const link = 'https://www.apkmirror.com' + $('.downloadButton').attr('href')

      if (link.includes('#downloads')) {

        const link2 = $('meta[property="og:url"]').attr('content') + "#downloads"
        const responses2 = await fetch(link2);
        const htmls2 = await responses2.text();
        const $s = cheerio.load(htmls2);
        const result = [];

        $s('.table-row.headerFont').each((index, row) => {
          const rowData = {
            version: $s(row).find('a.accent_color').text().trim(),
            bundle: $s(row).find('.apkm-badge.success').eq(0).text().trim(),
            splits: $s(row).find('.apkm-badge.success').eq(1).text().trim(),
            apkUrl: 'https://www.apkmirror.com' + $s(row).find('a.accent_color').attr('href'),
            downloadDate: $s(row).find('.dateyear_utc').data('utcdate')
          };

          // Memeriksa apakah setidaknya salah satu properti memiliki nilai
          const hasOutput = Object.values(rowData).some(value => value !== undefined && value !== '');
          if (hasOutput) {
            result.push(rowData);
          }
        });
        const response3 = await fetch(result[1].apkUrl);
        const html3 = await response3.text();
        const $t = cheerio.load(html3);

        const link3 = 'https://www.apkmirror.com' + $t('.downloadButton').attr('href')

        const response2 = await fetch(link3);
        const html2 = await response2.text();
        const $$ = cheerio.load(html2);

        const formElement2 = $$('#filedownload');
        const id2 = formElement2.find('input[name="id"]').attr('value');
        const key2 = formElement2.find('input[name="key"]').attr('value');

        const linkdl = `https://www.apkmirror.com/wp-content/themes/APKMirror/download.php?id=${id2}&key=${key2}`;

        return {
          title: $('meta[property="og:title"]').attr('content'),
          gambar: $('meta[property="og:image"]').attr('content'),
          link: link,
          linkdl: linkdl,
          downloadText: $('.downloadButton').text().trim(),
          author: url.split('/')[4].toUpperCase(),
          info: $('.infoSlide').text().trim(),
          description: $('#description .notes').text().trim()
        };
      } else {
        const response2 = await fetch(link);
        const html2 = await response2.text();
        const $$ = cheerio.load(html2);

        const formElement = $$('#filedownload');
        const id = formElement.find('input[name="id"]').attr('value');
        const key = formElement.find('input[name="key"]').attr('value');
        const forcebaseapk = formElement.find('input[name="forcebaseapk"]').attr('value');
        const linkdl = `https://www.apkmirror.com/wp-content/themes/APKMirror/download.php?id=${id}&key=${key}&forcebaseapk=${forcebaseapk}`;

        return {
          title: $('meta[property="og:title"]').attr('content'),
          gambar: $('meta[property="og:image"]').attr('content'),
          link: link,
          linkdl: linkdl,
          downloadText: $('.downloadButton').text().trim(),
          author: url.split('/')[4].toUpperCase(),
          info: $('.appspec-value').text().trim(),
          description: $('#description .notes').text().trim(),
          size: $('.appspec-row:nth-child(2) .appspec-value').text().trim(),
          tanggal: $('.appspec-row:last-child .appspec-value .datetime_utc').attr('data-utcdate')
        }
      }
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  }
  
   async function searchApp2(q) {
  try {
    const url = 'https://m.playmods.net/id/search/' + q; // Ganti dengan URL sumber HTML

    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const dataArray = [];

    $('a.beautify.ajax-a-1').each((index, element) => {
      const $element = $(element);

      const data = {
        link: 'https://m.playmods.net' + $element.attr('href'),
        title: $element.find('.common-exhibition-list-detail-name').text().trim(),
        menu: $element.find('.common-exhibition-list-detail-menu').text().trim(),
        detail: $element.find('.common-exhibition-list-detail-txt').text().trim(),
        image: $element.find('.common-exhibition-list-icon img').attr('data-src'),
        downloadText: $element.find('.common-exhibition-line-download').text().trim(),
      };

      dataArray.push(data);
    });
    return dataArray;
  } catch (error) {
    console.log(error);
  }
}

 async function getApp2(url) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const $ = cheerio.load(html);

    const data = {
      title: $('h1.name').text().trim(),
      image: $('.icon').attr('src'),
      name: $('.app-name span').text().trim(),
      score: $('.score').text().trim(),
      edisi: $('.edition').text().trim(),
      size: $('.size .operate-cstTime').text().trim(),
      create: $('.size span').text().trim(),
      link: $('a.a_download').attr('href'),
      detail: $('.game-describe-gs').text().trim(),
      screenshots: $('.swiper-slide img').map((index, element) => $(element).attr('data-src')).get(),
      describe: $('.datail-describe-pre div').text().trim(),
    };

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function diff(prompt, negativePrompt) {
  return new Promise(async (resolve, reject) => {
    axios("https://api.tensor.art/works/v1/works/task", {
      headers: headers,
      data: {
        "params": {
            "baseModel": {
             "modelId": "606685584192268852",
             "modelFileId": "606685584191220277"
         },
           "sdxl": {
          "refiner": false
      },
    "models": [],
    "sdVae": "vae-ft-mse-840000-ema-pruned.ckpt",
    "prompt": prompt,
    "negativePrompt": negativePrompt,
    "height": 768,
    "width": 512,
    "imageCount": 1,
    "steps": 28,
    "samplerName": "DPM++ SDE Karras",
    "images": [],
    "cfgScale": 5,
    "seed": "-1",
    "clipSkip": 2,
    "etaNoiseSeedDelta": 31337,
    "enableHr": true,
    "hrUpscaler": "4x-UltraSharp",
    "hrSecondPassSteps": 0,
    "denoisingStrength": 0.3,
    "hrResizeX": 512,
    "hrResizeY": 768
  },
  "credits": 1.11,
  "taskType": "TXT2IMG"
  },
      "method": "POST"
    }).then(a => {
      axios("https://api.tensor.art/works/v1/works/mget_task", {
        headers: headers,
        data: {
          ids: [a.data.data.task.taskId]
        },
        "method": "POST"
      }).then(yanz => {
        resolve(yanz.data.data.tasks);
      });
    });
  });
}

async function searchMp3(q) {
    const url = 'https://justnaija.com/search?q=' + q + '&SearchIt='; 
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);
        const articles = [];

        $('article.result').each((index, element) => {
            const title = $(element).find('h3.result-title a').text().trim();
            const url = $(element).find('h3.result-title a').attr('href');
            const thumb = $(element).find('div.result-img img').attr('src');
            const desc = $(element).find('p.result-desc').text().trim();

            const article = {
                title,
                url,
                thumb,
                desc
            };
            articles.push(article);
        });

        return articles;
    } catch (err) {
        console.error(err);
    }
}

async function IP(ip) {
try {
let { data } = await axios.get('https://who.is/whois-ip/ip-address/'+ip)
let $ = cheerio.load(data)
let result = $('div.col-md-12.queryResponseBodyKey').text()
return result
} catch (e) {
return e
}
}

async function npmstalk(packageName) {
  let stalk = await axios.get("https://registry.npmjs.org/"+packageName)
  let versions = stalk.data.versions
  let allver = Object.keys(versions)
  let verLatest = allver[allver.length-1]
  let verPublish = allver[0]
  let packageLatest = versions[verLatest]
  return {
    name: packageName,
    versionLatest: verLatest,
    versionPublish: verPublish,
    versionUpdate: allver.length,
    latestDependencies: Object.keys(packageLatest.dependencies).length,
    publishDependencies: Object.keys(versions[verPublish].dependencies).length,
    publishTime: stalk.data.time.created,
    latestPublishTime: stalk.data.time[verLatest]
  }
}

async function lirik2(judul){
	return new Promise(async(resolve, reject) => {
   		axios.get('https://www.musixmatch.com/search/' + judul)
   		.then(async({ data }) => {
   		const $ = cheerio.load(data)
   		const hasil = {};
   		let limk = 'https://www.musixmatch.com'
   		const link = limk + $('div.media-card-body > div > h2').find('a').attr('href')
	   		await axios.get(link)
	   		.then(({ data }) => {
		   		const $$ = cheerio.load(data)
		   		hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
		  		$$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function(a,b) {
		   hasil.lirik = $$(b).find('span > p > span').text() +'\n' + $$(b).find('span > div > p > span').text()
		   })
	   })
	   resolve(hasil)
   })
   .catch(reject)
   })
}

async function instaDl(url) {
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
     
async function cai(text) {
axios.create("https://beta.character.ai", {
 headers: {
				"User-Agent": this.AGENT,
	        },
        });
return data
}

async function tiktok2(url) {
    const base_url = "https://api.w03.savethevideo.com/tasks";
    const obj = { type: "info", url };

    try {
        const response = await axios.post(base_url, obj, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = response.data;
        const h = data.href;
        const res = "https://api.w03.savethevideo.com/" + h;
        const respon = await axios.get(res);
        const y = respon.data;

        const result = {
            username: y.result.uploader,
            title: y.result.title,
            thumbnail: y.result.thumbnail,
            url: y.result.url,
        };

        console.log(result);

    } catch (error) {
        console.error(error);
        return error.message;
    }
}

async function savetik(url) {
  let result = {}
  const bodyForm = new FormData()
  bodyForm.append("q", url)
  bodyForm.append("lang", "id")
  try {
    const { data } = await axios(`https://savetik.co/api/ajaxSearch`, {
      method: "post",
      data: bodyForm,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "User-Agent": "PostmanRuntime/7.32.2"
      }
    })
    const $ = cheerio.load(data.data)
    result.status = true
    result.caption = $("div.video-data > div > .tik-left > div > .content > div > h3").text()
    ;(result.server1 = {
      quality: "MEDIUM",
      url: $("div.video-data > div > .tik-right > div > p:nth-child(1) > a").attr("href")
    }),
      (result.serverHD = {
        quality: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").text().split("MP4 ")[1],
        url: $("div.video-data > div > .tik-right > div > p:nth-child(3) > a").attr("href")
      }),
      (result.audio = $("div.video-data > div > .tik-right > div > p:nth-child(4) > a").attr("href"))
    return result
  } catch (err) {
    result.status = false
    result.message = "Gatau kenapa"
    console.log(result)
    return result
  }
}

async function tiktokall(url) {
    const base = await axios.get('https://ttsave.app/download-tiktok-slide')
    const key = base.data.split('https://ttsave.app/download?mode=slide&key=')[1].split(`',`)[0]
    try {
        const { data, status } = await axios.post(`https://ttsave.app/download?mode=slide&key=${key}`, {
            id: url
        })
        const $ = cheerio.load(data)
        const result = {
            status,
            name: $('div > div > h2').text().trim(),
            playCount: $('div').find('div.flex.flex-row.items-center.justify-center.gap-2.mt-2 > div:nth-child(1) > span').text(),
            likeCount: $('div').find('div.flex.flex-row.items-center.justify-center.gap-2.mt-2 > div:nth-child(2) > span').text(),
            commentCount: $('div').find('div.flex.flex-row.items-center.justify-center.gap-2.mt-2 > div:nth-child(3) > span').text(),
            shareCount: $('div').find('div.flex.flex-row.items-center.justify-center.gap-2.mt-2 > div:nth-child(4) > span').text(),
            isSlide: $('div').text().includes('WITH WATERMARK') ? false : true
        }
        if (result.isSlide) {
            result.download = {
                music: `https://sf16-ies-music.tiktokcdn.com/obj/ies-music-aiso/${$('div').find('#unique-id').attr('value').split('-')[1]}.mp3`,
                image: []
            }
            $('#button-download-ready > a').each(function () {
                result.download.image.push($(this).attr('href'))
            })
        } else {
            result.download = {
                wm: $('#button-download-ready > a:nth-child(2)').attr('href'),
                nowm: $('#button-download-ready > a:nth-child(1)').attr('href'),
                music: $('#button-download-ready > a:nth-child(3)').attr('href')
            }
        }
        return (result)
    } catch (e) {
        console.log(e)
        if (e.response.status == 404) return ({ status: e.response.status, message: 'Video not found!' })
    }
}

let baseUrlsnap = 'https://snapsave.app'
async function snapsave(url) {
	const { data } = await axios.post(baseUrlsnap+'/action.php', 
	'url=' + encodeURIComponent(url), {
		header: {
			referer: baseUrlsnap
		}
	});
	const encodeDom = data.split(/<script type=".+?">(.*?)<\/script>/)[1]
    const doms = encodeDom.split('}(')[1].replace(/"/g, '').split(')')[0].split(',')
    const decoded = decode(...doms).split('</style>')[1].split('";')[0]
    let dom = new JSDOM(decoded).window.document
    let list = [...dom.querySelectorAll('table > tbody > tr')].filter(x => x.querySelector('td > a'))
    return {
        url: list[0].querySelector('td > a').href.replace(/\\|"/g, ''),
    }
}

async function blekbox(q) {
let mann = await require("axios").get("https://api.manaxu.my.id/api/ai/blackbox?message=" + q)
return mann.data.data.response
}

async function y2mate(url) {
    const axios = require('axios');

    const requestDataInfo = new URLSearchParams({
        k_query: url,
        k_page: 'home',
        hl: 'en',
        q_auto: 1,
    });

    const headersInfo = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'X-Requested-With': 'XMLHttpRequest',
        'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Mobile Safari/537.36'
    };

    const { data: infoData } = await axios.post('https://www.y2mate.com/mates/analyzeV2/ajax', requestDataInfo.toString(), { headers: headersInfo });

    const requestDataMp4 = new URLSearchParams({
        vid: infoData.vid,
        k: infoData.links.mp4.auto.k,
    });

    const requestDataMp3 = new URLSearchParams({
        vid: infoData.vid,
        k: infoData.links.mp3.mp3128.k,
    });

    const headersConverter = {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/37.0.2062.94 Chrome/37.0.2062.94 Safari/537.36'
    };

    const { data: mp4Data } = await axios.post("https://www.y2mate.com/mates/convertV2/index", requestDataMp4.toString(), { headers: headersConverter });
    const { data: mp3Data } = await axios.post("https://www.y2mate.com/mates/convertV2/index", requestDataMp3.toString(), { headers: headersConverter });

    return {
        title: infoData.title,
        mp4: mp4Data.dlink,
        mp3: mp3Data.dlink
    };
}

async function BingChat(sistem,prompt) {
  let response = await (await fetch("https://copilot.github1s.tk/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "dummy",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "model": "balanced",
      "max_tokens": 100,
      "messages": [
        {
          "role": "system",
          "content": sistem
        },
        {
          "role": "user",
          "content": prompt
        }
      ]
    })
  })).json();
  return response.choices[0].delta.content
}

async function ttPorn() {
  return new Promise((resolve, reject) => {
    axios.get("https://tiktod.eu.org" + "/porn")
      .then((porner) => resolve(porner.data))
      .catch(reject);
  });
}

async function scdl(url) {
	return new Promise(async (resolve, reject) => {
		await axios.request({
			url: "https://www.klickaud.co/download.php",
			method: "POST",
			data: new URLSearchParams(Object.entries({'value': url, 'afae4540b697beca72538dccafd46ea2ce84bec29b359a83751f62fc662d908a' : '2106439ef3318091a603bfb1623e0774a6db38ca6579dae63bcbb57253d2199e'})),
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"user-agent": "Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36"
			}
		}).then(res => {
			const $ = cheerio.load(res.data)
			const result = {
				link: $('#dlMP3').attr('onclick').split(`downloadFile('`)[1].split(`',`)[0],
				thumb: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(1) > img').attr('src'),
				title: $('#header > div > div > div.col-lg-8 > div > table > tbody > tr > td:nth-child(2)').text()

			}
			resolve(result)
		}).catch(reject)
})
}

async function ttSearch2(query) {
	return new Promise((resolve, reject) => {
		axios.get('https://brainans.com/search?query='+query).then(res => {
			const $ = cheerio.load(res.data)
			const result = []
			const main = $('#search-container > div')
			main.each( function() {
				const user_url = 'https://brainans.com'+$(this).find('div.content__text > a').attr('href')
				const user = $(this).find('div.content__text > a').text()
				const username = $(this).find('div.content__text > p').text()
				result.push({ user, username, user_url })
				const hasil = {
					result: result
				}
				resolve(hasil)
			})
		}).catch(reject)
	})
}

async function capcutSearch(s) {
  try {
    const response = await got("https://capcut-templates.com/?s=" + s);
    const html = response.body;
    const $ = cheerio.load(html);
    const elements = $("main#main div.ct-container section div.entries article");

    const detailPromises = elements.map(async (index, element) => {
      const link = $(element).find("a.ct-image-container").attr("href");
      const detail = await detailTemplates(link);
      const imageSrc = $(element).find("img").attr("src");
      const title = $(element).find("h2.entry-title a").text().trim();

      return {
        id: $(element).attr("id"),
        link,
        detail,
        imageSrc,
        title
      };
    }).get();

    return Promise.all(detailPromises);
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function capcutDetail(link) {
  try {
    const response = await got(link);
    const html = response.body;
    const $ = cheerio.load(html);
    const elements = $("main#main div.ct-container-full article");

    return elements.map((index, element) => ({
      id: $(element).attr("id"),
      time: $("main#main").find("time.ct-meta-element-date").text().trim(),
      template: $(element).find(".wp-block-buttons .wp-block-button a").attr("data-template-id"),
      link: $(element).find("a.wp-block-button__link").attr("href"),
      imageSrc: $(element).find("video").attr("poster"),
      title: $(element).find("h2").text().trim(),
      videoSrc: $(element).find("video source").attr("src"),
      description: $(element).find(".entry-content p").text().trim()
    })).get();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function cai2(query, character) {
  try {
    const response = await axios.post('https://boredhumans.com/api_celeb_chat.php', `message=${query}&intro=${character}&name=${character}`, {
      headers: {
        'User-Agent': 'Googlebot-News',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function aigpt(prompt) {
  try {
   const response = await axios.get("https://tools.revesery.com/ai/ai.php?query=" + prompt, {
     headers: {
      'Accept': '*/*',
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.999 Safari/537.36'
      }
    });
    const res = response.data
    const result = res.result
    return result
  } catch (error) {
  console.error(error)
  }
}

async function searchVideo(query) {
  const url = `https://www.pornhub.com/video/search?search=${query}`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const videoList = [];

  $('li[data-video-segment]').each((index, element) => {
    const $element = $(element);
    
    const link = $element.find('.title a').attr('href').trim();
    const title = $element.find('.title a').text().trim();
    const uploader = $element.find('.videoUploaderBlock a').text().trim();
    const views = $element.find('.views').text().trim();
    const duration = $element.find('.duration').text().trim();
    
    const videoData = {
      link: "https://www.pornhub.com" + link,
      title: title,
      uploader: uploader,
      views: views,
      duration: duration
    };
    
    videoList.push(videoData);
  });
  
  return videoList;
}

async function searchGif(query) {
  const url = `http://www.pornhub.com/gifs/search?search=${query}`;
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const gifs = $('ul.gifs.gifLink li');

    return gifs.map((i, gif) => {
      const data = $(gif).find('a');

      return {
        title: data.find('span').text(),
        url: 'http://dl.phncdn.com#id#.gif'.replace('#id#', data.attr('href')),
        webm: data.find('video').attr('data-webm'),
      };
    }).get();
}

async function terabox(urls) {
    return new Promise(async (resolve, reject) => {
      const req = await axios.get(urls, {
      	headers: {
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6",
  Connection: "keep-alive",
  Cookie: "csrfToken=x0h2WkCSJZZ_ncegDtpABKzt; browserid=Bx3OwxDFKx7eOi8np2AQo2HhlYs5Ww9S8GDf6Bg0q8MTw7cl_3hv7LEcgzk=; lang=en; TSID=pdZVCjBvomsN0LnvT407VJiaJZlfHlVy; __bid_n=187fc5b9ec480cfe574207; ndus=Y-ZNVKxteHuixZLS-xPAQRmqh5zukWbTHVjen34w; __stripe_mid=895ddb1a-fe7d-43fa-a124-406268fe0d0c36e2ae; ndut_fmt=FF870BBFA15F9038B3A39F5DDDF1188864768A8E63DC6AEC54785FCD371BB182",
  DNT: "1",
  Host: "www.4funbox.com",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
  "sec-ch-ua": '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
}, 
      	withCredentials: true 
      });
      const responseData = req.data;

      const jsToken = findBetween(responseData, "fn%28%22", "%22%29");
      const logid = findBetween(responseData, "dp-logid=", "&");
      if (!jsToken || !logid) {
        return resolve({ error: "Invalid jsToken, logid" });
      }

      const { searchParams: requestUrl, href } = new URL(urls);
      if (!requestUrl.has("surl")) {
        return resolve({ error: "Missing data" });
      }
      const surl = requestUrl.get("surl");

      const params = {
        app_id: "250528",
        web: "1",
        channel: "dubox",
        clienttype: "0",
        jsToken: jsToken,
        dplogid: logid,
        page: "1",
        num: "20",
        order: "time",
        desc: "1",
        site_referer: href,
        shorturl: surl,
        root: "1",
      };

      const response = await axios.get("https://www.4funbox.com/share/list", {
        params,
        headers: {
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "Accept-Language": "en-IN,en-GB;q=0.9,en-US;q=0.8,en;q=0.7,hi;q=0.6",
  Connection: "keep-alive",
  Cookie: "csrfToken=x0h2WkCSJZZ_ncegDtpABKzt; browserid=Bx3OwxDFKx7eOi8np2AQo2HhlYs5Ww9S8GDf6Bg0q8MTw7cl_3hv7LEcgzk=; lang=en; TSID=pdZVCjBvomsN0LnvT407VJiaJZlfHlVy; __bid_n=187fc5b9ec480cfe574207; ndus=Y-ZNVKxteHuixZLS-xPAQRmqh5zukWbTHVjen34w; __stripe_mid=895ddb1a-fe7d-43fa-a124-406268fe0d0c36e2ae; ndut_fmt=FF870BBFA15F9038B3A39F5DDDF1188864768A8E63DC6AEC54785FCD371BB182",
  DNT: "1",
  Host: "www.4funbox.com",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
  "sec-ch-ua": '"Google Chrome";v="113", "Chromium";v="113", "Not-A.Brand";v="24"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"Windows"',
},
        withCredentials: true,
      });
      const responseData2 = response.data;
      if ((!"list") in responseData2) {
        resolve({ error: "Invalid response" });
      }
      resolve(responseData2?.list[0]);
    });
  }

async function luminai(q) {
    try {
        const response = await axios.post("https://luminai.siputzx.my.id/", {
            content: q
        });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching:', error);
        throw error;
    }
}


module.exports = {
  duration,
  bingimage,
  findSongs,
  bingsearch,
  blacbox,
  getVideoFPS,
  openAi,
  chatgpt,
  aiimg,
  stabilityai,
  upscale,
  nexLibur,
  capcut,
  LK21Scraperlatest,
  ghstalk,
  instagram,
  fbdl,
  facebook2,
  twitter,
  inews,
  asupantt,
  stickersearch,
  pinterest,
  character,
  anime,
  nhentainew,
  nhentaisearch,
  nhentaiget,
  manga,
  designer,
  animeFilter,
  RemoveBackground,
  otakudesu,
  otakudesuinfo,
  kiryu,
  trustpositif,
  facebook,
  joox,
  tiktokdl,
  gempa,
  cariresep,
  happymod,
  jadwalsholat,
  cocofun,
  text2img,
  umma,
  filesearch,
  sfiledown,
  carigc,
  spotify2,
  wasearch,
  wapopular,
  ttsearch,
  wikisearch,
  konachan,
  wallpaper,
  wattpad,
  devianart,
  cloudsearch,
  cloudownload,
  removebg,
  tozombie,
  spotify,
  hentaivid,
  lirik,
  chara,
  gore,
  xnxxsearch,
  xnxxdl,
  quotes,
  cerpen,
  remini,
  kodepos,
  ephoto,
  bokepsinsearch,
  bokepsindetail,
  mediafire,
  Spotifysearch,
  jamesearch,
  drakor,
  drakordetail,
  toanime,
  ssweb,
  ssphone,
  amv1,
  amv2,
  rexdldownload,
  emojimix,
  jarakkota,
  steam,
  kusonimeget,
  searchApkmirror,
  getApkmirror,
  searchApp,
  getApp,
  attp,
  ttp,
  Draw,
  XPanas,
  WikiMedia,
  SoundCloudeS,
  RingTone,
  PlayStore,
  BukaLapak,
  TixID,
  AcaraNow,
  Jadwal_Sepakbola,
  JadwalTV,
  Steam2,
  Steam_Detail,
  WattPad,
  LinkWa,
  Lirik2,
  KBBI,
  Nomina,
  KodePos,
  ListHero,
  Hero,
  bibbleDays,
  distance,
  sfileDown2,
  sfileSearch,
  apkmirror,
  randomGoore,
  getGoore,
  InstagramStory,
  fetchDoods,
  aio,
  GoogleBard,
  chatgpt3,
  imgHd,
  recipes,
  GPT,
  imageAnime,
  playaudio,
  playvideo,
  getUserTiktok,
  searchApk,
  apkDl,
  searchApp2,
  getApp2,
  diff,
  searchMp3,
  IP,
  npmstalk,
  lirik2,
  instaDl,
  cai,
  tiktok2,
  savetik,
  tiktokall,
  snapsave,
  blekbox,
  y2mate,
  BingChat,
  ttPorn,
  ttSearch2,
  scdl,
  capcutDetail,
  capcutSearch,
  cai2,
  aigpt,
  searchVideo,
  searchGif,
  terabox,
  luminai
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.redBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})