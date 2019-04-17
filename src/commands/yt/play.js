const { playSong } = require('@helpers/song.js');
const { getters, setters } = require('@states/playList');

module.exports = {
  name: 'yt play',
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
      message.reply('You need to join a voice channel first.');
    }
  },
};
