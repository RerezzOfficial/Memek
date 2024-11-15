const cheerio = require("cheerio");
const axios = require("axios");

async function ffCh() {
  let response = await axios.default("https://ff.garena.com/id/chars/");
  let $ = cheerio.load(response.data);
  let hasil = [];

  $(".char-box.char-box-new").each((index, element) => {
    let name = $(element).find(".char-item-name").text();
    let desc = $(element).find(".char-item-desc").text();
    let id = $(element).find("a").attr("href");
    const match = id.match(/\/(\d )$/);
    const idRes = match ? parseInt(match[1]) : null;
    hasil.push({
      name: name.trim(),
      desc: desc.trim(),
      id: idRes,
    });
  });

  return hasil;
}

async function ffChSkill(id) {
  let response = await axios.default(`https://ff.garena.com/id/chars/${id}`);
  let $ = cheerio.load(response.data);
  let hasil = [];

  let title = $(".skill-profile-r .skill-profile-title").text();
  let name = $(".skill-profile-name").text();
  let skill = $(".skill-introduction").text();
  hasil.push({
    title: title.trim(),
    name: name.trim(),
    skill: skill.trim(),
  });

  return hasil;
}

module.exports = {
ffCh,
ffChSkill
}