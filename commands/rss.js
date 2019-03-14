const { getRss } = require('../helpers/rss.js');

module.exports = {
  name: 'rss',
  description: 'detect if news on rss',
  execute(message) {
    (async () => {
      try {
        const texts = await getRss();
        if (texts.length) {
          texts.forEach(text => message.channel.send(text));
        } else {
          message.reply('Sry no news atm');
        }
      } catch(e) {
        console.log(e);
        message.reply('Something went wrong');
      }
    })();
  },
};
