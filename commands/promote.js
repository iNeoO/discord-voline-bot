const Discord = require('discord.js');
const { isAuthorized } = require('../helpers/permission.js');
const { moderatorIdRole, memberIdRole, annoncesIdChannel } = require('../config.json');

module.exports = {
  name: 'promote',
  description: 'Tag a member and promote them. roleid 442374634902519808',
  execute(message) {
    const tagNeededMsg = 'you need to tag a user in order to promote them!';
    const notAllowedMsg = 'you are not allowed to promote anybody';
    const roles = [moderatorIdRole, memberIdRole];
    isAuthorized(message, tagNeededMsg, notAllowedMsg, roles, (member) => {
      const exileRole = message.guild.roles.get(memberIdRole);
      member.addRole(exileRole).catch(console.error);

      const embed = new Discord.RichEmbed()
        .setTitle('Promote log')
        .setColor('#5599ff')
        .setDescription(`${member.user.username} has been promote`)
        .setFooter(`Promote by: ${message.author.username}`, `${message.author.avatarURL}`);

      const channel = message.client.channels.find('id', annoncesIdChannel);
      channel.send({ embed });

      return message.reply(`<@${member.id}> has been promoted !`);
    });
  },
};
