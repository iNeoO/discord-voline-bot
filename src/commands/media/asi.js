const { Attachment } = require('discord.js');
const {
  Command,
} = require('discord.js-commando');
const puppeteer = require('puppeteer');
const fs = require('fs');
const {
  login,
  password,
} = require('@/config.js');


class Asi extends Command {
  constructor(client) {
    super(client, {
      name: 'asi',
      group: 'media',
      memberName: 'asi',
      description: 'Get a asi article or emission',
      examples: ['!asi <url>'],
      args: [
        {
          key: 'url',
          prompt: '**Which article/emission do you want**\n',
          type: 'string',
          validate: text => /^https:\/\/www.arretsurimages.net*/.test(text),
        },
      ],
    });
  }

  run(msg, { url }) {
    (async () => {
      try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        await page.goto(url);
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
          await browser.close();
          return msg.reply(`\n- mp3: ${files.mp3}\n- video: ${files.video}`);
        } else {
          const pdf = await page.pdf();
          await browser.close();
          return msg.reply('your file : ',
            new Attachment(pdf, 'asi.pdf'));
        }
      } catch (e) {
        console.error('____');
        console.error((new Date()).toISOString());
        console.error(e);
      }
    })();
  }
}

module.exports = Asi;
