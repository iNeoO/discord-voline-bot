const Discord = require('discord.js');
const { moderatorIdRole, memberIdRole, annoncesIdChannel } = require('../config.json');
const { isAuthorized } = require('../helpers/permission.js');

module.exports = {
  name: 'purge',
  description: 'Tag a member and purge them.',
  execute(message) {
    const tagNeededMsg = 'you need to tag a user in order to purge them!';
    const notAllowedMsg = 'you are not allowed to purge anybody';
    const roles = [moderatorIdRole, memberIdRole];
    isAuthorized(message, tagNeededMsg, notAllowedMsg, roles, (member) => {
      setTimeout(() => {
        member.kick();

        const embed = new Discord.RichEmbed()
          .setTitle('Exile log')
          .setColor('#5599ff')
          .setDescription(`${member.user.username} has been purged`)
          .setFooter(`Purged by: ${message.author.username}`, `${message.author.avatarURL}`);

        const channel = message.client.channels.find('id', annoncesIdChannel);
        channel.send({ embed });

        return message.reply(`<@${member.id}> has been purged !`);
      }, 5000);
      message.channel.send(`<@${member.id}>`,
        new Discord.Attachment('./static/img/purge.png', 'purge.png'));
    });
  },
};
