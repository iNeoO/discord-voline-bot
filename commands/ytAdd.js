const ytdl = require('ytdl-core');
const { displaySongs } = require('../helpers/song.js');
const { setters } = require('../state/playList');

module.exports = {
  name: 'ytAdd',
  description: 'Add a song to a playList',
  execute(message, args) {
    if (!args.length) {
      return message.reply('**No url:** `!ytAdd <url>`');
    }
    if (message.member.voiceChannel) {
      ytdl.getInfo(args[0]).then((track) => {
        const song = {
          name: track.title,
          url: track.video_url,
          length: track.length_seconds,
          author: track.author.name,
          author_url: track.author.user_url,
        };
        setters.add(song);
        message.reply(displaySongs());
      });
    } else {
      message.reply('You need to join a voice channel first!');
    }
  },
};
