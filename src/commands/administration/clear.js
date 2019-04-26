const {
  Command,
} = require('discord.js-commando');
const {
  isAuthorized,
} = require('@helpers/permission.js');
const {
  moderatorIdRole,
} = require('@/config.js');


class Clear extends Command {
  constructor(client) {
    super(client, {
      name: 'clear',
      group: 'administration',
      memberName: 'clear',
      description: 'Clean message in a channel (need to be moderator)',
      examples: ['!clear'],
    });
  }

  run(msg) {
    const roles = [moderatorIdRole];
    const { member } = msg;
    isAuthorized(member, roles).then(() => {
      if (msg.channel.type == 'text') {
        msg.channel.fetchMessages().then(messages => {
          msg.channel.bulkDelete(messages);
        }).catch(err => {
          msg.send.channel('Error while doing Bulk Delete');
          msg.send.channel(`\`\`\`${err}\`\`\``);
        });
      }
    }).catch(() => {
      msg.reply('**You don\'t have rights to execute this command**');
    });
  }
}

module.exports = Clear;
