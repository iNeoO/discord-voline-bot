const { setters } = require('../state/playList');

module.exports = {
  name: 'ytClear',
  description: 'Display list of songs',
  execute(message) {
    if (message.member.voiceChannel) {
      setters.clear();
      message.reply('PlayList is empty');
    } else {
      message.reply('You need to join a voice channel first!');
    }
  },
};
