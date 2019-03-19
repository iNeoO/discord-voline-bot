const Discord = require('discord.js');
const puppeteer = require('puppeteer');
const fs = require('fs');
const { login, password } = require('../config.js');


module.exports = {
  name: 'asi',
  description: 'get a asi article',
  execute(message, args) {
    if (!args.length) {
      return message.reply('**No url:** `!asi <url>`');
    }
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      await page.goto(args[0]);
      await page.waitFor('.login-menu-button', { visible: true });
      const connection = await page.evaluateHandle(() => {
        return document.querySelector('.login-menu-button');
      });
      await connection.click();
      await page.waitFor('login form site-field .field button[type="submit"]', { visible: true });
      await page.type('#username', login);
      await page.type('#password', password);
      const loginButton = await page.evaluateHandle(() => {
        return document.querySelector('login form site-field .field button[type="submit"]');
      });
      await loginButton.click();
      await page.waitFor(5000);
      const files = await page.evaluate(() => {
        const mp3 = document.querySelector('.play-action');
        const video = document.querySelector('.download-action');
        if (mp3 && video) {
          return { mp3: mp3.href, video: video.href };
        }
        return null;
      });
      if (files) {
        return message.reply(`\n- mp3: ${files.mp3}\n- video: ${files.video}`);
      } else {
        await page.pdf({ path: './pdf/asi.pdf', format: 'A4' });
        await browser.close();
        return message.reply('your file : ',
          new Discord.Attachment('./pdf/asi.pdf', './pdf/asi.pdf'),
        ).then(() => {
          fs.unlinkSync('./pdf/asi.pdf');
        });
      }
    })();
  },
};
