const Discord = require('discord.js');
const { mediationIdRole, moderatorIdRole, memberIdRole, actifIdRole, annoncesIdChannel } = require('../config.js');
const { isAuthorized } = require('../helpers/permission.js');

module.exports = {
  name: 'mediation',
  description: 'Tag a member and set him in mediation. roleid 464733224627863552',
  execute(message, args) {
    const reason = args.slice(1).join(' ');
    const tagNeededMsg = 'you need to tag a user in order to set in mediation them!';
    const notAllowedMsg = 'you are not allowed to set in mediation anybody';
    const roles = [moderatorIdRole, actifIdRole];
    isAuthorized(message, tagNeededMsg, notAllowedMsg, roles, (member) => {
      const rolesToRemove = [moderatorIdRole, memberIdRole, actifIdRole];
      for (let i = 0; i < rolesToRemove.length; i += 1) {
        const roleToRemove = message.guild.roles.get(rolesToRemove[i]);
        member.removeRole(roleToRemove).catch(console.error);
      }
      const mediationRole = message.guild.roles.get(mediationIdRole);
      setTimeout(() => {
        member.addRole(mediationRole).catch(console.error);
      }, 500);

      const embed = new Discord.RichEmbed()
        .setTitle('Exile log')
        .setColor('#5599ff')
        .setDescription(`${member.user.username} has set in mediation exiled ! \n${reason}`)
        .setFooter(`Exiled by: ${message.author.username}`, `${message.author.avatarURL}`);

      const channel = message.client.channels.find('id', annoncesIdChannel);
      channel.send({ embed });

      return message.reply(`<@${member.id}> has set in mediation !`);
    });
  },
};
