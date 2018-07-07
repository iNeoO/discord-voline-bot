const Discord = require('discord.js');
const { memeCdnUrl, memeCdnNb } = require('../config.json');
const { download } = require('../helpers/download.js');

module.exports = {
  name: 'meme',
  description: 'Display a meme.',
  execute(message, args) {
    let memeNb = 0;
    if(!args.length) {
      memeNb = Math.floor((Math.random() * memeCdnNb) + 1);
    } else if (args[0] % 1 === 0 && parseInt(args[0], 10) <= memeCdnNb &&
      parseInt(args[0], 10) > 0) {
      memeNb = args[0];
    } else {
      memeNb = Math.floor((Math.random() * memeCdnNb) + 1);
    }
    download(`${memeCdnUrl}${memeNb}`, 'goulag.jpg', () => {
      return message.channel.send(`img ${memeNb}`, new Discord.Attachment('./goulag.jpg', 'goulag.jpg'));
    });
  },
};
