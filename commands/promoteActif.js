const Discord = require('discord.js');
const { isAuthorized } = require('../helpers/permission.js');
const {
  moderatorIdRole,
  actifIdRole,
  annoncesIdChannel,
  mediationIdRole,
} = require('../config.js');

module.exports = {
  name: 'promoteActif',
  description: `Tag a member and promote them. roleid ${actifIdRole}`,
  execute(message, args) {
    const reason = args.slice(1).join(' ');
    const tagNeededMsg = 'you need to tag a user in order to promote them!';
    const notAllowedMsg = 'you are not allowed to promote anybody';
    const roles = [moderatorIdRole];
    isAuthorized(message, tagNeededMsg, notAllowedMsg, roles, (member) => {
      const actifRole = message.guild.roles.get(actifIdRole);
      const mediationRole = message.guild.roles.get(mediationIdRole);
      member.removeRole(mediationRole).catch(console.error);
      member.addRole(actifRole).catch(console.error);

      if (reason) {
        const embed = new Discord.RichEmbed()
          .setTitle('Promote log')
          .setColor('#5599ff')
          .setDescription(`${member.user.username} has been promote ! \n${reason}`)
          .setFooter(`Promote by: ${message.author.username}`, `${message.author.avatarURL}`);

        const channel = message.client.channels.find('id', annoncesIdChannel);
        channel.send({ embed });
      }

      return message.reply(`<@${member.id}> has been promoted !`);
    });
  },
};
