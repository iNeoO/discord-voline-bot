const Discord = require('discord.js');
const { moderatorIdRole, memberIdRole } = require('../config.json');
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
        return message.reply(`<@${member.id}> has been purged !`);
      }, 5000);
      message.channel.send(`<@${member.id}>`,
        new Discord.Attachment('./static/img/purge.png', 'purge.png'));
    });
  },
};
