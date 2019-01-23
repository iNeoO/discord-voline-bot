const { getters, setters } = require('../state/playList');
const { playSong } = require('../helpers/song');

module.exports = {
  name: 'yt',
  description: 'Play a yt video',
  execute(message, args) {
    if (!args.length && !getters.getNbPlayList()) {
      return message.reply('**No url or playList:** `!yt <url> || !ytAdd <url> && !yt`');
    }
    let url = '';
    if (args[0]) {
      url = args[0];
    } else {
      const song = getters.shiftplayList();
      setters.setPlayingSong(song);
      url = song.url;
    }
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => {
          playSong(message, connection, url);
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  },
};
