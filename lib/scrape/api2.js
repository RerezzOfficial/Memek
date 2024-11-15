const cheerio = require('cheerio')
const fetch = require('node-fetch')
const axios = require('axios')
const _math = require('mathjs')
const _url = require('url')
const chalk = require('chalk')
const request = require('request');
const acrcloud = require("acrcloud")
const acr = new acrcloud({ host: "identify-ap-southeast-1.acrcloud.com", access_key: "b1cc283b4fb72483ebb6ea9c53512331", access_secret: "xyqJGTZRTrUotaraHEjji00WBClx7RpWozywdANq"})
const bing = require('bing-scraper')
const child = require('child_process')
const FormData = require('form-data')
const fs = require('fs')
randomobj = async (aray) => {
    return aray[Math.floor(Math.random() * (aray.length))]
  }
decodeBinary = async (char) => {
     return char.split(" ").map(str => String.fromCharCode(Number.parseInt(str, 2))).join("");
  }
  encodeBinary = async (char) => {
     return char.split("").map(str => {
          const converted = str.charCodeAt(0).toString(2);
          return converted.padStart(8, "0");
     }).join(" ")
  }
exports.whatmusic = (buffer) => {
    return new Promise((resolve, reject) => {
    	acr.identify(buffer).then(metadata => {
            const result = {
                status: 200,
                author: author,
                ...metadata.metadata
            }
    		resolve(result)
        }).catch(reject)
    })
}
exports.asupanfilm = async (query) => {
	return new Promise((resolve) => {
		axios.get(`https://asupanfilm.link/?search=${query}`)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const judul = [];
				const desc = [];
				const thumb = [];
				const link = [];
				const result = [];
				$('body > div > div > div.card-body.p-2 > ul > li > div > div > h6 > a').each(function(a, b) {
					deta = $(b).text();
					judul.push(deta)
				})
				$('body > div > div > div.card-body.p-2 > ul > li > div > div').each(function(a, b) {
					deta = $(b).text()
					desc.push(deta.split('   ')[2])
				})
				$('body > div > div > div.card-body.p-2 > ul > li > div > img').each(function(a, b) {
					thumb.push($(b).attr('src').split('UX67_CR0,0,67,98_AL_')[0])
				})
				$('body > div > div > div.card-body.p-2 > ul > li > div > div > h6 > a').each(function(a, b) {
					link.push('https://asupanfilm.link/' + $(b).attr('href'))
				})
				for (let i = 0; i < judul.length; i++) {
					result.push({
						judul: judul[i],
						deskripsi: desc[i],
						thumb: thumb[i],
						link: link[i]
					})
				}
				resolve(result)
			})
	})
}
exports.film = (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`http://167.99.31.48/?s=${query}`)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const hasil = [];
				$('#content > div > div.los').each(function (a, b) {
                    $(b).find('article').each(function (c, d) {
                        const judul = $(d).find('div > a > div.addinfox > header > h2').text()
                        const quality = $(d).find('div > a > div > div > span').text()
                        const type = $(d).find('div > a > div.addinfox > div > i.type').text()
                        const upload = $(d).find('div > a > div.addinfox > div > span').text()
                        const link = $(d).find('div > a').attr('href');
                        const thumb = $(d).find('div > a > div > img').attr('src');
                        const result = {
                            status: 200,
                        	author: author,
                            judul: judul,
                            quality: quality,
                            type: type,
                            upload: upload,
                            link: link,
                            thumb: thumb,
                        };
                        hasil.push(result);
                    });
                });
				resolve(hasil)
			})
			.catch(reject)
	})
}
exports.inews = () => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.inews.id/news`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('#news-list > li ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
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
exports.kompasnews = () => {
    return new Promise((resolve, reject) => {
        axios.get(`https://news.kompas.com/`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('body > div > div.container.clearfix > div:nth-child(3) > div.col-bs10-7 > div:nth-child(3) > div.latest.ga--latest.mt2.clearfix > div > div ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    berita: $(b).find('> div > div.article__box > h3').text(),
                    upload_time: $(b).find('> div > div.article__box > div.article__date').text(),
                    type_berita: $(b).find('> div > div.article__boxsubtitle > h2').text(),
                    link: $(b).find('> div > div.article__box > h3 > a').attr('href'),
                    thumbnail: $(b).find('> div > div.article__asset > a > img').attr('data-src'),
                    info_berita: $(b).find('> div > div.article__box > div.article__lead').text()
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
exports.jadwalbola = () => {
    return new Promise((resolve, reject) => {
        axios.get('https://m.bola.net/jadwal_televisi/')
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                $('body > div.main > div > div:nth-child(3) > div > ul > li').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    jadwal: $(b).find('> div > div > p > a').text().split('Jadwal TV: ')[1],
                    tanggal: $(b).find('> div > div > span').text().split('jadwal televisi ')[1],
                    url: $(b).find('> div > div > p > a').attr('href'),
                    thumb: 'https://cdns.klimg.com/bola.net/library/upload/21/2019/01/100s/bola_e9af938.jpg'
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
exports.asupanfilminfo = async (link) => {
	return new Promise((resolve) => {
		axios.get(link)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const info = {
					judul: $('body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(1)').text(),
					thumb: $('body > div > div.card.mb-3 > div.card-footer > a').attr('href'),
					alurcerita_imdb: $('body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(2)').text().split(' Alur Cerita IMDb: ')[1],
					alurcerita_tmdb: $('body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(3)').text().split(' Alur Cerita TMDb: ')[1],
					direksi: $('body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(4)').text().split(' Direksi: ')[1],
					pemeran: $('body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(5)').text().split(' Pemeran: ')[1],
					kategori: $('body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(6)').text().split(' Kategori: ')[1],
					negara: $('body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(7)').text().split(' Negara: ')[1],
					tahun_rilis: $('body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(8)').text().split(' Tahun Rilis: ')[1],
					durasi: $('body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(9)').text().split(' Durasi: ')[1],
					skor: $('body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(10)').text().split(' Skor: ')[1],
					kualitas: $('body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(11)').text().split(' Kualitas: ')[1],
					jenis: $('body > div > div:nth-child(5) > div.card-body.p-2 > ul > li:nth-child(12)').text().split(' Jenis: ')[1]
				}
				resolve(info)
			})
	})
}
exports.webtoons = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.webtoons.com/id/search?keyword=${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('#content > div.card_wrap.search._searchResult > ul > li ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: author,
                    judul: $(b).find('> a > div > p.subj').text(),
                    like: $(b).find('> a > div > p.grade_area > em').text(),
                    creator: $(b).find('> a > div > p.author').text(),
                    genre: $(b).find('> a > span').text(),
                    thumbnail: $(b).find('> a > img').attr('src'),
                    url: 'https://www.webtoons.com' + $(b).find('> a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
exports.stickersearch = (query) => {
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
                            link.push($$(d).attr('src').replace(/&d=200x200/g,''))
                        })
                        result = {
                            status: 200,
                            author: author,
                            title: $$('#intro > div > div > h1').text(),
                            sticker_url: link
                        }
                        resolve(result)
                    })
            }).catch(reject)
    })
}
exports.pinterest = async (querry) => {
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
exports.zerochan = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://www.zerochan.net/search?q=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const judul = [];
				const result = [];
				const id = [];
				$('#thumbs2 > li > a > img').each(function(a, b) {
					if (!$(b).attr('alt').startsWith('https://static.zerochan.net/')) {
						judul.push($(b).attr('alt'))
					}
				})
				$('#thumbs2 > li > a').each(function(a, b) {
					id.push($(b).attr('href'))
				})
				for (let i = 0; i < judul.length; i++) {
					result.push('https://s1.zerochan.net/' + judul[i].replace(/\ /g, '.') + '.600.' + id[i].split('/')[1] + '.jpg')
				}
				resolve({
					creator: 'Fajar Ihsana',
					result: result
				})
			})
			.catch(reject)
	})
}
exports.happymoddl = (link) => {
	return new Promise((resolve, reject) => {
		axios.get(link)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const link = [];
				const jlink = [];
				const result = [];
				const title = $('body > div > div.container-left > section:nth-child(1) > div > h1').text()
				const info = $('body > div > div.container-left > section:nth-child(1) > div > ul').text()
				$('body > div.container-row.clearfix.container-wrap.pdt-font-container > div.container-left > section:nth-child(1) > div > div:nth-child(3) > div > p > a').each(function(a, b) {
					deta = $(b).text();
					jlink.push(deta)
					if ($(b).attr('href').startsWith('/')) {
						link.push('https://happymod.com' + $(b).attr('href'))
					} else {
						link.push($(b).attr('href'))
					}
				})
				for (let i = 0; i < link.length; i++) {
					result.push({
						title: jlink[i],
						dl_link: link[i]
					})
				}
				console.log(link)
				resolve({
					creator: 'Fajar Ihsana',
					title: title,
					info: info.replace(/\t|- /g, ''),
					download: link
				})
			})
			.catch(reject)
	})
}
exports.character = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.anime-planet.com/characters/all?name=${query}`)
            .then(({
                data
            }) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#siteContainer > table > tbody > tr').each(function (a, b) {
                        result = {
                            status: 200,
                            author: author,
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
exports.anime = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.anime-planet.com/anime/all?name=${query}`)
            .then(({
                data
            }) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#siteContainer > ul.cardDeck.cardGrid > li ').each(function (a, b) {
                        result = {
                            status: 200,
                            author: author,
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
exports.manga = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.anime-planet.com/manga/all?name=${query}`)
            .then(({
                data
            }) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#siteContainer > ul.cardDeck.cardGrid > li ').each(function (a, b) {
                        result = {
                            status: 200,
                            author: author,
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
exports.otakudesu = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://otakudesu.watch/?s=${query}&post_type=anime`).then(({data}) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#venkonten > div > div.venser > div > div > ul > li').each(function (a, b) {
                        result = {
                            status: 200,
                            author: author,
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
exports.otakudesuinfo = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(url).then(({data}) => {
                const $ = cheerio.load(data)
                        result = {
                            status: 200,
                            author: author,
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

exports.job = async (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://www.jobstreet.co.id/id/job-search/${query}-jobs/`)
			.then((data) => {
				//console.log(data.data)
				const $ = cheerio.load(data.data)
				const job = [];
				const perusahaan = [];
				const daerah = [];
				const format = [];
				const link = [];
				const upload = [];
				$('#jobList > div > div:nth-child(3) > div > div > div > div > article > div > div > div > div > div > h1 > a > div').each(function(a, b) {
					deta = $(b).text();
					job.push(deta)
				})
				$('#jobList > div > div:nth-child(3) > div > div > div > div > article > div > div > div > div > div > span').each(function(a, b) {
					deta = $(b).text();
					perusahaan.push(deta)
				})
				$('#jobList > div > div:nth-child(3) > div > div > div > div > article > div > div > div > div > span > span').each(function(a, b) {
					deta = $(b).text();
					daerah.push(deta)
				})
				$('#jobList > div > div:nth-child(3) > div > div > div > div > article > div > div > div > div > div > h1 > a').each(function(a, b) {
					link.push($(b).attr('href'))
				})
				$('#jobList > div > div:nth-child(3) > div > div > div > div > article > div > div > div.sx2jih0.zcydq852.zcydq842.zcydq872.zcydq862.zcydq82a.zcydq832.zcydq8d2.zcydq8cq > div.sx2jih0.zcydq832.zcydq8cq.zcydq8c6.zcydq882 > time > span').each(function(a, b) {
					deta = $(b).text();
					upload.push(deta)
				})
				for (let i = 0; i < job.length; i++) {
					format.push({
						job: job[i],
						perusahaan: perusahaan[i],
						daerah: daerah[i],
						upload: upload[i],
						link_Detail: 'https://www.jobstreet.co.id' + link[i]
					})
				}
				resolve(format)
			})
			.catch(reject)
	})
}
exports.anoboys = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://anoboy.media/?s=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const format = [];
				const link = [];
				const judul = [];
				const thumb = [];
				const uptime = [];
				$('body > div.wrap > div.container > div.column-content > a > div > div.amvj > h3').each(function(a, b) {
					jud = $(b).text();
					judul.push(jud)
				})
				$('body > div.wrap > div.container > div.column-content > a > div > div.jamup').each(function(c, d) {
					upt = $(d).text();
					uptime.push(upt)
				})
				$('body > div.wrap > div.container > div.column-content > a > div > amp-img').each(function(e, f) {
					thumb.push($(f).attr('src'))
				})
				$('body > div.wrap > div.container > div.column-content > a').each(function(g, h) {
					link.push($(h).attr('href'))
				})
				for (let i = 0; i < link.length; i++) {
					format.push({
						judul: judul[i],
						thumb: thumb[i],
						link: link[i]
					})
				}
				const result = {
					status: data.status,
					creator: 'Fajar Ihsana',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}
exports.anoboydl = (query) => {
	return new Promise((resolve, reject) => {
		axios.get(query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				resolve({
					judul: $('body > div.wrap > div.container > div.pagetitle > h1').text(),
					uptime: $('body > div.wrap > div.container > div.pagetitle > div > div > span > time').text(),
					direct_link: $('#tontonin > source').attr('src'),
					mforu: {
						SD: $('#colomb > p > span:nth-child(1) > a:nth-child(3)').attr('href'),
						HD: $('#colomb > p > span:nth-child(1) > a:nth-child(5)').attr('href')
					},
					zippy: {
						SD: $('#colomb > p > span:nth-child(3) > a:nth-child(3)').attr('href'),
						HD: $('#colomb > p > span:nth-child(3) > a:nth-child(5)').attr('href')
					},
					mirror: {
						SD: $('#colomb > p > span:nth-child(5) > a:nth-child(3)').attr('href'),
						HD: $('#colomb > p > span:nth-child(5) > a:nth-child(5)').attr('href')
					}
				})
			})
			.catch(reject)
	})
}
exports.instagram = async (url) => {
    try {
        const tokenn = await axios.get("https://downvideo.quora-wiki.com/instagram-video-downloader#url=" + url);
        let a = cheerio.load(tokenn.data);
        let token = a("#token").attr("value");
        const param = {
            url: url,
            token: token,
        };
        const { data } = await axios.request("https://downvideo.quora-wiki.com/system/action.php", {
                method: "post",
                data: new URLSearchParams(Object.entries(param)),
                headers: {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "referer": "https://downvideo.quora-wiki.com/tiktok-video-downloader",
                },
            }
        );
        return {
            status: 200,
            author: author,
            title: data.title,
            thumbnail: "https:" + data.thumbnail,
            duration: data.duration,
            media: data.medias,
        };
    } catch (e) {
        return e
    }
}
exports.imdb = async (url) => {
    return new Promise((resolve, reject) => {
        axios.get('https://freedownloadvideo.net/imdb-video-downloader').then((data) => {
            let a = cheerio.load(data.data)
            let token = a('#token').attr('value')
            const options = {
                method: 'POST',
                url: `https://freedownloadvideo.net/wp-json/aio-dl/video-data/`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded;",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "cookie": "PHPSESSID=jue6d59cnfgu8pmraa971cetm6; _gid=GA1.2.1096581014.1656129824; __gads=ID=855f6257a3b17608-227b1200fed200a7:T=1656129824:RT=1656129824:S=ALNI_MYlQs2q77JAmj399O3YnmMSElqAIA; __gpi=UID=0000068f8a6124cf:T=1656129824:RT=1656129824:S=ALNI_MZhz1dM3pQuLjvXkFxtGqNtiIo4yw; _ga_KN64Y44T94=GS1.1.1656129823.1.1.1656130205.0; _ga=GA1.2.1859454192.1656129824"
                },
                formData: {url: url,token: token}
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                res = JSON.parse(body)
                result = {
                    status: 200,
                    author: author,
                    ...res,
                }
                resolve(result);
            })
        }).catch(reject)
    })
}
exports.kiryu = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://kiryuu.id/?s=${query}`)
            .then(({
                data
            }) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#content > div.wrapper > div.postbody > div > div.listupd > div ').each(function (a, b) {
                        result = {
                            status: 200,
                            author: author,
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
exports.otakudesuongoing = () => {
    return new Promise((resolve, reject) => {
        axios.get(`https://otakudesu.watch`).then(({data}) => {
                const hasil = []
                const $ = cheerio.load(data)
                $('#venkonten > div > div.venser > div.venutama > div > div.rapi > div > ul > li').each(function (a, b) {
                        result = {
                            status: 200,
                            author: author,
                            judul: $(b).find('> div > div.thumb > a > div > h2').text().trim(),
                            episode: $(b).find('> div > div.epz').text().trim(),
                            tanggal: $(b).find('> div > div.newnime').text().trim(),
                            hari: $(b).find('> div > div.epztipe').text().trim(),
                            thumbnail: $(b).find('> div > div.thumb > a > div > img').attr('src'),
                            link: $(b).find('> div > div.thumb > a').attr('href')
                        };
                        hasil.push(result);
                    });
                resolve(hasil)
            }).catch(reject)
    })
}
exports.webtoons = async (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://m.webtoons.com/id/search?keyword=${query}`)
			.then((data) => {
				const $ = cheerio.load(data.data)
				const judul = [];
				const genre = [];
				const author = [];
				const link = [];
				const likes = [];
				const format = [];
				$('#content > div > ul > li > a > div > p.subj').each(function(a, b) {
					deta = $(b).text();
					judul.push(deta)
				})
				$('div > ul > li > a > span').each(function(a, b) {
					deta = $(b).text();
					genre.push(deta)
				})
				$('div > ul > li > a > div > p.author').each(function(a, b) {
					deta = $(b).text();
					author.push(deta)
				})
				$('div > ul > li > a > div > p.grade_area > em').each(function(a, b) {
					deta = $(b).text();
					likes.push(deta)
				})
				$('#content > div > ul > li > a').each(function(a, b) {
					link.push($(b).attr('href'))
				})
				for (let i = 0; i < judul.length; i++) {
					format.push({
						judul: judul[i],
						genre: genre[i],
						author: author[i],
						likes: likes[i],
						link: 'https://m.webtoons.com' + link[i]
					})
				}
				if (likes == '') {
					resolve({
						status: `${query} tidak dapat ditemukan/error`
					})
				} else {
					resolve(format)
				}
			})
			.catch(reject)
	})
}
exports.soundcloud = async (url) => {
    return new Promise((resolve, reject) => {
        axios.get('https://soundcloudmp3.org/id').then((data) => {
            let a = cheerio.load(data.data)
            let token = a('form#conversionForm > input[type=hidden]').attr('value')
            const options = {
                method: 'POST',
                url: `https://soundcloudmp3.org/converter`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded;",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "Cookie": data["headers"]["set-cookie"],
                },
                formData: {
                    _token: token,
                    url: url
                }
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                $get = cheerio.load(body)
                const result = {
                    status: 200,
                    author: author,
                    title: $get('#preview > div:nth-child(3) > p:nth-child(2)').text().replace('Title:',''),
                    duration: $get('#preview > div:nth-child(3) > p:nth-child(3)').text().replace(/Length\:|Minutes/g,''),
                    quality: $get('#preview > div:nth-child(3) > p:nth-child(4)').text().replace('Quality:',''),
                    thumbnail: $get('#preview > div:nth-child(3) > img').attr('src'),
                    download: $get('#download-btn').attr('href')
                }
                resolve(result)
            });
        })
    })
}
exports.facebook = async(url) => {
    return new Promise(async(resolve, reject) => {
        await axios.get('https://downvideo.net/').then(gdata => {
        const a = cheerio.load(gdata.data)
        const token = a('body > div > center > div.col-md-10 > form > div > input[type=hidden]:nth-child(2)').attr('value')
        const options = {
            method: "POST",
            url: `https://downvideo.net/download.php`,
            headers: {
                "content-type": 'application/x-www-form-urlencoded',
                "cookie": gdata["headers"]["set-cookie"],
                "user-agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
            },
            formData: {
                URL: url,
                token: token,
            },
        };
        request(options, async function(error, response, body) {
            if (error) throw new Error(error)
            const $ = cheerio.load(body)
            const result = {
                status: 200,
                author: author,
                title: $('body').find('div:nth-child(1) > h4').text(),
                sd: $('#sd > a').attr('href'),
                hd: $('body').find('div:nth-child(7) > a').attr('href')
            }
            resolve(result)
        })
    })
})
}
exports.igstalk = async (username) => {
	return new Promise(async (resolve, reject) => {
		let {
			data
		} = await axios('https://www.instagram.com/' + username + '/?__a=1', {
			'method': 'GET',
			'headers': {
				'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
				'cookie': 'isi sendiri cokie igeh'
			}
		})
		let user = data.graphql.user
		let json = {
			creator: '"hardianto02_',
			status: 'ok',
			code: 200,
			username: user.username,
			fullname: user.full_name,
			verified: user.is_verified,
			video_count_reel: user.highlight_reel_count,
			followers: user.edge_followed_by.count,
			follow: user.edge_follow.count,
			is_bussines: user.is_business_account,
			is_professional: user.is_professional_account,
			category: user.category_name,
			thumbnail: user.profile_pic_url_hd,
			bio: user.biography,
			info_account: data.seo_category_infos
		}
		resolve(json)
	})
}
exports.gempa = async () => {
	return new Promise(async (resolve, reject) => {
		axios.get('https://www.bmkg.go.id/gempabumi/gempabumi-dirasakan.bmkg')
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const drasa = [];
				$('table > tbody > tr:nth-child(1) > td:nth-child(6) > span').get().map((rest) => {
					dir = $(rest).text();
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
exports.cocofun = (url) => {
  return new Promise((resolve, reject) => {
    axios({url, method: "get",
      headers: {
        "Cookie": "client_id=1a5afdcd-5574-4cfd-b43b-b30ad14c230e",
        "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
      }
    }).then(data => {
      $ = cheerio.load(data.data)
      let json
      const res = $('script#appState').get()
      for(let i of res){
        if(i.children && i.children[0] && i.children[0].data){
          ress = i.children[0].data.split('window.APP_INITIAL_STATE=')[1]
          json = JSON.parse(ress)
        }
        const result = {
          status: 200,
          author: author,
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
exports.imgur = async (url) => {
    return new Promise((resolve, reject) => {
            const options = {
                method: 'POST',
                url: `https://www.expertsphp.com/instagram-reels-downloader.php`,
                headers: {
                    "content-type": "application/x-www-form-urlencoded",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "cookie": "_ga_D1XX1R246W=GS1.1.1656127044.1.0.1656127044.0; __gads=ID=a826d8f71f32cdce-228526c6c4d30038:T=1656127044:RT=1656127044:S=ALNI_Mbc0q65XMPrQjf8pqxKtg_DfBEnNw; __gpi=UID=0000068f7e0217a6:T=1656127044:RT=1656127044:S=ALNI_MYDy-jLWlGuI8I9ZeSAgcTfDaJohQ; _ga=GA1.2.136312705.1656127045; _gid=GA1.2.728659727.1656127045; _gat_gtag_UA_120752274_1=1"
                },
                formData: {
                    url: url
                }
            };
            request(options, async function(error, response, body) {
                if (error) throw new Error(error)
                const $ = cheerio.load(body)
                const result = {
                    status: 200,
                    author: author,
                    video_link: $('#showdata > center > div:nth-child(5) > a').attr('href'),
                    image_link: $('#showdata > center > img').attr('src')
                }
                resolve(result);
            })
        })
}
exports.cariresep = async (query) => {
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
					creator: 'Fajar Ihsana',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}
exports.bacaresep = async (query) => {
	return new Promise(async (resolve, reject) => {
		axios.get(query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const abahan = [];
				const atakaran = [];
				const atahap = [];
				$('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name').each(function(a, b) {
					bh = $(b).text();
					abahan.push(bh)
				})
				$('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount').each(function(c, d) {
					uk = $(d).text();
					atakaran.push(uk)
				})
				$('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p').each(function(e, f) {
					th = $(f).text();
					atahap.push(th)
				})
				const judul = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1').text();
				const waktu = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span').text();
				const hasil = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span').text().split(': ')[1]
				const level = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span').text().split(': ')[1]
				const thumb = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img').attr('src')
				tbahan = 'bahan\n'
				for (let i = 0; i < abahan.length; i++) {
					tbahan += abahan[i] + ' ' + atakaran[i] + '\n'
				}
				ttahap = 'tahap\n'
				for (let i = 0; i < atahap.length; i++) {
					ttahap += atahap[i] + '\n\n'
				}
				const tahap = ttahap
				const bahan = tbahan
				const result = {
					creator: 'Fajar Ihsana',
					data: {
						judul: judul,
						waktu_masak: waktu,
						hasil: hasil,
						tingkat_kesulitan: level,
						thumb: thumb,
						bahan: bahan.split('bahan\n')[1],
						langkah_langkah: tahap.split('tahap\n')[1]
					}
				}
				resolve(result)
			})
			.catch(reject)
	})
}
exports.apkmirror = async (query) => {
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
					nem = $(b).text();
					nama.push(nem)
				})
				$('#content > div > div > div.appRow > div > div > div > a').each(function(c, d) {
					dev = $(d).text();
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
exports.sfiledown = async (link) => {
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
					creator: 'Hanya Orang Biasa',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}
exports.zippydl = async (link) => {
	return new Promise(async (resolve, reject) => {
		axios.get(link)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const nama = $('#lrbox > div:nth-child(2) > div:nth-child(1) > font:nth-child(4)').text();
				const size = $('#lrbox > div:nth-child(2) > div:nth-child(1) > font:nth-child(7)').text();
				const upload = $('#lrbox > div:nth-child(2) > div:nth-child(1) > font:nth-child(10)').text();
				const getlink = async (u) => {
					console.log('⏳  ' + `Get Page From : ${u}`)
					const zippy = await axios({
						method: 'GET',
						url: u
					}).then(res => res.data).catch(err => false)
					console.log('Done')
					const $ = cheerio.load(zippy)
					if (!$('#dlbutton').length) {
						return {
							error: true,
							message: $('#lrbox>div').first().text().trim()
						}
					}
					console.log('⏳  ' + 'Fetch Link Download...')
					const url = _url.parse($('.flagen').attr('href'), true)
					const urlori = _url.parse(u)
					const key = url.query['key']
					let time;
					let dlurl;
					try {
						time = /var b = ([0-9]+);$/gm.exec($('#dlbutton').next().html())[1]
						dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (2 + 2 * 2 + parseInt(time)) + '3/DOWNLOAD'
					} catch (error) {
						time = _math.evaluate(/ \+ \((.*)\) \+ /gm.exec($('#dlbutton').next().html())[1])
						dlurl = urlori.protocol + '//' + urlori.hostname + '/d/' + key + '/' + (time) + '/DOWNLOAD'
					}
					console.log('Done')
					return dlurl
				}
				getlink(link).then(res => {
					//_(timet) 
					var result = {
						creator: 'Hanya Orang Biasa',
						data: {
							Judul: nama,
							size: size,
							uploaded: upload,
							link: res
						}
					}
					resolve(result)
				})
			})
			.catch(reject)
	})
}
exports.android1 = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://an1.com/tags/MOD/?story=' + query + '&do=search&subaction=search')
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const nama = [];
				const link = [];
				const rating = [];
				const thumb = [];
				const developer = [];
				const format = [];
				$('body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.name > a > span').each(function(a, b) {
					nem = $(b).text();
					nama.push(nem)
				})
				$('div > ul > li.current-rating').each(function(c, d) {
					rat = $(d).text();
					rating.push(rat)
				})
				$('body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.developer.xsmf.muted').each(function(e, f) {
					dev = $(f).text();
					developer.push(dev)
				})
				$('body > div.page > div > div > div.app_list > div > div > div.img > img').each(function(g, h) {
					thumb.push($(h).attr('src'))
				})
				$('body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.name > a').each(function(i, j) {
					link.push($(j).attr('href'))
				})
				for (let i = 0; i < link.length; i++) {
					format.push({
						judul: nama[i],
						dev: developer[i],
						rating: rating[i],
						thumb: thumb[i],
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
exports.apkmody = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://apkmody.io/?s=' + query)
			.then(({
				data
			}) => {
				//console.log(data)
				const $ = cheerio.load(data)
				const nama = [];
				const link = [];
				const mod = [];
				const thumb = [];
				const format = [];
				$('#primary > section:nth-child(3) > div > div > div > article > a > div > div > div > h2').each(function(a, b) {
					nem = $(b).text();
					nama.push(nem)
				})
				$('#primary > section:nth-child(3) > div > div > div > article > a > div > div > p').each(function(c, d) {
					modd = $(d).text();
					mod.push(modd.split('\n')[1])
				})
				$('#primary > section:nth-child(3) > div > div > div > article > a > div > img').each(function(e, f) {
					thumb.push($(f).attr('src'))
				})
				$('#primary > section:nth-child(3) > div > div > div > article > a').each(function(g, h) {
					link.push($(h).attr('href'))
				})
				for (let i = 0; i < link.length; i++) {
					format.push({
						judul: nama[i],
						infomod: mod[i],
						thumb: thumb[i],
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
exports.happymod = (query) => {
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
					creator: 'Hanya Orang Biasa',
					data: format
				}
				resolve(result)
			})
			.catch(reject)
	})
}
exports.ghuser = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://github.com/search?q=' + query + '&type=users')
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const username = [];
				const link = [];
				const result = [];
				const thumb = [];
				$('#user_search_results > div > div > div.flex-auto > div > div.f4.text-normal > a.color-text-secondary').each(function(a, b) {
					link.push('https://github.com/' + $(b).attr('href'))
					usr = $(b).text();
					username.push(usr)
				})
				$('#user_search_results > div > div > div.flex-shrink-0.mr-2 > a > img').each(function(c, d) {
					thumb.push($(d).attr('src').replace('s=40&', ''))
				})
				for (let i = 0; i < link.length; i++) {
					result.push({
						name: username[i],
						thumb: thumb[i],
						link: link[i]
					})
				}
				resolve(result)
			})
			.catch(reject)
	})
}
exports.ghfollower = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://github.com/' + query + '?tab=followers')
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const link = [];
				const result = [];
				const username = [];
				$('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div > div > div > div.d-table-cell.col-9.v-align-top.pr-3 > a').each(function(a, b) {
					link.push('https://github.com/' + $(b).attr('href'))
					username.push($(b).attr('href').split('/')[1])
				})
				for (let i = 0; i < link.length; i++) {
					result.push({
						username: username[i],
						link: link[i]
					})
				}
				const hasil = {
					username: $('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.js-profile-editable-names.col-12.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block').text().split('\n')[1].replace('          ', ''),
					followers: $('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(1) > span').text(),
					avatar: $('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.position-relative.d-inline-block.col-2.col-md-12.mr-3.mr-md-0.flex-shrink-0 > a > img').attr('src'),
					listfollowers: result
				}
				resolve(hasil)
			})
			.catch(reject)
	})
}
exports.ghfollowing = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://github.com/' + query + '?tab=following')
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const link = [];
				const result = [];
				const username = [];
				$('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div > div > div > div.d-table-cell.col-9.v-align-top.pr-3 > a').each(function(a, b) {
					link.push('https://github.com/' + $(b).attr('href'))
					username.push($(b).attr('href').split('/')[1])
				})
				for (let i = 0; i < link.length; i++) {
					result.push({
						username: username[i],
						link: link[i]
					})
				}
				const hasil = {
					username: $('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.js-profile-editable-names.col-12.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block').text().split('\n')[1].replace('          ', ''),
					following: $('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(1) > span').text(),
					avatar: $('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.position-relative.d-inline-block.col-2.col-md-12.mr-3.mr-md-0.flex-shrink-0 > a > img').attr('src'),
					listfollowing: result
				}
				resolve(hasil)
			})
			.catch(reject)
	})
}
exports.jadwalsholat = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://umrotix.com/jadwal-sholat/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                $('body > div > div.main-wrapper.scrollspy-action > div:nth-child(3) ').each(function(a, b) {   
                    result = {
                    status: 200,
                    author: author,
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
exports.corona = async (country) => {
	if (!country) return loghandler.noinput;
	try {
		const res = await axios.request(`https://www.worldometers.info/coronavirus/country/` + country, {
			method: "GET",
			headers: {
				"User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36"
			}
		});
		let result = {};
		const $ = cheerio.load(res.data);
		result.status = res.status
		result.negara = $("div").find("h1").text().slice(3).split(/ /g)[0];
		result.total_kasus = $("div#maincounter-wrap").find("div.maincounter-number > span").eq(0).text() + " total";
		result.total_kematian = $("div#maincounter-wrap").find("div.maincounter-number > span").eq(1).text() + " total";
		result.total_sembuh = $("div#maincounter-wrap").find("div.maincounter-number > span").eq(2).text() + " total";
		result.informasi = $("div.content-inner > div").eq(1).text();
		result.informasi_lengkap = "https://www.worldometers.info/coronavirus/country/" + country;
		if (result.negara == '') {
			result.status = 'error'
		}
		return result;
	} catch (error404) {
		return "=> Error => " + error404;
	}
};
exports.mangatoon = async (search) => {
	if (!search) return "No Querry Input! Bakaa >\/\/<";
	try {
		const res = await axios.get(`https://mangatoon.mobi/en/search?word=${search}`, {
			method: "GET",
			headers: {
				"User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36"
			}
		});
		const hasil = [];
		const $ = cheerio.load(res.data);
		$('div.recommend-item').each(function(a, b) {
			let comic_name = $(b).find('div.recommend-comics-title > span').text();
			let comic_type = $(b).find('div.comics-type > span').text().slice(1).split(/ /g).join("");
			let comic_url = $(b).find('a').attr('href');
			let comic_thumb = $(b).find('img').attr('src');
			const result = {
				status: res.status,
				creator: "@dehan_j1ng",
				comic_name,
				comic_type,
				comic_url: 'https://mangatoon.mobi' + comic_url,
				comic_thumb
			};
			hasil.push(result);
		});
		let filt = hasil.filter(v => v.comic_name !== undefined && v.comic_type !== undefined);
		return filt;
	} catch (eror404) {
		return "=> Error =>" + eror404;
	}
}
exports.palingmurah = async (produk) => {
	if (!produk) {
		return new TypeError("No Querry Input! Bakaaa >\/\/<")
	}
	try {
		const res = await axios.get(`https://palingmurah.net/pencarian-produk/?term=` + produk)
		const hasil = []
		const $ = cheerio.load(res.data)
		$('div.ui.card.wpj-card-style-2 ').each(function(a, b) {
			let url = $(b).find('a.image').attr('href')
			let img = $(b).find('img.my_image.lazyload').attr('data-src')
			let title = $(b).find('a.list-header').text().trim()
			let product_desc = $(b).find('div.description.visible-on-list').text().trim()
			let price = $(b).find('div.flex-master.card-job-price.text-right.text-vertical-center').text().trim()
			const result = {
				status: res.status,
				creator: "@dehan_j1ng",
				product: title,
				product_desc: product_desc,
				product_image: img,
				product_url: url,
				price
			}
			hasil.push(result)
		})
		return hasil
	} catch (error404) {
		return new Error("=> Error =>" + error404)
	}
}
exports.mediafire = (query) => {
	return new Promise((resolve, reject) => {
		axios.get(query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const judul = $('body > div.mf-dlr.page.ads-alternate > div.content > div.center > div > div.dl-btn-cont > div.dl-btn-labelWrap > div.promoDownloadName.notranslate > div').text();
				const size = $('body > div.mf-dlr.page.ads-alternate > div.content > div.center > div > div.dl-info > ul > li:nth-child(1) > span').text();
				const upload_date = $('body > div.mf-dlr.page.ads-alternate > div.content > div.center > div > div.dl-info > ul > li:nth-child(2) > span').text();
				const link = $('#downloadButton').attr('href')
				const hsil = {
					judul: link.split('/')[5],
					upload_date: upload_date,
					size: size,
					mime: link.split('/')[5].split('.')[1],
					link: link
				}
				resolve(hsil)
			})
			.catch(reject)
	})
}
exports.dewabatch = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://dewabatch.com/?s=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const result = [];
				const linkk = [];
				const judull = [];
				const thumb = [];
				const rating = [];
				$('div.thumb > a').each(function(a, b) {
					linkk.push($(b).attr('href'))
					judull.push($(b).attr('title'))
					thumb.push($(b).find('img').attr('src').split('?resize')[0])
				})
				$('#content > div.postbody > div > div > ul > li > div.dtl > div.footer-content-post.fotdesktoppost > div.contentleft > span:nth-child(1) > rating > ratingval > ratingvalue').each(function(c, d) {
					rate = $(d).text();
					rating.push(rate.split(' ')[0])
				})
				for (let i = 0; i < linkk.length; i++) {
					result.push({
						judul: judull[i],
						rating: rating[i],
						thumb: thumb[i],
						link: linkk[i]
					})
				}
				resolve(result)
			})
			.catch(reject)
	})
}
exports.sfilesearch = (query) => {
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
					name = $(d).text();
					neme.push(name)
				})
				$('div.w3-card.white > div.list').each(function(e, f) {
					siz = $(f).text();
					//sz = siz.
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
exports.carigc = (nama) => {
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
exports.wikisearch = async (query) => {
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
exports.devianart = (query) => {
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
exports.konachan = (chara) => {
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
exports.wallpapercave = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://wallpapercave.com/search?q=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const result = [];
				$('div.imgrow > a').each(function(a, b) {
					if (!$(b).find('img').attr('src').includes('.gif')) {
						result.push('https://wallpapercave.com/' + $(b).find('img').attr('src').replace('fuwp', 'uwp'))
					}
				})
				resolve(result)
			})
			.catch(reject)
	})
}
exports.wallpapercraft = (query) => {
	return new Promise((resolve, reject) => {
		axios.get('https://wallpaperscraft.com/search/?query=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const result = [];
				$('span.wallpapers__canvas').each(function(a, b) {
					result.push($(b).find('img').attr('src'))
				})
				resolve(result)
			})
			.catch(reject)
	})
}
exports.wallpaperhd = (chara) => {
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
exports.wattpad = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.wattpad.com/search/${query}`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('div.story-card-data.hidden-xxs > div.story-info ').each(function(a, b) {
                    $('ul.list-group > li.list-group-item').each(function(c,d) {
                    result = {
                    status: 200,
                    author: author,
                    judul: $(b).find('> div.title').text(),
                    dibaca: $(b).find('> ul > li:nth-child(1) > div.icon-container > div > span.stats-value').text(),
                    divote: $(b).find('> ul > li:nth-child(2) > div.icon-container > div > span.stats-value').text(),
                    bab: $(b).find('> ul > li:nth-child(3) > div.icon-container > div > span.stats-value').text(),
                    waktu: $(b).find('> ul > li:nth-child(4) > div.icon-container > div > span.stats-value').text(),
                    url:'https://www.wattpad.com' + $(d).find('a').attr('href'),
                    thumb: $(d).find('img').attr('src'),
                    description: $(b).find('> div.description').text().replace(/\n/g,'')
                }
                hasil.push(result)
                })
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
exports.drakor = (query) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://drakorasia.blog//?s=${query}&post_type=post`)
            .then(({
                data
            }) => {
                const $ = cheerio.load(data)
                const hasil = [];
                 $('#post > div ').each(function(a, b) {
                    result = {
                    status: 200,
                    author: "@ Aine",
                    judul: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > a > h2').text().trim(),
                    years: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > div.category.text-gray.font-normal.text-white.text-xs.truncate > a').text(),
                    genre: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > div.genrenya.text-center.text-white.text-opacity-75.text-xs.mt-1').text().trim(),
                    thumbnail: $(b).find('> div.thumbnail > a > img').attr('src'),
                    url: $(b).find('> div.title.text-center.absolute.bottom-0.w-full.py-2.pb-4.px-3 > a').attr('href')
                }
                hasil.push(result)
                })
                resolve(hasil)
            })
            .catch(reject)
    })
}
exports.like = async (url) => {
    return new Promise(async (resolve, reject) => {
        const { data } = await axios.request("https://likeedownloader.com/results", {
            method: "post",
            data: new URLSearchParams(Object.entries({id: url})),
            headers: {
                "cookie": "_ga=GA1.2.553951407.1656223884; _gid=GA1.2.1157362698.1656223884; __gads=ID=0fc4d44a6b01b1bc-22880a0efed2008c:T=1656223884:RT=1656223884:S=ALNI_MYp2ZXD2vQmWnXc2WprkU_p6ynfug; __gpi=UID=0000069517bf965e:T=1656223884:RT=1656223884:S=ALNI_Map47wQbMbbf7TaZLm3TvZ1eI3hZw; PHPSESSID=e3oenugljjabut9egf1gsji7re; _gat_UA-3524196-10=1",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
            },
        });
        const $ = cheerio.load(data)
        result = {
            status: 200,
            author: author,
            title: $('body > div.page-wrapper > div.container > div > div.quote-box > p.quote-text > span').text(),
            thumbnail: $('body > div.page-wrapper > div.container > div > div.quote-box > div > img').attr('src'),
            watermark: $('body > div.page-wrapper > div.container > table > tbody > tr:nth-child(1) > td:nth-child(2) > a').attr('href'),
            no_watermark: $('body > div.page-wrapper > div.container > table > tbody > tr:nth-child(2) > td:nth-child(2) > a').attr('href')
        }
        resolve(result)
    });
};
let file = require.resolve(__filename)
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyanBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})