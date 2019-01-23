const { setters } = require('../state/playList');

module.exports = {
  name: 'leave',
  description: 'Leave a vocal channel',
  execute(message) {
    if (message.member && message.member.voiceChannel) {
      setters.clear();
      setters.setConnection();
      message.member.voiceChannel.leave();
    }
  },
};
