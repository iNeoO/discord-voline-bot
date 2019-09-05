const {
  Command,
} = require('discord.js-commando');
const {
  moderatorIdRole,
  memberIdRole,
} = require('@/config.js');
const {
  isAuthorized,
} = require('@helpers/permission.js');
const mediationIsolation = require('./mediation/isolation');
const mediationMute = require('./mediation/mute');
const mediationSimple = require('./mediation/simple');

const helper = '**```!mediation <ban|isolation|mute|readonly|simple> <@user>```**';

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
          key: 'role',
          prompt: '**Which mediation do you want to use (isolation|mute|simple) ?**',
          type: 'string',
        },
        {
          key: 'user',
          prompt: '**Which user do you want to set in mediation (@user) ?**',
          type: 'user',
        },
      ],
    });
  }

  run(msg, { role }) {
    const roles = [moderatorIdRole, memberIdRole];
    const author = msg.member;
    isAuthorized(author, roles).then((err) => {
      if (!err) {
        const params = {
          isolation: mediationIsolation,
          mute: mediationMute,
          simple: mediationSimple,
        };
        if (role === 'help' || role === 'h') {
          msg.reply(helper);
        }
        const paramsKeys = Object.keys(params);
        const member = msg.mentions.members.first();
        const commandKey = paramsKeys.find(key => key === role);
        if (commandKey) {
          params[commandKey](msg, member);
        } else {
          msg.reply(helper);
        }
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
