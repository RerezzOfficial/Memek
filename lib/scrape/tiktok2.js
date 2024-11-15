const { getMeta, getUserMeta } = require("../data");
const fs = require("fs");
const moment = require("moment-timezone");
const cheerio = require("cheerio");
let chce = {};
const axios = require("axios");
const httpsAgent = require("https-proxy-agent");
const { spawn } = require("child_process");
function toHHMMSS(sec_num) {
  var hours = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - hours * 3600) / 60);
  var seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  console.log(hours + ":" + minutes + ":" + seconds);
  return hours + ":" + minutes + ":" + seconds;
}
function formatToUnits(number, precision) {
  var SI_POSTFIXES = ["", " K", " M", " G", " T", " P", " E"];
  var tier = (Math.log10(Math.abs(number)) / 3) | 0;
  if (tier == 0) return number;
  var postfix = SI_POSTFIXES[tier];
  var scale = Math.pow(10, tier * 3);
  var scaled = number / scale;
  var formatted = scaled.toFixed(1) + "";
  if (/\.0$/.test(formatted))
    formatted = formatted.substr(0, formatted.length - 2);
  return formatted + postfix;
}

function parseMeta(JSONDATA) {
  let data = JSONDATA;
  let content = {};
  if (JSONDATA.image_post_info) {
     let images = [];
     for (let { display_image: i } of JSONDATA.image_post_info.images) {
          images.push({ 
                url: i.url_list[0],
                width: i.width,
                height: i.height
            });
          content.images = images;
     }
  } else {
    content = {
      "video": {
      noWatermark: data.video.play_addr.url_list[0],
      watermark: data.video.download_addr.url_list[0],
      cover: data.video.cover.url_list[0],
      dynamic_cover: data.video.dynamic_cover.url_list[0],
      origin_cover: data.video.origin_cover.url_list[0],
      width: data.video.width,
      height: data.video.height,
      durationFormatted: toHHMMSS(Math.floor(data.video.duration / 1000)),
      duration: Math.floor(data.video.duration / 1000),
      ratio: data.video.ratio,
    }}


  }

  let meta = {
    id: parseInt(data.aweme_id),
    title: data.desc || "Downloaded from TiklyDown API",
            url: data.originURL,
    created_at: moment(data.create_time * 1000)
      .tz("Asia/Jakarta").locale("en")
      .format("DD MMM YYYY, h:mm A"),
    stats: {
      likeCount:
        data.statistics.digg_count > 9999
          ? formatToUnits(data.statistics.digg_count, 1)
          : data.statistics.digg_count,
      commentCount:
        data.statistics.comment_count > 9999
          ? formatToUnits(data.statistics.comment_count, 1)
          : data.statistics.comment_count,
      shareCount:
        data.statistics.share_count > 9999
          ? formatToUnits(data.statistics.share_count, 1)
          : data.statistics.share_count,
      playCount:
        data.statistics.play_count > 9999
          ? formatToUnits(data.statistics.play_count, 1)
          : data.statistics.play_count,
      saveCount:
        data.statistics.collect_count > 9999
          ? formatToUnits(data.statistics.collect_count, 1)
          : data.statistics.collect_count,
    },
    ...content,
    music: data.music
      ? {
          id: data.music.id,
          title: data.music.title,
          author: data.music.author,
          cover_hd: data.music.cover_hd
            ? data.music.cover_hd.url_list[0]
            : null,
          cover_large: data.music.cover_large.url_list[0],
          cover_medium: data.music.cover_medium.url_list[0],
          cover_thumb: data.music.cover_thumb.url_list[0],
          durationFormatted: toHHMMSS(data.music.duration),
          duration: data.music.duration,
          play_url: data.music.play_url.url_list[0],
        }
      : {},
    author: data.author
      ? {
          id: data.author.uid,
          name: data.author.nickname,
          unique_id: data.author.unique_id,
          signature: data.author.signature,
          avatar: data.author.avatar_medium.url_list[0],
          avatar_thumb: data.author.avatar_thumb.url_list[0],
        }
      : {},
  };
  return meta;
}

async function dlpanda(url) {
     return new Promise((resolve, reject) => {
          axios.get(`https://dlpanda.com/?url=${encodeURIComponent(url)}`, { headers: { "User-agent": "WhatsApp/20.12.3" }})
               .then(({ data, status }) => {
                    let $ = cheerio.load(data)
                    let images = [];
                    console.log(data);
                    console.log($('div.row > div.col-md-12').toString())
                    $('div.row > div.col-md-12').each((ai, rest) => {
                         var image = $(rest).find('img').attr('src')
                         if (image) images.push(image)
                    })
                    resolve({ status: status, result: images })
               })
               .catch(e => {
                    reject(e)
               })
     })
}

async function stalk(usr) {
return new Promise(async (resolve, reject) => {
if (chce[usr.replace("@", "")]) return resolve(chce[usr.replace("@", "")]);
try {
let jwt = await new Promise(async (resolve, reject) => {
result = "";
require("child_process").spawn("curl", ["https://us.tiktok.com/@"+usr.replace("@", ""), "-H", 'User-agent: Mozilla/5.0 (Linux; Android 11; RMX3235) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Mobile Safari/537.36\"'])
.on("error", reject)
.stdout.on("data", (data) => {
result += data;
})
.on("close", () => {
try {
let $ = cheerio.load(result);
resolve(JSON.parse($("script[id=\"SIGI_STATE\"]").toString().split("json\">")[1].split("</script>")[0]).MobileUserModule)
} catch (e) {
console.error(e);
reject({ status: 500, message: "Internal server error" });
}
})
})
if (!jwt) return reject({ status: 404, message: "User not Found" });
data = { users: {}, stats: {} }
data.stats = jwt.stats[usr.replace("@", "")]
data.users = jwt.users[usr.replace("@", "")]
chce[usr.replace("@", "")] = { status: 200, data }
resolve({ status: 200, data })
setTimeout(() => {
delete chce[usr.replace("@", "")]
}, 120 * 1000)
} catch (e) {
console.error(e);
reject({ status: 500, message: "Internal server error" });
}
})
}

module.exports = {
  stalk,
  dlpanda,
  getMeta: (url) =>
    new Promise((resolve, reject) => {
      getMeta(url)
        .then((data) => {
          resolve(parseMeta(data));
        })
        .catch((err) => {
          reject(err);
        });
    }),
};
