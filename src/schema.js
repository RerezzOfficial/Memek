module.exports = (m) => {
  const isNumber = x => typeof x === 'number' && !isNaN(x)
  try {
    let user = global.db.data.users[m.sender]
    if (typeof user !== 'object') global.db.data.users[m.sender] = {}
    if (user) {
      if (!('banned' in user)) user.banned = false
      if (!isNumber(user.limit)) user.limit = 15
      if (!isNumber(user.balance)) user.balance = 0
      if (!isNumber(user.exp)) user.exp = 0
      if (!isNumber(user.level)) user.level = 0
      if (!('registered' in user)) user.registered = false
      if (!('premium' in user)) user.premium = false
      if (!isNumber(user.hit)) user.hit = 0
      if (!isNumber(user.lastclaim)) user.lastclaim = 0
      if (!isNumber(user.expired)) user.expired = 0
      if (!isNumber(user.afkTime)) user.afkTime = -1
      if (!('afkReason' in user)) user.afkReason = ''
    } else global.db.data.users[m.sender] = {
      name: m.pushName,
      banned: false,
      limit: 15,
      daily: false,
      balance: 0,
      exp: 0,
      level: 0,
      registered: false,
      premium: false,
      hit: 0,
      lastclaim: 0,
      expired: 0,
      afkTime: -1,
      afkReason: ''
    }
    let chat = global.db.data.chats[m.chat]
    if (typeof chat !== 'object') global.db.data.chats[m.chat] = {}
    if (chat) {
      if (!('nsfw' in chat)) chat.nsfw = false
      if (!('banned' in chat)) chat.banned = false
      if (!('autojpm' in chat)) chat.autojpm = false
      if (!('antilink' in chat)) chat.antilink = false
      if (!('mute' in chat)) chat.mute = false
      if (!('antibot' in chat)) chat.antibot = false
      if (!('simichat' in chat)) chat.simichat = false
      if (!('autodl' in chat)) chat.autodl = false
      if (!('kayy' in chat)) chat.kayy = false
    } else global.db.data.chats[m.chat] = {
      nsfw: false,
      banned: false,
      autojpm: false,
      antilink: false,
      mute: false,
      antibot: false,
      simichat: false,
      autodl: false,
      kayy: false
    }
    let settings = global.db.data.settings
    if (settings) {
      if (!('autobio' in settings)) settings.autobio = false
      if (!('autoread' in settings)) settings.autoread = false
      if (!('game' in settings)) settings.game = false
      if (!isNumber(settings.hitstat)) settings.hitstat = 0
   } else global.db.data.settings = {
         autobio: false,
         autoread: false,
         game: false,
         hitstat: 0
        }
} catch (e) {
    console.error(e)
  }
}