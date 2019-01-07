module.exports = {
  name: 'radio',
  description: 'Join a vocal channel and play radio libertaire',
  execute(message, args) {
    let radio = 'http://163.172.94.169:8080/radiolib';
    if (args.length) {
      radio = args[0];
    }
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => {
          const dispatcher = connection.playArbitraryInput(radio);
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
