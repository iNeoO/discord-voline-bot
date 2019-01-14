const Discord = require('discord.js');
const puppeteer = require('puppeteer');
const fs = require('fs');
const { login, password } = require('../config.json');


module.exports = {
  name: 'mediapart',
  description: 'get a mediapart article',
  execute(message, args) {
    if (!args.length) {
      return message.reply('**No url:** `!mediapart <url>`');
    }
    (async () => {
      const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const page = await browser.newPage();
      await page.goto(args[0]);
      await page.type('#edit-name-content', login);
      await page.type('#edit-pass-content', password);
      await page.waitFor('.l-50.login form input[type="submit"]', { visible: true });
      const loginButton = await page.evaluateHandle(() => {
        const elem = document.querySelector('.l-50.login form input[type="submit"]');
        return elem;
      });
      await loginButton.click();
      await page.waitForNavigation();
      const fullPage = await page.evaluateHandle(() => {
        const elem = document.querySelector('.content-page-full');
        return elem;
      });
      if (fullPage && fullPage.click) {
        await fullPage.click();
        await page.waitForNavigation();
      }
      await page.pdf({ path: './pdf/mediapart.pdf', format: 'A4' });
      await browser.close();
      return message.reply('your file : ',
        new Discord.Attachment('./pdf/mediapart.pdf', './pdf/mediapart.pdf'),
      ).then(() => {
        fs.unlinkSync('./pdf/mediapart.pdf');
      });
    })();
  },
};
