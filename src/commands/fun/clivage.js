const {
  Command,
} = require('discord.js-commando');
const {
  RichEmbed,
} = require('discord.js');
const {
  memeCdnUrl,
} = require('@/config.js');


class Clivage extends Command {
  constructor(client) {
    super(client, {
      name: 'clivage',
      group: 'fun',
      memberName: 'clivage',
      description: 'Get a clivage for a thing',
      examples: ['!clivage <question>'],
      argsType: 'single',
      args: [
        {
          key: 'question',
          prompt: '**Which things do you want to ask for clivage**\n',
          type: 'string',
        },
      ],
    });
  }

  run(msg, { question }) {
    const random = Math.round(Math.random());
    const answer = random ? ' sé de gôche' : ' sé de drouate';
    const color = random ? '#CD0000' : '#4169E1';
    const image = random ? 'goche' : 'drouate';
    const embed = new RichEmbed()
      .setTitle(`${question} ${answer}`)
      .setColor(color)
      .setImage(`${memeCdnUrl}${image}`)
      .setFooter(`Rate asked by: ${msg.author.username}`, `${msg.author.avatarURL || 'https://www.allo-image.net/stockimg/upload/7754021925bb4bd8d07bc9kisspng_computer_icons_discord_logo_smiley_emoticon_avatar_na_discord_5b4b6f179eb511.3695532315316702956501.jpg'}`);
    return msg.channel.send({ embed });
  }
}

module.exports = Clivage;
