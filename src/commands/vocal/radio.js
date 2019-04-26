const {
  Command,
} = require('discord.js-commando');
const {
  setters,
  getters,
} = require('@states/playList');


class Radio extends Command {
  constructor(client) {
    super(client, {
      name: 'radio',
      group: 'vocal',
      memberName: 'radio',
      description: 'Make volin play a radio url',
      examples: ['!radio || !radio <url>'],
      args: [
        {
          key: 'radio',
          prompt: '**Which radio do you want to play ?**',
          type: 'string',
          default: 'http://163.172.94.169:8080/radiolib',
        },
      ],
    });
  }

  run(msg, { radio }) {
    if (msg.member.voiceChannel) {
      const connectionStore = getters.getConnection();
      if (connectionStore) {
        const dispatcher = connectionStore.playArbitraryInput(radio);
        dispatcher.on('error', (e) => {
          setters.setConnection();
          setters.clear();
          console.error(e);
        });
      } else {
        msg.member.voiceChannel.join()
          .then(connection => {
            const dispatcher = connection.playArbitraryInput(radio);
            dispatcher.on('error', (e) => {
              setters.setConnection();
              setters.clear();
              console.error(e);
            });
          })
          .catch(console.error);
      }
    } else {
      msg.reply('You need to join a voice channel first.');
    }
  }
}

exports.default = Radio;
