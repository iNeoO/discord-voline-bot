const { getters } = require('@states/playList');

module.exports = {
  name: 'yt skip',
  description: 'Add a song to a playList',
  execute(message) {
    if (message.member.voiceChannel) {
      if (getters.getNbPlayList()) {
        const connection = getters.getConnection();
        if (connection) {
          console.log('skip');
          connection.dispatcher.end('Skip command has been used.');
        }
      } else {
        message.reply('Queue is empty');
      }
    } else {
      message.reply('You need to join a voice channel first.');
    }
  },
};
