const Discord = require('discord.js');
const { memeCdnUrl, propagandeCdnNb } = require('../config.json');
const { download } = require('../helpers/download.js');

module.exports = {
  name: 'propagande',
  description: 'Display propagande.',
  execute(message, args) {
    let memeNb = 0;
    if(!args.length) {
      memeNb = Math.floor((Math.random() * propagandeCdnNb) + 1);
    } else if (args[0] % 1 === 0 && parseInt(args[0], 10) <= propagandeCdnNb) {
      memeNb = args[0];
    } else {
      memeNb = Math.floor((Math.random() * propagandeCdnNb) + 1);
    }
    download(`${memeCdnUrl}/propagande/${memeNb}`, 'propagande.jpg', () => {
      return message.channel.send(`img ${memeNb}`, new Discord.Attachment('./propagande.jpg', 'propagande.jpg'));
    });
  },
};
