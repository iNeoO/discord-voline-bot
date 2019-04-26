const { displaySongs } = require('@helpers/song');
const { getters, setters } = require('@states/playList');


module.exports = (msg, index) => {
  if (!index.length || isNaN(index)) {
    return msg.reply('**Not valid index:** `!yt remove <Index>`');
  }
  const nb = parseInt(index, 10) - 1;
  if (msg.member.voiceChannel) {
    const length = getters.getNbPlayList();
    if (nb < length) {
      setters.remove(nb);
      msg.reply(displaySongs());
    } else {
      msg.reply(`Index is out of playList length : ${length}`);
    }
  } else {
    msg.reply('You need to join a voice channel first.');
  }
};
