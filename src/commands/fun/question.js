const {
  Command,
} = require('discord.js-commando');
const {
  RichEmbed,
} = require('discord.js');

class Question extends Command {
  constructor(client) {
    super(client, {
      name: 'q',
      group: 'fun',
      memberName: 'q',
      description: 'Answer to a question',
      examples: ['!question <question>'],
      argsType: 'single',
      args: [
        {
          key: 'question',
          prompt: '**What question do you want to ask**\n',
          type: 'string',
        },
      ],
    });
  }

  run(msg, { question }) {
    const random = Math.round(Math.random());
    const answer = random ? ' i would say yes !' : ' i would say no !';
    const embed = new RichEmbed()
      .setTitle(question)
      .setDescription(answer)
      .setColor('RANDOM')
      .setFooter(`question asked by: ${msg.author.username}`, `${msg.author.avatarURL}`);
    msg.channel.send({ embed });
  }
}

module.exports = Question;
