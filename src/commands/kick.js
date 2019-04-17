const Discord = require('discord.js');
const {
  moderatorIdRole,
} = require('@/config.js');
const { isAuthorized } = require('@helpers/permission.js');

module.exports = {
  name: 'kick',
  description: 'Tag a member and kick him.',
  execute(message) {
    const roles = [
      moderatorIdRole,
    ];
    const author = message.member;
    isAuthorized(author, roles).then(() => {
      if (!message.mentions.users.size) {
        return message.reply('You need to tag an user in order to kick him.');
      }
      const guardRoles = [
        moderatorIdRole,
      ];
      const { target } = message.mentions.members.first();
      isAuthorized(target, guardRoles).then(() => {
        setTimeout(() => {
          target.kick();
          return message.reply(`<@${target.id}> has been kicked !`);
        }, 5000);
        message.channel.send(`<@${target.id}>`,
          new Discord.Attachment('../static/img/block.jpg', 'block.jpg'));
      }).catch(() => {
        message.reply('This user can\'t be kicked.');
      });
    }).catch(() => {
      message.reply('you are not allowed to kick anybody.');
    });
  },
};
