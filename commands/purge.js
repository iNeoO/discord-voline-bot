const { adminIdRole } = require('../config.json');

module.exports = {
  name: 'purge',
  description: 'Tag a member and purge them.',
  execute(message) {
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to purge them!');
    }
    const author = message.member;
    const member = message.mentions.members.first();
    if(author.roles.has(adminIdRole)) {
      member.kick();
      return message.reply(`<@${member.id}> has been purged !`);
    } else {
      return message.reply('you are not allowed to purge anybody');
    }
  },
};
