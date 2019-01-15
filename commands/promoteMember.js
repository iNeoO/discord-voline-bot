const Discord = require('discord.js');
const { isAuthorized } = require('../helpers/permission.js');
const {
  moderatorIdRole,
  memberIdRole,
  annoncesIdChannel,
  actifIdRole,
  exileIdRole,
} = require('../config.json');

module.exports = {
  name: 'promoteMember',
  description: `Tag a member and promote them. roleid ${memberIdRole}`,
  execute(message, args) {
    const reason = args.slice(1).join(' ');
    const tagNeededMsg = 'you need to tag a user in order to promote them!';
    const notAllowedMsg = 'you are not allowed to promote anybody';
    const roles = [moderatorIdRole, actifIdRole];
    isAuthorized(message, tagNeededMsg, notAllowedMsg, roles, (member) => {
      const memberRole = message.guild.roles.get(memberIdRole);
      const exileRole = message.guild.roles.get(exileIdRole);
      member.removeRole(exileRole).catch(console.error);
      member.addRole(memberRole).catch(console.error);

      if (reason) {
        const embed = new Discord.RichEmbed()
          .setTitle('Promote log')
          .setColor('#5599ff')
          .setDescription(`${member.user.username} has been promote ! \n${reason}`)
          .setFooter(`Promote by: ${message.author.username}`, `${message.author.avatarURL}`);

        const channel = message.client.channels.find('id', annoncesIdChannel);
        channel.send({ embed });
      }

      return message.reply(`<@${member.id}> has been promoted !`,
        new Discord.Attachment('./static/img/welcome-in.jpg', 'welcome-in.jpg'),
      );
    });
  },
};
