const {
  Command,
} = require('discord.js-commando');
const {
  mediationIdRole,
  moderatorIdRole,
  memberIdRole,
} = require('@/config.js');
const {
  isAuthorized,
  isTargetAble,
} = require('@helpers/permission.js');

const helper = '**```!mediation <@user>```**';

class Mediation extends Command {
  constructor(client) {
    super(client, {
      name: 'mediation',
      group: 'administration',
      memberName: 'mediation',
      description: 'Set an user in mediation (need to be moderator or member)',
      examples: [helper],
      args: [
        {
          key: 'user',
          prompt: '**Which user do you want to put in mediation (@user) ?**',
          type: 'user',
        },
      ],
    });
  }

  run(msg, { user }) {
    const roles = [moderatorIdRole, memberIdRole];
    const author = msg.member;
    isAuthorized(author, roles).then((err) => {
      if (!err) {
        const mediationRole = msg.guild.roles.get(mediationIdRole);
        const target = msg.guild.member(user);
        isTargetAble(target).then((err) => {
          if (!err) {
            const hasRole = roles.find((role) => target.roles.has(role));
            if (hasRole) {
              target.removeRole(mediationRole).catch(console.error);
              const reponse = `mediation role removed for <@${user.id}>`;
              msg.channel.send(reponse);
            } else {
              target.addRole(mediationRole).catch(console.error);
              const reponse = `mediation role added for <@${user.id}>`;
              msg.channel.send(reponse);
            }
          }
        }).catch((e) => {
          console.error(e);
          msg.reply('Something went wrong');
        });
      } else {
        msg.reply('**You are not allowed to set anybody in mediation.**');
      }
    }).catch((e) => {
      console.error(e);
      msg.reply('Something went wrong');
    });
  }
}

exports.default = Mediation;
