const { adminIdRole } = require('../config.json');
const { exileIdRole } = require('../config.json');

module.exports = {
  name: 'exile',
  description: 'Tag a member and exile them. roleid 464733224627863552',
  execute(message) {
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to exile them!');
    }
    const author = message.member;
    const member = message.mentions.members.first();
    if(author.roles.has(adminIdRole)) {
      const roles = member._roles;
      for (let i = 0; i < roles.length; i += 1) {
        member.removeRole(roles[i]).catch(console.error);
      }
      const exileRole = message.guild.roles.get(exileIdRole);
      member.addRole(exileRole).catch(console.error);
      return message.reply(`<@${member.id}> has been exiled !`);
    } else {
      return message.reply('you are not allowed to exile anybody');
    }
  },
};
