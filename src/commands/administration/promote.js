const {
  Command,
} = require('discord.js-commando');
const promoteUser = require('./promote/user.js');
const promoteMember = require('./promote/member.js');


const helper = '**```!promote <user|member> <@user>```**';


class Promote extends Command {
  constructor(client) {
    super(client, {
      name: 'promote',
      group: 'administration',
      memberName: 'promote',
      description: 'Promote an user (need to be moderator or member for user and moderator for member)',
      examples: [helper],
      args: [
        {
          key: 'role',
          prompt: '**Which role do you want to use (user|member) ?**',
          type: 'string',
        },
        {
          key: 'user',
          prompt: '**Which user do you want to promote (@user) ?**',
          type: 'user',
        },
      ],
    });
  }

  run(msg, { role }) {
    const params = {
      user: promoteUser,
      member: promoteMember,
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
  }
}

exports.default = Promote;
