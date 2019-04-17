const { isAuthorized } = require('../../helpers/permission.js');
const {
  moderatorIdRole,
  memberIdRole,
  actifIdRole,
  mediationIdRole,
} = require('../../../config.js');

module.exports = {
  name: 'actif',
  description: 'Tag a user(s) and promote him/her/them to actif',
  execute(message) {
    const author = message.member;
    const roles = [moderatorIdRole];
    isAuthorized(author, roles).then(() => {
      const memberRole = message.guild.roles.get(memberIdRole);
      const mediationRole = message.guild.roles.get(mediationIdRole);
      const actifRole = message.guild.roles.get(actifIdRole);
      const users = message.mentions.users.forEach(user => {
        user.removeRole(mediationRole).catch(console.error);
        user.addRole(memberRole).catch(console.error);
        user.addRole(actifRole).catch(console.error);
        return `<@${user.id}>`;
      });
      const reponse = `${users.joins(' ')} ${users.length
        ? 'have been'
        : 'has been'} promote actif.`;
      return message.send.channel(reponse);
    }).catch(() => {
      message.reply('you are not allowed to promote anybody.');
    });
  },
};
