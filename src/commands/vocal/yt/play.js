const { playSong } = require('@helpers/song.js');
const { getters, setters } = require('@states/playList');


module.exports = (msg, url) => {
  if (!url.length && !getters.getNbPlayList()) {
    return msg.reply('**No url or playList:** `!yt play <url> || !yt add <url> && !yt play`');
  }
  let urlSong = '';
  if (url) {
    urlSong = url;
  } else {
    const song = getters.shiftplayList();
    setters.setPlayingSong(song);
    urlSong = song.url;
  }
  if (msg.member.voiceChannel) {
    const connectionStore = getters.getConnection();
    if (connectionStore) {
      playSong(msg, connectionStore, urlSong);
    } else {
      msg.member.voiceChannel.join()
        .then(connection => {
          playSong(msg, connection, urlSong);
        })
        .catch(console.error);
    }
  } else {
    msg.reply('You need to join a voice channel first.');
  }
};
