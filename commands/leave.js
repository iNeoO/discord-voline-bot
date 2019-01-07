module.exports = {
  name: 'leave',
  description: 'Leave a vocal channel',
  execute(message) {
    if (message.member && message.member.voiceChannel) {
      message.member.voiceChannel.leave();
    }
  },
};
