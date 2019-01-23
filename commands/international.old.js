module.exports = {
  name: 'international',
  description: 'Join a vocal channel and sing international',
  execute(message) {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playFile('./static/mp3/international.mp3');
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
