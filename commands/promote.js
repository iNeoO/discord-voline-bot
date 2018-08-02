const { isAuthorized } = require('../helpers/permission.js');
const { adminIdRole } = require('../config.json');

module.exports = {
  name: 'promote',
  description: 'Tag a member and promote them. roleid 442374634902519808',
  execute(message) {
    const tagNeededMsg = 'you need to tag a user in order to promote them!';
    const notAllowedMsg = 'you are not allowed to promote anybody';
    const roles = [adminIdRole];
    isAuthorized(message, tagNeededMsg, notAllowedMsg, roles, (member) => {
      const exileRole = message.guild.roles.get(adminIdRole);
      member.addRole(exileRole).catch(console.error);
      return message.reply(`<@${member.id}> has been promoted !`);
    });
  },
};
