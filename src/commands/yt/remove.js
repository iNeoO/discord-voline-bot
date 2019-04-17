const { displaySongs } = require('@helpers/song');
const { getters, setters } = require('@states/playList');

module.exports = {
  name: 'yt remove',
  description: 'remove a song to a playList',
  execute(message, args) {
    if (!args.length || isNaN(args[0])) {
      return message.reply('**Not valid index:** `!ytAdd <Number>`');
    }
    const index = parseInt(args[0], 10) - 1;
    if (message.member.voiceChannel) {
      const length = getters.getNbPlayList();
      if (index < length) {
        setters.remove(index);
        message.reply(displaySongs());
      } else {
        message.reply(`Index is out of playList length : ${length}`);
      }
    } else {
      message.reply('You need to join a voice channel first.');
    }
  },
};
