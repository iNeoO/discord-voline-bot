const Discord = require('discord.js');

module.exports = {
  name: 'poll',
  description: 'Make a poll',
  execute(message, args) {

    const question = args.slice(0).join(' ');
    if (args.length === 0) {
      return message.reply('**Invalid Format:** `!poll <Question>`');
    }

    const embed = new Discord.RichEmbed()
      .setTitle('A Poll Has Been Started!')
      .setColor('#5599ff')
      .setDescription(`${question}`)
      .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`);

    message.channel.send({ embed });
    message.react('👍')
      .then(() => message.react('👎'))
      .then(() => message.react('🤷'))
      .catch(() => console.error('Emoji failed to react.'));
  },
};
