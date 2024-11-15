const axios = require('axios')
const fetch = require('node-fetch')
const qs = require('qs')
async function doodstream(url){
    let config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
            "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        data: {
            'url': url,
            'action': 'post',
        }
    }
  
    const response = await axios.post('https://api.hunternblz.com/doodstream', qs.stringify(config.data), { headers: config.headers })
    return response.data
}

async function terabox(url){
    let config = {
        headers: {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            "sec-ch-ua": '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
            "cookie": "PHPSESSID=ugpgvu6fgc4592jh7ht9d18v49; _ga=GA1.2.1126798330.1625045680; _gid=GA1.2.1475525047.1625045680; __gads=ID=92b58ed9ed58d147-221917af11ca0021:T=1625045679:RT=1625045679:S=ALNI_MYnQToDW3kOUClBGEzULNjeyAqOtg",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        data: {
            'url': url,
            'action': 'post',
        }
    }
  
    const response = await axios.post('https://api.hunternblz.com/terabox', qs.stringify(config.data), { headers: config.headers })
    return response.data
}

module.exports = { doodstream, terabox }