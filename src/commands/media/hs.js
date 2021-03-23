const {
  Command,
} = require('discord.js-commando');
const puppeteer = require('puppeteer');
const {
  RichEmbed,
} = require('discord.js');
const {
  login,
  password,
} = require('@/config.js');


class Hs extends Command {
  constructor(client) {
    super(client, {
      name: 'hs',
      group: 'media',
      memberName: 'hs',
      description: 'Get a hs emission',
      examples: ['!hs <url>'],
      args: [
        {
          key: 'url',
          prompt: '**Which emission do you want**\n',
          type: 'string',
          validate: text => /^https:\/\/www.hors-serie.net*/.test(text),
        },
      ],
    });
  }

  run(msg, { url }) {
    (async () => {
      try {
        const embed = new RichEmbed()
          .setTitle('HS to mp3/video')
          .setDescription(`Getting ${url} to mp3/video.`)
          .setFooter('Please wait ...');
        msg.channel.send({ embed });

        const browser = await puppeteer.launch();
        const page = await browser.newPage({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        await page.goto('https://www.hors-serie.net/connexion.php');
        await page.waitForSelector('#contact_form', { visible: true });
        await page.type('#contact_form input[name=mail]', login);
        await page.type('#contact_form input[name=pass]', password);
        const loginButton = await page.evaluateHandle(() => {
          return document.querySelector('#contact_form input[type=submit]');
        });
        await loginButton.click();
        await page.waitForTimeout(1000);
        await page.goto(url);
        await page.waitForSelector('.emi-infos', { visible: true });
        const files = await page.evaluate(() => {
          const infos = document.querySelectorAll('.emi-infos a');
          const video = infos[0];
          const mp3 = infos[1];
          if (mp3 && video) {
            return { mp3: mp3.href, video: video.href };
          }
          return null;
        });
        if (files) {
          // await browser.close();
          return msg.reply(`\n- mp3: ${files.mp3}\n- video: ${files.video}`);
        } else {
          // await browser.close();
          return msg.reply('No url find for download mp3/video on the page');
        }
      } catch (e) {
        console.error('____');
        console.error((new Date()).toISOString());
        console.error(e);
      }
    })();
  }
}

module.exports = Hs;
