const {
  Command,
} = require('discord.js-commando');
const {
  memeCdnUrl,
  propagandeCdnNb,
} = require('@/config.js');


class Propagande extends Command {
  constructor(client) {
    super(client, {
      name: 'propagande',
      group: 'fun',
      memberName: 'propagande',
      description: 'Get a propagande img',
      examples: ['!propagande <number>'],
      args: [
        {
          key: 'nb',
          prompt: '**Which propagande img do you want**\n',
          type: 'integer',
          default: 0,
        },
      ],
    });
  }

  run(msg, { nb }) {
    let propagandeNb = 0;
    if(nb
      && nb % 1 === 0
      && parseInt(nb, 10) <= propagandeCdnNb
      && parseInt(nb, 10) > 0) {
      propagandeNb = nb;
    } else {
      propagandeNb = Math.floor((Math.random() * propagandeCdnNb) + 1);
    }
    return msg.channel.send(`${memeCdnUrl}/propagande/${propagandeNb}`);
  }
}

module.exports = Propagande;
