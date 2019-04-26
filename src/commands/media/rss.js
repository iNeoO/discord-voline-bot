const {
  Command,
} = require('discord.js-commando');
const { getRss } = require('@helpers/rss.js');

class Rss extends Command {
  constructor(client) {
    super(client, {
      name: 'rss',
      group: 'media',
      memberName: 'rss',
      description: 'detect if news on rss',
      examples: ['!rss'],
    });
  }

  run(msg) {
    (async () => {
      try {
        const articles = await getRss();
        let isEmpty = true;
        articles.forEach(text => {
          if(text.length) {
            isEmpty = false;
            msg.channel.send(text);
          }
        });
        if (isEmpty) {
          msg.reply('Sry no news atm');
        }
      } catch(e) {
        console.log(e);
        msg.reply('Something went wrong');
      }
    })();
  }
}

module.exports = Rss;
