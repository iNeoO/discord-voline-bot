const { adminIdRole } = require('../config.json');

module.exports = {
  isAuthorized: (message, tagNeededMsg, notAllowedMsg, callback) => {
    if (!message.mentions.users.size) {
      return message.reply(tagNeededMsg);
    }
    const author = message.member;
    const member = message.mentions.members.first();
    if(author.roles.has(adminIdRole)) {
      callback(member, author);
    } else {
      return message.reply(notAllowedMsg);
    }
  },
};
