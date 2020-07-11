const { Attachment } = require('discord.js');
const {
  isAuthorized,
} = require('@helpers/permission.js');
const {
  moderatorIdRole,
  userIdRole,
  memberIdRole,
  homeIdChannel,
} = require('@/config.js');
const Jimp = require('jimp');

module.exports = (msg, member) => {
  const author = msg.member;
  const roles = [moderatorIdRole, memberIdRole];
  isAuthorized(author, roles).then(async (err) => {
    if (!err) {
      setTimeout(() => {
        const memberRole = msg.guild.roles.get(userIdRole);
        member.addRole(memberRole).catch(console.error);
      }, 4000);
      return msg.guild.channels.get(homeIdChannel).send(`<@${member.id}> you have been promoted`);
    } else {
      msg.reply('you are not allowed to promote anybody.');
    }
  }).catch((e) => {
    console.error(e);
    msg.reply('Something went wrong');
  });
};
