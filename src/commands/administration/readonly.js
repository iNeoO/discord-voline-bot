const {
  Command,
} = require('discord.js-commando');
const {
  isAuthorized,
  isTargetAble,
} = require('@helpers/permission.js');
const { readOnly } = require('@helpers/store.js');
const {
  moderatorIdRole,
  memberIdRole,
  readonlyIdRole,
  userIdRole,
} = require('@/config.js');


class Readonly extends Command {
  constructor(client) {
    super(client, {
      name: 'readonly',
      group: 'administration',
      memberName: 'readonly',
      description: 'Set in readonly an user (need to be moderator or member)',
      examples: ['!readonly <nbDays> <@user>'],
      args: [
        {
          key: 'nbDays',
          prompt: '**Which number of days do you want to use ?**',
          type: 'integer',
        },
        {
          key: 'user',
          prompt: '**Which user do you want to readonly (@user) ?**',
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
            const readonlyRole = msg.guild.roles.get(readonlyIdRole);
            const userRole = msg.guild.roles.get(userIdRole);
            const hasRole = target.roles.has(readonlyRole);
            if (hasRole) {
              target.removeRole(readonlyRole).catch(console.error);
              target.addRole(userRole).catch(console.error);
              if (readOnly[user.id]) {
                clearTimeout(readOnly[user.id]);
                delete readOnly[user.id];
              }
            } else {
              target.addRole(readonlyRole).catch(console.error);
              target.removeRole(userRole).catch(console.error);
              readOnly[user.id] = setTimeout(() => {
                target.removeRole(readonlyRole).catch(console.error);
                target.addRole(userRole).catch(console.error);
                delete readOnly[user.id];
              }, nbDays * 24 * 3600);
            }
          } else {
            msg.reply('This user can\'t be readonly.');
          }
        }).catch((e) => {
          console.error(e);
          msg.reply('Something went wrong');
        });
      } else {
        msg.reply('you are not allowed to readonly anybody.');
      }
    }).catch((e) => {
      console.log(e);
      msg.reply('Something went wrong');
    });
  }
}

module.exports = Readonly;
