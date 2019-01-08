const ytdl = require('ytdl-core');

module.exports = {
  name: 'yt',
  description: 'Play a yt video',
  execute(message, args) {
    if (!args.length) {
      return message.reply('**No url:** `!yt <url>`');
    }
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playArbitraryInput(ytdl(
            args[0], { filter: 'audioonly' }), {
            passes: 5,
          });
          dispatcher.on('end', () => {
            if (message.member.voiceChannel) {
              message.member.voiceChannel.leave();
            }
          });
          dispatcher.on('error', console.error);
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  },
};
