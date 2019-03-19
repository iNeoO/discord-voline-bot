const Discord = require('discord.js');
const { voteIdChannel, moderatorIdRole, actifIdRole } = require('../config.js');
const { isAuthorized } = require('../helpers/permission.js');


module.exports = {
  name: 'poll',
  description: 'Make a poll',
  execute(message, args) {

    const tagNeededMsg = '';
    const notAllowedMsg = 'you are not allowed to launch a vote';
    const roles = [moderatorIdRole, actifIdRole];
    isAuthorized(message, tagNeededMsg, notAllowedMsg, roles, () => {
      const question = args.slice(0).join(' ');
      if (args.length === 0) {
        return message.reply('**Invalid Format:** `!poll <Question>`');
      }

      const embed = new Discord.RichEmbed()
        .setTitle('A Poll Has Been Started!')
        .setColor('#5599ff')
        .setDescription(`${question}`)
        .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`);

      const channel = message.client.channels.find('id', voteIdChannel);
      channel.send({ embed }).then((messageAnswered) => {
        messageAnswered.react('👍')
          .then(() => messageAnswered.react('👎'))
          .then(() => messageAnswered.react('🤷'))
          .catch(() => messageAnswered.error('Emoji failed to react.'));
      });
    });
  },
};
