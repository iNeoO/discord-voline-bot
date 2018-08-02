module.exports = {
  isAuthorized: (message, tagNeededMsg, notAllowedMsg, roles, callback) => {
    if (!message.mentions.users.size) {
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
    if(hasRole) {
      callback(member, author);
    } else {
      return message.reply(notAllowedMsg);
    }
  },
};
