const { help } = require('@helpers/msg.js');

module.exports = {
  name: 'hhelp',
  description: 'List commands',
  execute(message) {
    return message.channel.send(help);
  },
};
