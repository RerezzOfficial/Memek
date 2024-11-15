// Yaya Ga Mau Tempel Wm, Kalau Mau Ambil aja, Hapus Teks ini juga takpe

// see you in next time


const axios = require("axios");
const cheerio = require("cheerio");

async function melonsong() {
	const lagu = [];
	const urls = [];
	const rankPage = await axios.get("https://www.melon.com/chart/index.htm");
	const ranks = cheerio.load(rankPage.data);
	const titles = ranks("#lst50 > td:nth-child(6) > div > div > div.ellipsis.rank01 > span > a");
	ranks(titles).each((_, elem) => {
		const href = ranks(elem).attr("href").split(",");
		const code = href[href.length - 1].replace(");", "");
		urls.push(`https://www.melon.com/song/lyrics.htm?songId=${code}`);
	});
	for (const url of urls.slice(0, 20)) {
		const detailPage = await axios.get(url);
		const detail = cheerio.load(detailPage.data);
		const songTitle = detail("#downloadfrm > div > div > div.entry > div.info > div.song_name")
			.text()
			.trim()
			.replace(/\n|\t/g, "")
			.slice(2);
		const artist = detail("#downloadfrm > div > div > div.entry > div.info > div.artist > a").attr("title");
		const albumCover = detail("#downloadfrm > div > div > div.thumb > a > img").attr("src");

		lagu.push({
           authBy: 'IFTXH',
			songTitle: songTitle,
			artist: artist,
			albumCover: albumCover,
			url: url,
		});
	}

	return lagu;
}

module.exports = { melonsong }
// lirik lagu korea😂