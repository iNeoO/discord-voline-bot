const { getters } = require('@states/playList');


module.exports = (msg) => {
  if (msg.member.voiceChannel) {
    if (getters.getNbPlayList()) {
      const connection = getters.getConnection();
      if (connection) {
        connection.dispatcher.end('Skip command has been used.');
      }
    } else {
      msg.reply('Queue is empty');
    }
  } else {
    msg.reply('You need to join a voice channel first.');
  }
};
