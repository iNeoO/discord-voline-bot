const ytdl = require('ytdl-core');
const { displaySongs } = require('@helpers/song.js');
const { setters } = require('@states/playList');


module.exports = (msg, url) => {
  if (!url.length) {
    return msg.reply('**No url:** `!yt add <url>`');
  }
  if (msg.member.voiceChannel) {
    ytdl.getInfo(url).then((track) => {
      const song = {
        name: track.title,
        url: track.video_url,
        length: track.length_seconds,
        author: track.author.name,
        author_url: track.author.user_url,
      };
      setters.add(song);
      msg.reply(displaySongs());
    });
  } else {
    msg.reply('You need to join a voice channel first.');
  }
};
