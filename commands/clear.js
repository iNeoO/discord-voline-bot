const {
  isAuthorized,
} = require('../helpers/permission.js');
const {
  moderatorIdRole,
} = require('../config.js');

module.exports = {
  name: 'clear',
  description: 'clear message from a channel',
  execute(message) {
    const notAllowedMsg = 'you are not allowed to execute this command';
    const roles = [moderatorIdRole];
    isAuthorized(message, '', notAllowedMsg, roles, () => {
      if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
            const messagesDeleted = messages.array().length;
          })
          .catch(err => {
            console.log('Error while doing Bulk Delete');
            console.log(err);
          });
      }
    });
  },
};
