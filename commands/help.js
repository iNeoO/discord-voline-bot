const { helpMessage } = require('../helpers/helper.js');

module.exports = {
  name: 'help',
  description: 'List commands',
  execute(message) {
    return message.channel.send(helpMessage);
  },
};
