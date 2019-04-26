const {
  Command,
} = require('discord.js-commando');
const {
  memeCdnUrl,
  memeCdnNb,
} = require('@/config.js');


class Meme extends Command {
  constructor(client) {
    super(client, {
      name: 'meme',
      group: 'fun',
      memberName: 'meme',
      description: 'Get a meme',
      examples: ['!meme <number>'],
      args: [
        {
          key: 'nb',
          prompt: '**Which meme do you want**\n',
          type: 'integer',
          default: 0,
        },
      ],
    });
  }

  run(msg, { nb }) {
    let memeNb = 0;
    if(nb
      && nb % 1 === 0
      && parseInt(nb, 10) <= memeCdnNb
      && parseInt(nb, 10) > 0) {
      memeNb = nb;
    } else {
      memeNb = Math.floor((Math.random() * memeCdnNb) + 1);
    }
    return msg.channel.send(`${memeCdnUrl}${memeNb}`);
  }
}

module.exports = Meme;
