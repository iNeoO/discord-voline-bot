const {
  Command,
} = require('discord.js-commando');
const {
  isAuthorized,
  isTargetAble,
} = require('@helpers/permission.js');
const { ban } = require('@helpers/store.js');
const {
  moderatorIdRole,
  memberIdRole,
  banIdRole,
  userIdRole,
} = require('@/config.js');


class Ban extends Command {
  constructor(client) {
    super(client, {
      name: 'ban',
      group: 'administration',
      memberName: 'ban',
      description: 'Set in ban an user (need to be moderator or member)',
      examples: ['!ban <nbDays> <@user>'],
      args: [
        {
          key: 'nbDays',
          prompt: '**Which number of days do you want to use ?**',
          type: 'integer',
        },
        {
          key: 'user',
          prompt: '**Which user do you want to ban (@user) ?**',
          type: 'user',
        },
      ],
    });
  }

  run(msg, { user, nbDays }) {
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
        const target = msg.mentions.members.first();
        isTargetAble(target, guardRoles).then((err) => {
          if (!err) {
            const banRole = msg.guild.roles.get(banIdRole);
            const userRole = msg.guild.roles.get(userIdRole);
            const hasRole = target.roles.has(banRole);
            if (hasRole) {
              target.removeRole(banRole).catch(console.error);
              target.addRole(userRole).catch(console.error);
              if (ban[user.id]) {
                clearTimeout(ban[user.id]);
                delete ban[user.id];
              }
            } else {
              target.addRole(banRole).catch(console.error);
              target.removeRole(userRole).catch(console.error);
              ban[user.id] = setTimeout(() => {
                target.removeRole(banRole).catch(console.error);
                target.addRole(userRole).catch(console.error);
                delete ban[user.id];
              }, nbDays * 24 * 3600);
            }
          } else {
            msg.reply('This user can\'t be banned.');
          }
        }).catch((e) => {
          console.error(e);
          msg.reply('Something went wrong');
        });
      } else {
        msg.reply('you are not allowed to ban anybody.');
      }
    }).catch((e) => {
      console.log(e);
      msg.reply('Something went wrong');
    });
  }
}

module.exports = Ban;
