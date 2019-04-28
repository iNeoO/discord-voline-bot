const {
  Command,
} = require('discord.js-commando');
const {
  RichEmbed,
} = require('discord.js');
const formating = require('@helpers/formating.js');


class Infos extends Command {
  constructor(client) {
    super(client, {
      name: 'infos',
      group: 'administration',
      memberName: 'infos',
      description: 'Get infos on an user or you',
      examples: ['!infos @volineBot'],
      args: [
        {
          key: 'user',
          prompt: '**Which user do you want**\n',
          type: 'user',
          default: '',
        },
      ],
    });
  }

  run(msg, { user }) {
    const { author } = msg;
    const member = msg.guild.member(user);

    const embed = new RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(user.avatarURL)
      .setTitle(`${user.username}#${user.discriminator}`)
      .setAuthor(author.username, author.avatarURL)
      .addField('ID:', `${user.id}`, true)
      .addField('Nickname:', `${member.nickname !== null ? `${member.nickname}` : 'None'}`, true)
      .addField('Created At:', formating.formatingDateTime(user.createdAt), true)
      .addField('Joined Server:', formating.formatingDateTime(member.joinedAt), true)
      .addField('Bot:', user.bot, true)
      .addField('Status:', user.presence.status, true)
      .addField('Game:', user.presence.game ? user.presence.game.name : 'None', true)
      .addField('Roles:', member.roles.map(roles => `${roles.name}`).join(', '), true);
    if (user.lastmsg) {
      embed.addBlankField()
        .addField('Derniermsg', user.lastmsg.content
          ? user.lastmsg.content
          : 'None')
        .addField('Date', user.lastmsg.createdTimestamp
          ? formating.formatingDateTime(user.lastmsg.createdTimestamp)
          : 'None');
    }
    embed.setFooter(`Replying to ${author.username}#${author.discriminator}`);
    msg.channel.send({ embed });
  }
}

module.exports = Infos;
