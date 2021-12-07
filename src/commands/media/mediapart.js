const { Attachment } = require('discord.js');
const {
  Command,
} = require('discord.js-commando');
const {
  RichEmbed,
} = require('discord.js');
const puppeteer = require('puppeteer');
const {
  login,
  password,
} = require('@/config.js');


class Mediapart extends Command {
  constructor(client) {
    super(client, {
      name: 'mediapart',
      group: 'media',
      memberName: 'mediapart',
      description: 'Get a mediapart article',
      examples: ['!mediapart <url>'],
      args: [
        {
          key: 'url',
          prompt: '**Which article do you want**\n',
          type: 'string',
          validate: text => /^https:\/\/www.mediapart.fr*/.test(text),
        },
      ],
    });
  }

  run(msg, { url }) {
    (async () => {
      const patt = /(?:[^\/]*\/)*([^\/]*)/;
      const fileName = `mediapart-${url.match(patt)[1]}.pdf`;
      const embed = new RichEmbed()
        .setTitle('Mediapart to PDF')
        .setDescription(`Converting ${url} to PDF.`)
        .setFooter('Please wait ...');
      msg.channel.send({ embed });
      // const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
      const browser = await puppeteer.launch({ args:['--window-size=1920,1080', '--no-sandbox', '--disable-setuid-sandbox'] });
      try {
        const page = await browser.newPage({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        await page.goto(url);
        const rgpdButton = await page.evaluateHandle(() => {
          const elem = document.querySelector('#js-cc-modal-allow');
          return elem;
        });
        await rgpdButton.click();
        await page.type('#edit-name-content', login);
        await page.type('#edit-pass-content', password);
        const loginButton = await page.evaluateHandle(() => {
          const elem = document.querySelector('form .button.is-primary[type="submit"]');
          return elem;
        });
        await loginButton.click();
        await page.waitForNavigation();
        const fullPage = await page.evaluateHandle(() => {
          const elem = document.querySelector('.content-page-full');
          return elem;
        });
        const closeAlertBtn = await page.evaluateHandle(() => {
          const elem = document.querySelector('.alert__button');
          return elem;
        });
        await closeAlertBtn.click();
        if (fullPage && fullPage.click) {
          await fullPage.click();
          await page.waitForNavigation();
          console.log('test3');
        }
        const pdf = await page.pdf();
        return msg.reply('your file : ',
          new Attachment(pdf, fileName));
      } catch (e) {
        console.error('____');
        console.error((new Date()).toISOString());
        console.error(e);
      } finally {
        browser.close();
      }
    })();
  }
}

module.exports = Mediapart;
