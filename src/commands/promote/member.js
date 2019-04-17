const Discord = require('discord.js');
const { isAuthorized } = require('../../helpers/permission.js');
const {
  moderatorIdRole,
  memberIdRole,
  actifIdRole,
  mediationIdRole,
} = require('../../../config.js');

module.exports = {
  name: 'member',
  description: 'Tag a user(s) and promote him/her/them to member',
  execute(message) {
    const author = message.member;
    const roles = [moderatorIdRole, actifIdRole];
    isAuthorized(author, roles).then(() => {
      const memberRole = message.guild.roles.get(memberIdRole);
      const mediationRole = message.guild.roles.get(mediationIdRole);
      const users = message.mentions.users.forEach(user => {
        user.removeRole(mediationRole).catch(console.error);
        user.addRole(memberRole).catch(console.error);
        return `<@${user.id}>`;
      });
      const reponse = `${users.joins(' ')} ${users.length
        ? 'have been'
        : 'has been'} promoted.`;
      return message.send.channel(reponse,
        new Discord.Attachment('./static/img/welcome-in.jpg', 'welcome-in.jpg'));
    }).catch(() => {
      message.reply('you are not allowed to promote anybody.');
    });
  },
};
