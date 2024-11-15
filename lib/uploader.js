/*
let axios = require('axios')
let BodyForm = require('form-data')
let {
  fromBuffer
} = require('file-type')
let fetch = require('node-fetch')
let fs = require('fs')
let cheerio = require('cheerio')

const createFormData = (content, fieldName, ext) => {
  const { mime } = fromBuffer(content) || {};
  const formData = new FormData();
  formData.append(fieldName, content, `${randomBytes}.${ext}`);
  return formData;
};

const handleErrorResponse = (error, spinner) => {
  spinner.fail(chalk.red("Failed"));
  console.error(chalk.red("Error:"), error.message);
  throw error;
};

module.exports = {
  telegraPh: async (buffer) => {
    try {
      const { ext } = await fromBuffer(buffer);
      const form = await createFormData(buffer, "file", ext);
      const res = await fetch("https://telegra.ph/upload", {
        method: "POST",
        body: form,
      });
      const img = await res.json();
      if (img.error) throw img.error;
      return `https://telegra.ph${img[0].src}`;
    } catch (error) {
      throw false;
    }
  },
  uploadPomf2: async (buffer) => {
    try {
      const { ext } = (await fromBuffer(buffer)) || {};
      const form = await createFormData(buffer, "files[]", ext);
      const res = await fetch("https://pomf2.lain.la/upload.php", {
        method: "POST",
        body: form,
      });
      const json = await res.json();
      if (!json.success) throw json;

      return json;
    } catch (error) {
      throw false;
    }
  },
  ucarecdn: async (content) => {
    try {
      const { ext } = (await fromBuffer(content)) || {};
      const formData = await createFormData(content, "file", ext);
      formData.append("UPLOADCARE_PUB_KEY", "demopublickey");
      formData.append("UPLOADCARE_STORE", "1");
      const response = await fetch("https://upload.uploadcare.com/base/", {
        method: "POST",
        body: formData,
        headers: {
          "User-Agent": fakeUserAgent(),
        },
      });
      const { file } = await response.json();

      return `https://ucarecdn.com/${file}/${randomBytes}.${ext}`;
    } catch (error) {
      throw false;
    }
  },
  tmpfiles: async (content) => {
    try {
      const { ext, mime } = (await fromBuffer(content)) || {};
      const formData = await createFormData(content, "file", ext);
      const response = await fetch("https://tmpfiles.org/api/v1/upload", {
        method: "POST",
        body: formData,
        headers: {
          "User-Agent": fakeUserAgent(),
        },
      });

      const result = await response.json();
      const match = /https?:\/\/tmpfiles.org\/(.*)/.exec(result.data.url);
      return `https://tmpfiles.org/dl/${match[1]}`;
    } catch (error) {
      throw false;
    }
  },
  Uguu: async (content) => {
    try {
      const { ext, mime } = (await fromBuffer(content)) || {};
      const formData = createFormData(content, "files[]", ext);
      const response = await fetch("https://uguu.se/upload.php", {
        method: "POST",
        body: formData,
        headers: {
          "User-Agent": fakeUserAgent(),
        },
      });
      const files = await response.json();
      return files.files[0].url;
    } catch (error) {
      throw false;
    }
  },
  gofile: async (content) => {
    try {
      const { ext, mime } = (await fromBuffer(content)) || {};
      const formData = createFormData(content, "file", ext);
      const getServer = await (
        await fetch("https://api.gofile.io/getServer", {
          method: "GET",
        })
      ).json();
      const response = await fetch(
        `https://${getServer.data.server}.gofile.io/uploadFile`,
        {
          method: "POST",
          body: formData,
          headers: {
            "User-Agent": fakeUserAgent(),
          },
        },
      );
      const result = await response.json();
      return `https://${getServer.data.server}.gofile.io/download/web/${result.data.fileId}/thumb_${result.data.fileName}`;
    } catch (error) {
      throw false;
    }
  },
  oxo: async (content) => {
    try {
      const { ext, mime } = (await fromBuffer(content)) || {};
      const formData = createFormData(content, "file", ext);
      const response = await fetch("http://0x0.st", {
        method: "POST",
        body: formData,
        headers: {
          "User-Agent": fakeUserAgent(),
        },
      });

      return await response.text();
    } catch (error) {
      throw false;
    }
  },
  catbox: async (content) => {
    try {
      const { ext, mime } = (await fromBuffer(content)) || {};
      const formData = createFormData(content, "fileToUpload", ext);
      formData.append("reqtype", "fileupload");
      const response = await fetch("https://catbox.moe/user/api.php", {
        method: "POST",
        body: formData,
        headers: {
          "User-Agent": fakeUserAgent(),
        },
      });
      return await response.text();
    } catch (error) {
      throw false;
    }
  },
  itzpire: async (buffer) => {
    try {
      const { ext, mime } = (await fromBuffer(buffer)) || {};
      const formData = new FormData();
      formData.append("file", ext, {
        filename: mime,
      });

      const { data } = await axios.post(
        "https://itzpire.site/tools/upload",
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      );

      return data.fileInfo;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw new Error(String(error));
    }
  },
};

/*let fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  delete require.cache[file];
  require(file);
});*/

