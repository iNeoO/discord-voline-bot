const Discord = require('discord.js');
const formating = require('@helpers/formating');

module.exports = {
  name: 'infos',
  description: 'get infos on an user',
  execute(message) {
    let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
      user = message.author;
    }
    const { author } = message;
    const member = message.guild.member(user);

    const embed = new Discord.RichEmbed()
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
    if (user.lastMessage) {
      embed.addBlankField()
        .addField('DernierMessage', user.lastMessage.content
          ? user.lastMessage.content
          : 'None')
        .addField('Date', user.lastMessage.createdTimestamp
          ? formating.formatingDateTime(user.lastMessage.createdTimestamp)
          : 'None');
    }
    embed.setFooter(`Replying to ${author.username}#${author.discriminator}`);
    message.channel.send({ embed });
  },
};
