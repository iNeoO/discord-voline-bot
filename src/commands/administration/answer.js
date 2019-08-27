const {
  Command,
} = require('discord.js-commando');
const {
  isAuthorized,
} = require('@helpers/permission.js');
const {
  moderatorIdRole,
  memberIdRole,
  conversationIdChannel,
} = require('@/config.js');

const helper = '**```!answer <@user> <message>```**';

class Answer extends Command {
  constructor(client) {
    super(client, {
      name: 'answer',
      group: 'administration',
      memberName: 'answer',
      description: 'Answer to someone by pm',
      examples: [helper],
      args: [
        {
          key: 'user',
          prompt: '**Which user do you want to send DM (@user) ?**',
          type: 'user',
        },
        {
          key: 'answer',
          prompt: '**Which answer do you want to use send ?**',
          type: 'string',
        },
      ],
    });
  }

  run(msg, { user, answer }) {
    if (conversationIdChannel !== msg.channel.id) {
      msg.reply('this message must be send to a specific channel');
      return;
    }
    const roles = [moderatorIdRole, memberIdRole];
    const { member } = msg;
    isAuthorized(member, roles).then((err) => {
      if (!err) {
        user.send(answer).catch(console.error);
      } else {
        msg.reply('**You don\'t have the right to execute this command**');
      }
    }).catch((e) => {
      console.error(e);
      msg.reply('Something went wrong');
    });
  }
}

module.exports = Answer;
