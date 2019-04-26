const { setters } = require('@states/playList');
const {
  Command,
} = require('discord.js-commando');


class Asi extends Command {
  constructor(client) {
    super(client, {
      name: 'leave',
      group: 'vocal',
      memberName: 'leave',
      description: 'leave vocal and clean all',
      examples: ['!leave'],
    });
  }

  run(msg) {
    if (msg.member && msg.member.voiceChannel) {
      setters.clear();
      setters.setConnection();
      msg.member.voiceChannel.leave();
    }
  }
}

module.exports = Asi;
