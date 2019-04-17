const Discord = require('discord.js');
const puppeteer = require('puppeteer');
const fs = require('fs');
const { login, password } = require('@/config.js');

// empty header not accepted by website
// https://github.com/GoogleChrome/puppeteer/issues/1755
// https://github.com/GoogleChrome/puppeteer/issues/665

module.exports = {
  name: 'ddiplo',
  description: 'get a diplo article',
  execute(message, args) {
    if (!args.length) {
      return message.reply('**No url:** `!diplo <url>`');
    }
    (async () => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      // https://github.com/GoogleChrome/puppeteer/issues/665
      await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3738.0 Safari/537.36');
      await page.goto(args[0]);
      const button = await page.$('#session_connexion');
      await button.click();
      await page.waitFor(1000);
      await page.type('input[name="email"]', login);
      await page.type('input[name="mot_de_passe"]', password);
      await page.$eval('#identification_sso', form => form.submit());
      await page.waitFor(5000);
      await page.pdf({ path: './pdf/diplo.pdf', format: 'A4' });
      await browser.close();
      return message.reply('your file : ',
        new Discord.Attachment('./pdf/diplo.pdf', './pdf/diplo.pdf'),
      ).then(() => {
        fs.unlinkSync('./pdf/diplo.pdf');
      });
    })();
  },
};
