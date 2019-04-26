const {
  isAuthorized,
} = require('@helpers/permission.js');
const {
  moderatorIdRole,
  memberIdRole,
  actifIdRole,
  mediationIdRole,
} = require('@/config.js');

module.exports = (msg, user) => {
  const author = msg.member;
  const roles = [moderatorIdRole];
  isAuthorized(author, roles).then((err) => {
    if (!err) {
      const memberRole = msg.guild.roles.get(memberIdRole);
      const mediationRole = msg.guild.roles.get(mediationIdRole);
      const actifRole = msg.guild.roles.get(actifIdRole);
      user.removeRole(mediationRole).catch(console.error);
      user.addRole(memberRole).catch(console.error);
      user.addRole(actifRole).catch(console.error);
      return msg.send.channel(`<@${user.id}> has been promote actif.`);
    } else {
      msg.reply('you are not allowed to promote anybody.');
    }
  }).catch((e) => {
    console.log(e);
    msg.reply('Something went wrong');
  });
};
