const { adminIdRole } = require('../config.json');

module.exports = {
  name: 'promote',
  description: 'Tag a member and promote them. roleid 442374634902519808',
  execute(message) {
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to promote them!');
    }
    const author = message.member;
    const member = message.mentions.members.first();
    if(author.roles.has(adminIdRole)) {
      const exileRole = message.guild.roles.get(adminIdRole);
      member.addRole(exileRole).catch(console.error);
      return message.reply(`<@${member.id}> has been promoted !`);
    } else {
      return message.reply('you are not allowed to promote anybody');
    }
  },
};
