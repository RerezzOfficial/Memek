const fs = require('fs')
const chalk = require('chalk')
const moment = require('moment-timezone')
const hariini = moment.tz('Asia/Jakarta').format('dddd, DD MMMM YYYY')	
const time = moment(Date.now()).tz('Asia/Jakarta').locale('id').format('HH:mm:ss z')
const renSc = new require('./lib/scrape/noapi')
const Fichan = new require('./lib/functions')
const renSc2 = new require('./lib/scrape/scraperf')
const Styles = (text, style = 1) => {
var xStr = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
var yStr = {
1: 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘqʀꜱᴛᴜᴠᴡxʏᴢ1234567890'
};
var replacer = [];
xStr.map((v, i) =>
replacer.push({
original: v,
convert: yStr[style].split('')[i]
})
);
var str = text.toLowerCase().split('');
var output = [];
str.map((v) => {
const find = replacer.find((x) => x.original == v);
find ? output.push(find.convert) : output.push(v);
});
return output.join('');
};
const ab = '`'
//======================[ SYSTEM ]====================\\
global.baileys = require('@whiskeysockets/baileys')
global.usePairingCode = true
//======================[ SOSIAL ]====================//
global.saluran = 'https://whatsapp.com/channel/0029VafrgYMI1rcl7adYhY1p'
global.idsal = "120363317428449622@newsletter"
global.gr = 'https://chat.whatsapp.com/EqWI4gnsRrOFsgHDCOxNK3'
global.yt = 'https://youtube.com/@Rerezz-Hyuga'
global.ig = 'https://instagram.com/rerez_hosting.0208'
global.email = 'rerezhosting@gmail.com'
global.ap = 'https://api.kayyofc.biistoreee.com'
global.wame = "https://wa.me/6282312436896"
global.tme = "https://t.me/rerez_x_hosting"
global.region = 'indonesia'
global.xchannel = {
	jid: '120363317428449622@newsletter'
	}
//====================[ BOT SETTINGS ]=====================\\
global.ownername = "XYREZZ OFFC"
global.rowner = [
    ["6285215527536", "XYREZZ HOSTING OFFC", true], // OWN 1
    ["6285216955233", "XYREZZ OFFC", true], // OWN 2
    ["6283804766053", "REREZ HOSTING", true], 
	["6281563424562", "REREZ HOSTING", true]// OWN 3
                 ];
global.owner = ["6285216955233"] 
global.botno = "6283841605780"
global.tumburl = 'https://telegra.ph/file/c04528f6a3a3d511f4061.jpg'
global.fakejpg = 'https://telegra.ph/file/c04528f6a3a3d511f4061.jpg'
global.keyopenai = `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`
global.botname = 'RESELLER REREZ HOSTING' 
global.packname = 'REREZ HOSTING' // nama sticker
global.author = `At ${hariini}\n${time}` //nama sticker
global.wm = `[ XYREZZ BOTZZ - MD ]`
global.namaStore = 'Rezz Store'
global.ownerStore = 'Rerez Store'
global.sessionName = 'X-REZZ BOTZ SESSIONS'
//====================[ APIKEY SETTINGS DO ]====================//
global.REPLICATE_API_TOKEN = 'r8_4pfPFNgOFCN7URD8nsMG2zkWo0gMVr214tNms'
global.apilinode = '75a4103e2105b1bf8913542f88ef1de75e7bf93469fe131e39a4f840878e45ef'
global.apitokendo = `ksoskai`
global.domainotp = 'https://tokoclaude.com/api'
global.apikeyotp = '5e78689a6173667fcce2ae127323eeb4'
//=====================[ CPANEL SETTINGS ]====================\\
global.domain = 'https://kayydev.store-panel.biz.id'
global.apikey = 'ptla_0MqmVfCBXQSi0nFHGcZfWwBm2IcqUWV8F6Ic0jKw4VC'
global.capikey = 'ptlc_WztAZMDe9B29PfGQdLZJ7K01ecVR2vWfHTh01PA3Vvk'
global.eggsnya = '15'
global.location = '1' 
//====================[ PAYMENT SETTINGS ]==================\\
global.dana = `085216955233`
global.gopay = `085216955233`
global.ovo = `085216955233`
global.pulsa = `085216955233`
global.qris = `https://telegra.ph/file/11422ecde533a5741fadb.jpg`

