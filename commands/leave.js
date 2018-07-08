module.exports = {
  name: 'leave',
  description: 'Leave a vocal channel',
  execute(message) {
    message.member.voiceChannel.leave();
  },
};
