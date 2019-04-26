const { setters } = require('@states/playList');


module.exports = (msg) => {
  if (msg.member.voiceChannel) {
    setters.clear();
    msg.reply('PlayList is empty');
  } else {
    msg.reply('You need to join a voice channel first.');
  }
};
