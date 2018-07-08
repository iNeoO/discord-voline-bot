module.exports = {
  name: 'anthem',
  description: 'Join a vocal channel and sing anthem',
  execute(message) {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playFile('./static/mp3/soviet-anthem.mp3');
          dispatcher.on('end', () => {
            message.member.voiceChannel.leave();
          });
          dispatcher.on('error', console.error);
        })
        .catch(console.log);
    } else {
      message.reply('You need to join a voice channel first!');
    }
  },
};
