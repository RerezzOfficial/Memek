/**
 * Base By Siputzx
 * Created On 22/2/2024
 * Contact Me on wa.me/6288292024190
 * Supported By Gpt Assistant 
*/

const fetch = require('node-fetch');
const cheerio = require('cheerio');
const bingUrl = 'https://www.bing.com';

class BingApi {
  constructor(cookie) {
    this.cookie = cookie;
    this.headers = {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.5',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Alt-Used': 'www.bing.com',
      'Upgrade-Insecure-Requests': '1',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      Cookie: `_U=${cookie};`,
      'X-Forwarded-For': `20.${this.getRandomNum()}.${this.getRandomNum()}.${this.getRandomNum()}`,
    };
  }

  async createImages(prompt, isSlowMode) {
    try {
      const payload = `q=${encodeURIComponent(prompt)}`;
      let credits = await this.getCredits();
      if (!credits) {
        credits = 0;
      }
      let response = await this.sendRequest(credits > 0 ? isSlowMode : true, payload);

      if (response.status === 200) {
        const responseHtml = await response.text();
        const $ = cheerio.load(responseHtml);
        const errorAmount = $('.gil_err_img.rms_img').length;
        if (!isSlowMode && credits > 0 && $('#gilen_son').hasClass('show_n')) {
          throw 'Dalle-3 is currently unavailable due to high demand';
        } else if (
          $('#gilen_son').hasClass('show_n') ||
          (errorAmount === 2 && credits > 0 && isSlowMode)
        ) {
          throw 'Slow mode is currently unavailable due to high demand';
        } else if (errorAmount === 2) {
          throw 'Invalid cookie';
        } else if (errorAmount === 4) {
          throw 'Prompt has been blocked';
        } else {
          throw 'Unknown error';
        }
      }

      const eventId = response.headers.get('x-eventid');
      return await this.retrieveImages(eventId);
    } catch (error) {
      console.log(`error is ${error}`);
    }
  }

  async getCredits() {
    const response = await fetch(`${bingUrl}/create`, {
      headers: this.headers,
      method: 'GET',
      mode: 'cors',
    });
    const html = await response.text();
    const $ = cheerio.load(html);
    return $('#token_bal').text();
  }

  getRandomNum() {
    return Math.floor(Math.random() * 254) + 1;
  }

  async sendRequest(isSlowMode, payload) {
    try {
      const response = await fetch(
        `${bingUrl}/images/create?${payload}&rt=${isSlowMode ? '3' : '4'}`,
        {
          headers: this.headers,
          method: 'POST',
          mode: 'cors',
          redirect: 'manual',
        }
      );

      return response;
    } catch (error) {
      console.log('Error in sendRequest:', error);
    }
  }

  async retrieveImages(eventId) {
    try {
      while (true) {
        const images = await fetch(`${bingUrl}/images/create/async/results/1-${eventId}`, {
          headers: this.headers,
          method: 'GET',
          mode: 'cors',
        });

        const html = await images.text();

        if (html.includes(`"errorMessage":"Pending"`)) {
          throw 'Error occurred';
        }

        let results = [];

        if (html === '') {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          continue;
        }

        const $ = cheerio.load(html);
        for (let i = 0; i < $('.mimg').length; i++) {
          const badLink = $('.mimg')[i].attribs.src;
          const goodLink = badLink.slice(0, badLink.indexOf('?')); // Delete the parameters

          results.push(goodLink);
        }

        return results;
      }
    } catch (error) {
      console.log(`Error in retrieveImages: ${error}`);
    }
  }
}

const apikyst = ['1IlrTsmJ_6CEY3N1J2KbkaFshIsLD1fpIpZRdSVO_1b5cv44bI7EZWc4H2iqc4MDsDIiMdhHkZMeTxLWHaN4AK_zXHygQLthDnX3Rcnh-St93vRsxq0QpW9VsXyZ7NjDaQ3g7e4jddD11lSuy43bhHoIHSnfD-61SCa_q145RxMqT38XKm9WnW2JKp6lyeGTNG0nrQJwskQjP9z0kySLb0g','121IlrsqqTGX8XI7HO3k6HVfez9FBZSde48a7WXCuNvTWoz9qnaWnDW0gMmMTXv_O4681Q63-bxFZYU7ozbSUiz_eo5AmiId26XWbHRDRH09zgxH4UlxcZblAkTGx3l51L6W7ibpO6R4LVe-PeYNrsmhYM5xEswSA3SOJZdWuE_p1ReBmdZVXHXVnHGk0he-yh_5KVG4DIUQs8PlL3M9Mzw','1se_sxNdK6u5a28BtT4UptMe-JMIfa2m8YL1H_vzmuJBNa8yFaE4BmFMmwwhcp1NMdAtYDayWfyjw6VekgIL2KDc9wkhqx4ob1reReLisVLNmh_ia1G0R0I7_s-40gDB7aEQnasnVZ9exbI34fkk8eX6yQSqTzPZjzzUsHy8JMPBSiDr40mVMjv7qTx5_O2uxoBZbc0NZNT5p_SmrLUZ0-w','1p_x8pS-ly5WLEWs9q5hCo8OIOrTd1JP5IWhAtPLSKC9peU2O4OZeHP65qyvxsBjO_WYgaWkhGqbqw05Fb-T2dp_TYWzo-aH70qYw0RcwXrIw1lnKoe4cZNlbQQaB0fDx1AKAZpsBWgPlAhXB4tB2hieY5u6dr_wj-B4LU_CvHkuaP2NjJ-Ii3bJggvwIuXo579wRIHLifcUGpiPe14_0Ag'];

const apikeybing = apikyst[Math.floor(apikyst.length * Math.random())];

module.exports = { BingApi, apikeybing };