global.qrdana = `https://telegra.ph/file/bfed3bddcee05b4822c89.jpg`
global.qrgopay = `https://telegra.ph/file/ff48fc55655242afcb1fb.jpg`
global.qrovo = `https://telegra.ph/file/c33f110f563fbb59f641c.jpg`
global.qrpulsa = `https://telegra.ph/file/3bc2da8a7ca1ba20a9a80.jpg`
global.qrqris = `https://telegra.ph/file/11422ecde533a5741fadb.jpg`
//====================[ API SETTINGS ]=======================//
// ApiKeys
global.xfarApi = `OYi6LEZ6QY`
global.caliph = `MyBiibotz`
global.KayBii = `BiiXKayy`
global.zenzkey = `zenzkey_41b4fe7a5d`
global.btbApi = `w4SYozNA`
global.ApiNx = `kceScM`
global.skizo = `Twelve`
global.skizo2 = `kyuu`
global.beta = 'BRexrqpD'
global.kimz = `kayy`
global.ziro = `ojbSxpdBb4`
global.xyro = `4OfcqDtWMj`
global.rose = 'Aliciazyn'
global.arif = `AR-xQWGNiqhwVaJ`
global.arifyn = `AR-eS8sE0ShK48c`
global.ibeng = `j8a2H4Tly6`
global.ibeng3 = `a5wXu8gj58`
global.ibeng2 =`uYmf6Sgjxl`
global.xeonApi = `976b505f`
global.rbot = `punyaku`
global.miftah = `free`
global.qyuApi = `XjEycutl8w`
global.ApiNeko = `7198c803`
global.ramz = `kayydev`
global.pitu = `3aa275992a`
global.yanzApi = `kyuurzy`
global.ifung = `sCbXLTDebA`
global.alya = `muzan23`
global.zoner = `6D0979`
global.koi = `tWQaPXtQH8`
global.rdnApi = `5o7fzt6nir2`
global.ouzen = `zenzkey_a3ac079e820f`
global.kicode = `KC-euHoZ2JgkOhs`
global.maelyn = `SvbxiWHTmt`
global.apikey = `XingYuEmperor`
//=================================================//
//==================[ SIMBOL SETTINGS ]====================\\
global.hiasan = `	◦  `
global.prefa = ['','!','.',',','🐤','🗿']
global.sp = '⭔'
global.wlcm = []
global.wlcmm = []
global.themeemoji = "乂"
global.tTeks = '┃.'
global.tTeks2 = '> '
global.gris = '`'
global.simbolatas = '┏━━━━━━━━━━━━━━━━'
global.simboltengah = '┣━━━━━━━━━━━━━━━━'
global.simbolbawah = '┗━━━━━━━━━━━━━━━━'
global.simbol0 = '┃'
global.simbol = '❖'
//===================
global.trash = fs.readFileSync('./process.json')
global.document = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
global.link = ""
global.select = 2
global.footer = Styles(`${tTeks2}_BOT WHATSAPP BY XYREZ OFFC_`)
global.footer2 = Styles(`BOT WHATSAPP BY XYREZ OFFC`)
global.running = "Pannel Pterodactyl"
global.typemenu = 'v12' 

global.scrap = renSc2
global.chApi = renSc
global.Func = Fichan
global.tag = `© 2024 | ${botname}`
global.systemN = `*[ System Notice ]*`
global.mess = {
    ban: Styles('⚠️ *𝙰𝙲𝙲𝙴𝚂𝚂 𝙳𝙴𝙽𝙸𝙴𝙳* ⚠️\nAnda Telah Di Band !!!'),
    badm: Styles('⚠️ *𝙰𝙲𝙲𝙴𝚂𝚂 𝙳𝙴𝙽𝙸𝙴𝙳* ⚠️\nBot Harus Menjadi Admin !!!'),
    regis: Styles(`⚠️ *𝙰𝙲𝙲𝙴𝚂𝚂 𝙳𝙴𝙽𝙸𝙴𝙳* ⚠️\nKamu Belum Terdaftar !!!\nSilahkan Daftar Dengan Cara *.daftar*`),
    premium: Styles('⚠️ *𝙰𝙲𝙲𝙴𝚂𝚂 𝙳𝙴𝙽𝙸𝙴𝙳* ⚠️\nKhusus Premium'),
    search: Styles('🔍 *Search for server. . .*'),
    done: Styles('Done Ga...?? Done Lahh'),
    success: Styles('*[ Loaded Success ]*'),
    admin: Styles('⚠️ *𝙰𝙲𝙲𝙴𝚂𝚂 𝙳𝙴𝙽𝙸𝙴𝙳* ⚠️\nKhusus Admin !!!'),
    owner: Styles('⚠️ *𝙰𝙲𝙲𝙴𝚂𝚂 𝙳𝙴𝙽𝙸𝙴𝙳* ⚠️\nKhusus Owner !!!'),
    group: Styles('⚠️ *𝙰𝙲𝙲𝙴𝚂𝚂 𝙳𝙴𝙽𝙸𝙴𝙳* ⚠️\nKhusus Group Chat !!!!'),
    private: Styles('⚠️ *𝙰𝙲𝙲𝙴𝚂𝚂 𝙳𝙴𝙽𝙸𝙴𝙳* ⚠️\nKhusus Private Chat !!!'),
    bot: Styles('⚠️ *𝙰𝙲𝙲𝙴𝚂𝚂 𝙳𝙴𝙽𝙸𝙴𝙳* ⚠️\nKhusus Bot !!!'),
    wait: Styles('*[ Loading ]* Please Wait'),
    getdata: Styles('Scraping metadata . . .'),
    fail: Styles('Can\'t get metadata!'),
    error: Styles('*[ System Failed ]* Error, Silahkan Hubungi Owner Untuk Memperbaiki !!!'),
    errorF: Styles('*[ System Failed ]* Maaf Fitur Sedang Error.'),
}


// SETTING GAME
global.gamewaktu = 60 // Game waktu
global.bmin = 1000 // Balance minimal 
global.bmax = 10000 // Balance maksimal
global.versibot = "V 9.5.0"
//Gausah Juga

// DATABASE GAME

global.suit = {};
global.tictactoe = {};
global.petakbom = {};
global.kuis = {};
global.siapakahaku = {};
global.asahotak = {};
global.susunkata = {};
global.caklontong = {};
global.family100 = {};
global.tebaklirik = {};
global.tebaklagu = {};
global.tebakgambar2 = {};
global.tebakkimia = {};
global.tebakkata = {};
global.tebakkalimat = {};
global.tebakbendera = {};
global.tebakanime = {};
global.kuismath = {};
//=================================================//
let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
