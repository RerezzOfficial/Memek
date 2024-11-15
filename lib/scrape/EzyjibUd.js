const { load } = require("cheerio");
const axios = require("axios");

async function HotKomikUpdate() {
  return new Promise(async (resolve, reject) => {
    try {
      const $ = load(
        await axios.get("https://komikcast.ch/").then((r) => r.data)
      );
      resolve({
        madeby: "GamersIndo1223",
        data: $(".swiper-wrapper div").map((i, e) => {
          const m = $(e).find("a[href]");
          return {
            Title: m.attr("title"),
            Url: m.attr("href"),
            ImgUrl: m.find("img").attr("src"),
            Score: m.find(".numscore").text(),
            CurrentChapter: m.find(".chapter").text().trim(),
            ChapterUrl: m.find(".chapter").attr("href").trim(),
            Type: m.find(".type").text().trim(),
          };
        }),
      });
    } catch (e) {
      reject(e);
    }
  });
}
async function RilisanTerbaru() {
  return new Promise(async (resolve, reject) => {
    try {
      const $ = load(
        await axios.get("https://komikcast.ch/").then((r) => r.data)
      );
      resolve({
        madeby: "GamersIndo1223",
        data: $(".bixbox .listupd div")
          .filter((i, e) => $(e).hasClass("utao"))
          .map((i, e) => {
            return {
              Title: $(e).find(".series.data-tooltip").find("h3").text(),
              Url: $(e).find(".series").attr("href"),
              ImgUrl: $(e).find(".series").find("img").attr("src"),
              IsHot: $(e).find(".hot").length ? true : false,
              Type: $(e).find(".luf").find("ul").attr("class"),
              Chapters: $(e)
                .find(".luf")
                .find("ul")
                .children()
                .map(
                  (i, se) =>
                    `${$(se)
                      .find("a")
                      .text()
                      .replace(/\s{2,}/g, " ")
                      .trim()}-${$(se).find("i").text()}`
                )
                .get(),
            };
          })
          .get(),
      });
    } catch (e) {
      reject(e);
    }
  });
}
async function MostPopuler() {
  return new Promise(async (resolve, reject) => {
    try {
      const $ = load(
        await axios.get("https://komikcast.ch/").then((r) => r.data)
      );
      resolve({
        madeby: "GamersIndo1223",
        data: $(".serieslist.pop ul li")
          .map((i, e) => {
            return {
              Ranking: Number($(e).find(".ctr").text()),
              Title: $(e).find(".leftseries h2").find("a").text(),
              Tags: $(".leftseries span")
                .first()
                .children()
                .filter((e, c) => $(c).has("a"))
                .map((aw, as) => $(as).text())
                .get(),
              Released: $(e).find(".leftseries span").last().text(),
              ImgUrl: $(e).find(".imgseries img").attr("src"),
            };
          })
          .get(),
      });
    } catch (e) {
      reject(e);
    }
  });
}
async function getAllTags() {
  return new Promise(async (resolve, reject) => {
    try {
      const $ = load(
        await axios.get("https://komikcast.ch/").then((r) => r.data)
      );
      resolve({
        madeby: "GamersIndo1223",
        data: {
          tags: $(".genre li")
            .map((i, e) => {
              const wd = $(e).find("a");
              return `${$(wd).text()}: ${$(wd).attr("href")}`;
            })
            .get(),
          length: $(".genre li").length,
        },
      });
    } catch (e) {
      reject(e);
    }
  });
}
async function ExtractDataDariURL(url) {
  return new Promise(async (resolve, reject) => {
    const $ = load(await axios.get(url).then((r) => r.data));
    const m = $(".komik_info-content-info");
    resolve({
      madeby: "GamersIndo1223",
      data: {
        Title: $(".komik_info-content-body-title").text().trim(),
        NativeTitle: $(".komik_info-content-native").text().trim(),
        Tags: $(".komik_info-content-genre")
          .find("a")
          .map((index, element) => $(element).text().trim())
          .get(),
        Sinopsis: $(".komik_info-description")
          .find("p")
          .map((index, element) => $(element).text().trim() + `\n`.trimEnd())
          .get(),
        Author: m.first().text().split(":")[1].trim(),
        Released: $(".komik_info-content-info-release")
          .text()
          .split(":")[1]
          .trim(),
        TotalChapter: m.last().text().split(":")[1].trim(),
        Status: m.next().text().split(":")[1].trim(),
        LastUpdatedDate: $(".komik_info-content-update > time").attr(
          "datetime"
        ),
        LastUpdated: $(".komik_info-content-update > time").text().trim(),
        Rating: $(".data-rating").attr("data-ratingkomik"),
        TotalChapter: Array.from($(".komik_info-chapters-item")).length,
        LatestChapter: $(".komik_info-chapters-item")
          .first()
          .find(".chapter-link-item")
          .text()
          .split("\n")[1]
          .trim(),
        ImgUrl: $(".komik_info-cover-image").find("img").attr("src"),
        Type: $(".komik_info-content-info-type").find("a").text(),
        Url: url,
        Chapters: $("#chapter-wrapper")
          .children()
          .filter((i, el) => $(el).is("li"))
          .map((index, el) =>
            $(el)
              .find(".chapter-link-item")
              .text()
              .replace(/\s{2,}/g, " ")
              .trim()
          )
          .get(),
      },
    });
    try {
    } catch (e) {
      reject(e);
    }
  });
}

module.exports = {
   HotKomikUpdate,
   RilisanTerbaru,
   MostPopuler,
   getAllTags,
   ExtractDataDariURL,
}