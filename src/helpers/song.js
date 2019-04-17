const ytdl = require('ytdl-core');
const { getters, setters } = require('@states/playList');

const getTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds - (mins * 60);
  return `${mins}m${secs}s`;
};

const playSong = (message, connection, songUrl) => {
  if (message.member.voiceChannel) {
    setters.setConnection(connection);
    const dispatcher = connection.playStream(ytdl(
      songUrl, { filter: 'audioonly' }), {
      passes: 5,
    });
    dispatcher.on('end', reason => {
      if (!message.member.voiceChannel
        || reason === 'Stream is not generating quickly enough.') {
        return;
      }
      if (!getters.getNbPlayList()) {
        setters.setConnection();
        setters.setPlayingSong();
        message.member.voiceChannel.leave();
      } else {
        const song = getters.shiftplayList();
        setters.setPlayingSong(song);
        const nextSongUrl = song.url;
        playSong(message, connection, nextSongUrl);
      }
    });
    dispatcher.on('error', (e) => {
      setters.setConnection();
      setters.setPlayingSong();
      setters.clear();
      if (message.member.voiceChannel) {
        message.member.voiceChannel.leave();
      }
      console.error(e);
    });
  }
};

const displaySongs = () => {
  let text = '';
  const playingSong = getters.getPlayingSong();
  if (playingSong) {
    text += '__***playing song***__\n\n';
    text += `**${playingSong.name}** - *${playingSong.author}* ${getTime(playingSong.length)} - <${playingSong.url}>\n\n`;
  }
  const songs = getters.getPlayList();
  if (songs.length) {
    let i = 1;
    text += '__***Song List***__\n\n';
    text += songs.map((song) => {
      return `${i++}. **${song.name}** - *${song.author}* ${getTime(song.length)} - <${song.url}>`;
    }).join('\n');
  }
  if (!text) {
    return 'Empty Song list and not playing youtube song';
  }
  return text;
};

module.exports = {
  playSong,
  displaySongs,
};
