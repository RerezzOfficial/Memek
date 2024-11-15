const axios = require('axios'), cheerio = require('cheerio')

var headers = {
  "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
  "cache-control": "max-age=0",
  "sec-ch-ua": "\"Google Chrome\";v=\"119\", \"Chromium\";v=\"119\", \"Not?A_Brand\";v=\"24\"",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "none",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1",
  "cookie": "cf_chl_2=042040534f3c65a; cf_clearance=asSf8lgAkxbxozIZ5_IOCyZInFq4E0X1kkgybg69HFA-1701606483-0-1-d36d4567.c80b56b5.6bd72e28-160.0.0; wp-wpml_current_language=id; _ga=GA1.1.500563331.1701606497; PHPSESSID=6rpt87r8he3sltlk0l5n0eto38; _ga_2MQB3CYZ0H=GS1.1.1701606497.1.1.1701606551.0.0.0"
}
const req = axios.create({ headers })

exports.douyin = (url) => {
  return new Promise(async(resolve, reject) => {
    try {
      var { data: step1 } = await req("https://snapdouyin.app/id/", { "referrerPolicy": "strict-origin-when-cross-origin" }) 
      const $ = cheerio.load(step1);
      const token = $('#token').val()
      var { data: step2 } = await req('https://snapdouyin.app/wp-json/aio-dl/video-data/', {
        method: 'POST',
        data: { url, token }
      })
      var result = {
        status: true,
        creator: global.creator, // Ensure global.creator is defined elsewhere
        info_video: {
          title: step2.title,
          thumb: step2.thumbnail,
          duration: step2.duration
        },
        media: Object.fromEntries((step2.medias || []).filter(({ quality }) => ['hd', 'sd', 'watermark', '128kbps'].includes(quality)).map(({ url, quality, size, formattedSize }) => [quality, { url, size, formattedSize }]))
      }
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
}
