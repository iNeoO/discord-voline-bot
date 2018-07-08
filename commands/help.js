const { helpMessage } = require('../helpers/msg.js');

module.exports = {
  name: 'help',
  description: 'List commands',
  execute(message) {
    return message.channel.send(helpMessage);
  },
};
