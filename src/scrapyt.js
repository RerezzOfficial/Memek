const { randomBytes } = require('crypto');
const fs = require('fs');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

 async function ytmp3(conn, m, url) {
    try {
        const info = await ytdl.getInfo(url);
        let a = "./system/sampah/" + randomBytes(4).toString('hex') + ".mp3";
        let b = await ytdl(url, {
            filter: "audioonly"
        }).pipe(fs.createWriteStream(a)).on("finish", async () => {
            await conn.sendMessage(m.chat, {
                audio: fs.readFileSync(a),
                mimetype: "audio/mp4",
                ptt: false
            }, { quoted: m, sendEphemeral: true })
        })
        return b
    } catch (e) {
        console.error(e);
        return {
            status: 'error',
            message: 'Terjadi kesalahan saat mengambil informasi video'
        };
    }
}

 async function ytmp4(conn, m, url) {
    try {
        await ytdl.getInfo(url);
        let a = "./system/sampah/" + randomBytes(4).toString('hex') + ".mp4";
        let b = await ytdl(url, {
            filter: "videoandaudio"
        }).pipe(fs.createWriteStream(a)).on("finish", async () => {
            const stats = fs.statSync(a);
            const fileSizeInBytes = stats.size;
            const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMB < 50) {
                await conn.sendMessage(m.from, {
                    video: fs.readFileSync(a),
                    mimetype: "video/mp4",
                }, { quoted: m, sendEphemeral: true });
            } else {
                await conn.sendMessage(m.chat, { text: "File size exceeds 50MB limit." }, { quoted: m, sendEphemeral: true });
            }
        });
        return b;
    } catch (e) {
        return e;
    }
}

 async function search(query) {
    try {
        const a = (await yts(query)).videos
        return a;
    } catch (e) {
        console.error(e)
        return null
    }
}

module.exports = { ytmp3, ytmp4, search }