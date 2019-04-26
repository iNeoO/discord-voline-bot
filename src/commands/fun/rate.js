const {
  Command,
} = require('discord.js-commando');
const {
  RichEmbed,
} = require('discord.js');
const {
  rate,
} = require('@helpers/msg.js');

class Rate extends Command {
  constructor(client) {
    super(client, {
      name: 'rate',
      group: 'fun',
      memberName: 'rate',
      description: 'rate a thing',
      examples: ['!question <question>'],
      argsType: 'single',
      args: [
        {
          key: 'question',
          prompt: '**What do you want to rate**\n',
          type: 'string',
        },
      ],
    });
  }

  run(msg, { question }) {
    const random = Math.floor((Math.random() * 11));
    const embed = new RichEmbed()
      .setTitle(question)
      .setDescription(`i would say ${rate[random]} !`)
      .setColor('RANDOM')
      .setFooter(`Rate asked by: ${msg.author.username}`, `${msg.author.avatarURL}`);
    msg.channel.send({ embed });
  }
}

module.exports = Rate;
