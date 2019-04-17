const {
  mediationIdRole,
  moderatorIdRole,
  memberIdRole,
  actifIdRole,
} = require('@/config.js');
const { isAuthorized } = require('@helpers/permission.js');

module.exports = {
  name: 'mediation',
  description: 'Tag a member and set him in mediation. roleid mediation',
  execute(message) {
    const roles = [moderatorIdRole, actifIdRole];
    const author = message.member;
    isAuthorized(author, roles).then(async () => {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag a user in order to set him in mediation.');
      }
      const guardRoles = [
        moderatorIdRole,
      ];
      const memberRole = message.guild.roles.get(memberIdRole);
      const mediationRole = message.guild.roles.get(mediationIdRole);
      const actifRole = message.guild.roles.get(actifIdRole);
      message.mentions.users.forEach(user => {
        isAuthorized(user, guardRoles).then(() => {
          user.removeRole(memberRole).catch(console.error);
          user.removeRole(actifRole).catch(console.error);
          user.addRole(mediationRole).catch(console.error);
          const reponse = `<@${user.id}> has been set in mediation.`;
          message.send.channel(reponse);
        }).catch(() => {
          message.reply(`<@${user.id}> can't be set in mediation.`);
        });
      });
    }).catch(() => {
      message.reply('You are not allowed to set anybody in mediation.');
    });
  },
};
