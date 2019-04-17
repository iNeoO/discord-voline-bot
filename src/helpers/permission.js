const { adminIds } = require('@/config.js');

module.exports = {
  isAuthorized: (message, tagNeededMsg, notAllowedMsg, roles, callback) => {
    if (tagNeededMsg && !message.mentions.users.size) {
      return message.reply(tagNeededMsg);
    }
    const author = message.member;
    const member = message.mentions.members.first();
    let hasRole = false;
    for (let i = 0; i < roles.length; i += 1) {
      if(author.roles.has(roles[i])) {
        hasRole = true;
        break;
      }
    }
    if(hasRole || adminIds.indexOf(author.id) !== -1) {
      callback(member, author);
    } else {
      return message.reply(notAllowedMsg);
    }
  },
};

module.exports = {
  isAuthorized(member, roles) {
    return new Promise((resolve, reject) => {
      const hasRole = roles.find((role) => member.roles.has(role));
      if (hasRole || adminIds.contains(member.id)) {
        return resolve();
      }
      return reject('You are not allowed to execute this command');
    });
  },
};
