const { displaySongs } = require('../helpers/song.js');

module.exports = {
  name: 'ytList',
  description: 'Display list of songs',
  execute(message) {
    if (message.member.voiceChannel) {
      message.reply(displaySongs());
    } else {
      message.reply('You need to join a voice channel first!');
    }
  },
};
