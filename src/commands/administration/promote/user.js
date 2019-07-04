const Discord = require('discord.js');
const {
  isAuthorized,
} = require('@helpers/permission.js');
const {
  moderatorIdRole,
  userIdRole,
  memberIdRole,
} = require('@/config.js');

module.exports = (msg, user) => {
  const author = msg.member;
  const roles = [moderatorIdRole, memberIdRole];
  isAuthorized(author, roles).then((err) => {
    if (!err) {
      setTimeout(() => {
        const memberRole = msg.guild.roles.get(userIdRole);
        user.addRole(memberRole).catch(console.error);
      }, 3000);
      return msg.channel.send(`<@${user.id}> has been promote member.`,
        new Discord.Attachment('./static/img/welcome-in.jpg', 'welcome-in.jpg'));
    } else {
      msg.reply('you are not allowed to promote anybody.');
    }
  }).catch((e) => {
    console.error(e);
    msg.reply('Something went wrong');
  });
};
