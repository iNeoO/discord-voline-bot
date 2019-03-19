const { getRss } = require('../helpers/rss.js');

module.exports = {
  name: 'rss',
  description: 'detect if news on rss',
  execute(message) {
    (async () => {
      try {
        const articles = await getRss();
        let isEmpty = true;
        articles.forEach(text => {
          if(text.length) {
            isEmpty = false;
            message.channel.send(text);
          }
        });
        if (isEmpty) {
          message.reply('Sry no news atm');
        }
      } catch(e) {
        console.log(e);
        message.reply('Something went wrong');
      }
    })();
  },
};
