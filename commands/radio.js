const { playSong } = require('../helpers/song');
const { getters, setters } = require('../state/playList');

module.exports = {
  name: 'radio',
  description: 'Join a vocal channel and play radio libertaire',
  execute(message, args) {
    let radio = 'http://163.172.94.169:8080/radiolib';
    if (args.length) {
      radio = args[0];
    }
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playArbitraryInput(radio);
          dispatcher.on('end', () => {
            if (message.member.voiceChannel) {
              return;
            }
            if (!getters.getNbPlayList()) {
              setters.setConnection();
              setters.setPlayingSong();
              message.member.voiceChannel.leave();
            } else {
              const nextSongUrl = getters.shiftplayList().url;
              playSong(message, connection, nextSongUrl);
            }
          });
          dispatcher.on('error', (e) => {
            setters.setConnection();
            setters.clear();
            console.error(e);
          });
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  },
};