let fs = require("fs");
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  delete require.cache[file];
  require(file);
});

*/

//=============
let axios = require('axios')
let BodyForm = require('form-data')
let {
  fromBuffer
} = require('file-type')
let fetch = require('node-fetch')
let fs = require('fs')
let cheerio = require('cheerio')

function uploadPomf2: async (buffer) => {
    try {
      const { ext } = (await fromBuffer(buffer)) || {};
      const form = await createFormData(buffer, "files[]", ext);
      const res = await fetch("https://pomf2.lain.la/upload.php", {
        method: "POST",
        body: form,
      });
      const json = await res.json();
      if (!json.success) throw json;

      return json;
    } catch (error) {
      throw false;
    }
  }

async function UploadFileUgu(input) {
  return new Promise(async (resolve, reject) => {
    const form = new BodyForm();
    form.append("files[]", fs.createReadStream(input))
    await axios({
      url: "https://uguu.se/upload.php",
      method: "POST",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
        ...form.getHeaders()
      },
      data: form
    }).then((data) => {
      resolve(data.data.files[0])
    }).catch((err) => reject(err))
  })
}

function webp2mp4File(path) {
  return new Promise((resolve, reject) => {
    const form = new BodyForm()
    form.append('new-image-url', '')
    form.append('new-image', fs.createReadStream(path))
    axios({
      method: 'post',
      url: 'https://s6.ezgif.com/webp-to-mp4',
      data: form,
      headers: {
        'Content-Type': `multipart/form-data; boundary=${form._boundary}`
      }
    }).then(({
      data
    }) => {
      const bodyFormThen = new BodyForm()
      const $ = cheerio.load(data)
      const file = $('input[name="file"]').attr('value')
      bodyFormThen.append('file', file)
      bodyFormThen.append('convert', "Convert WebP to MP4!")
      axios({
        method: 'post',
        url: 'https://ezgif.com/webp-to-mp4/' + file,
        data: bodyFormThen,
        headers: {
          'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
        }
      }).then(({
        data
      }) => {
        const $ = cheerio.load(data)
        const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
        resolve({
          status: true,
          message: "Created By MRHRTZ",
          result: result
        })
      }).catch(reject)
    }).catch(reject)
  })
}

async function floNime(medianya, options = {}) {
  const {
    ext
  } = await fromBuffer(medianya) || options.ext
  var form = new BodyForm()
  form.append('file', medianya, 'tmp.' + ext)
  let jsonnya = await fetch('https://flonime.my.id/upload', {
      method: 'POST',
      body: form
    })
    .then((response) => response.json())
  return jsonnya
}

async function uptotelegra(Path) {
  return new Promise(async (resolve, reject) => {
    if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
    try {
      const form = new FormData();
      form.append("file", fs.createReadStream(Path))
      const data = await axios({
        url: "https://telegra.ph/upload",
        method: "POST",
        headers: {
          ...form.getHeaders()
        },
        data: form
      })
      return resolve("https://telegra.ph" + data.data[0].src)
    } catch (err) {
      return reject(new Error(String(err)))
    }
  })
}

module.exports = {
  TelegraPh,
  UploadFileUgu,
  webp2mp4File,
  floNime,
  uptotelegra
  uploadPomf2
}