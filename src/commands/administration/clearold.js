const {
  Command,
} = require('discord.js-commando');
const {
  isAuthorized,
} = require('@helpers/permission.js');
const {
  moderatorIdRole,
} = require('@/config.js');


class ClearOld extends Command {
  constructor(client) {
    super(client, {
      name: 'clearold',
      group: 'administration',
      memberName: 'clearold',
      description: 'Clean one by one all message in a channel (need to be moderator)',
      examples: ['!clearold'],
    });
  }

  run(msg) {
    const roles = [moderatorIdRole];
    const {
      member,
    } = msg;
    isAuthorized(member, roles).then((err) => {
      if (!err) {
        msg.channel.fetchMessages({
          limit: 50,
        }).then((msgCollection) => {
          msgCollection.forEach((message) => {
            message.delete();
          });
        }).catch((e) => {
          console.error(e);
          msg.reply('Something went wrong');
        });
      } else {
        msg.reply('**You don\'t have rights to execute this command**');
      }
    }).catch((e) => {
      console.error(e);
      msg.reply('Something went wrong');
    });
  }
}

module.exports = ClearOld;
