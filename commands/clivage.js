const Discord = require('discord.js');
const { memeCdnUrl } = require('../config.js');

module.exports = {
  name: 'clivage',
  description: 'return a random valor between 0 and 10',
  execute(message, args) {
    const question = args.slice(0).join(' ');
    const random = Math.round(Math.random());
    const answer = random ? ' sé de gôche' : ' sé de drouate';
    const color = random ? '#CD0000' : '#4169E1';
    const image = random ? 'goche' : 'drouate';
    const embed = new Discord.RichEmbed()
      .setTitle(`${question} ${answer}`)
      .setColor(color)
      .setImage(`${memeCdnUrl}${image}`);
    return message.channel.send({ embed });
  },
};
