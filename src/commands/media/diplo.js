const { Attachment } = require('discord.js');
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

// empty header not accepted by website
// https://github.com/GoogleChrome/puppeteer/issues/1755
// https://github.com/GoogleChrome/puppeteer/issues/665

class Diplo extends Command {
  constructor(client) {
    super(client, {
      name: 'diplo',
      group: 'media',
      memberName: 'diplo',
      description: 'Get a diplo article',
      examples: ['!diplo <url>'],
      args: [
        {
          key: 'url',
          prompt: '**Which article do you want**\n',
          type: 'string',
          validate: text => /^https:\/\/www.monde-diplomatique.fr*/.test(text),
        },
      ],
    });
  }

  run(msg, { url }) {
    (async () => {
      try {
        const embed = new RichEmbed()
          .setTitle('Diplo to PDF')
          .setDescription(`Converting ${url} to PDF.`)
          .setFooter('Please wait ...');
        msg.channel.send({ embed });

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        // https://github.com/GoogleChrome/puppeteer/issues/665
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3738.0 Safari/537.36');
        await page.goto(url);
        const button = await page.$('#session_connexion');
        await button.click();
        await page.waitForTimeout(1000);
        await page.type('input[name="email"]', login);
        await page.type('input[name="mot_de_passe"]', password);
        await page.$eval('#identification_sso', form => form.submit());
        await page.waitForTimeout(5000);
        const pdf = await page.pdf();
        await browser.close();
        return msg.reply('your file : ',
          new Attachment(pdf, 'diplo.pdf')).catch(e => msg.reply(e.message));
      } catch (e) {
        console.error('____');
        console.error((new Date()).toISOString());
        console.error(e);
      }
    })();
  }
}

module.exports = Diplo;
