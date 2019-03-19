const { memeCdnUrl, propagandeCdnNb } = require('../config.js');

module.exports = {
  name: 'propagande',
  description: 'Display propagande.',
  execute(message, args) {
    let memeNb = 0;
    if(!args.length) {
      memeNb = Math.floor((Math.random() * propagandeCdnNb) + 1);
    } else if (args[0] % 1 === 0 && parseInt(args[0], 10) <= propagandeCdnNb &&
      parseInt(args[0], 10) > 0) {
      memeNb = args[0];
    } else {
      memeNb = Math.floor((Math.random() * propagandeCdnNb) + 1);
    }
    return message.channel.send(`${memeCdnUrl}/propagande/${memeNb}`);
  },
};
