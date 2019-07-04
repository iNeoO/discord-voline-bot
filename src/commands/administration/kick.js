const {
  Attachment,
} = require('discord.js');
const {
  Command,
} = require('discord.js-commando');
const {
  isAuthorized,
  isTargetAble,
} = require('@helpers/permission.js');
const {
  moderatorIdRole,
  memberIdRole,
} = require('@/config.js');


class Kick extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'administration',
      memberName: 'kick',
      description: 'Kick an user (need to be moderator or member)',
      examples: ['!kick <@user>'],
      args: [
        {
          key: 'user',
          prompt: '**Which user do you want to kick (@user) ?**',
          type: 'user',
        },
      ],
    });
  }

  run(msg, { user }) {
    const roles = [
      moderatorIdRole,
      memberIdRole,
    ];
    const author = msg.member;
    isAuthorized(author, roles).then((err) => {
      const guardRoles = [
        moderatorIdRole,
        memberIdRole,
      ];
      if (!err) {
        const target = msg.guild.member(user);
        isTargetAble(target, guardRoles).then((err) => {
          if (!err) {
            setTimeout(() => {
              target.kick();
              return msg.reply(`<@${target.id}> has been kicked !`);
            }, 5000);
            msg.channel.send(`<@${target.id}>`,
              new Attachment('../static/img/block.jpg', 'block.jpg'));
          } else {
            msg.reply('This user can\'t be kicked.');
          }
        }).catch((e) => {
          console.error(e);
          msg.reply('Something went wrong');
        });
      } else {
        msg.reply('you are not allowed to kick anybody.');
      }
    }).catch((e) => {
      console.log(e);
      msg.reply('Something went wrong');
    });
  }
}

module.exports = Kick;
