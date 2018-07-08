const { exileIdRole } = require('../config.json');
const { isAuthorized } = require('../helpers/permission.js');

module.exports = {
  name: 'exile',
  description: 'Tag a member and exile them. roleid 464733224627863552',
  execute(message) {
    const tagNeededMsg = 'you need to tag a user in order to exile them!';
    const notAllowedMsg = 'you are not allowed to exile anybody';
    isAuthorized(message, tagNeededMsg, notAllowedMsg, (member) => {
      const roles = member._roles;
      for (let i = 0; i < roles.length; i += 1) {
        member.removeRole(roles[i]).catch(console.error);
      }
      const exileRole = message.guild.roles.get(exileIdRole);
      setTimeout(() => {
        member.addRole(exileRole).catch(console.error);
      }, 500);
      return message.reply(`<@${member.id}> has been exiled !`);
    });
  },
};
