const { displaySongs } = require('@helpers/song.js');


module.exports = (msg) => {
  if (msg.member.voiceChannel) {
    msg.reply(displaySongs());
  } else {
    msg.reply('You need to join a voice channel first.');
  }
};
