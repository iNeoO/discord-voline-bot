const {
  isAuthorized,
} = require('@helpers/permission.js');
const {
  moderatorIdRole,
} = require('@/config.js');

module.exports = {
  name: 'clear',
  description: 'clear message from a channel',
  execute(message) {
    const roles = [moderatorIdRole];
    const { member } = message;
    isAuthorized(member, roles).then(() => {
      if (message.channel.type == 'text') {
        message.channel.fetchMessages().then(messages => {
          message.channel.bulkDelete(messages);
        }).catch(err => {
          message.send.channel('Error while doing Bulk Delete');
          message.send.channel(`\`\`\`${err}\`\`\``);
        });
      }
    }).catch(err => {
      message.reply(err);
    });
  },
};
