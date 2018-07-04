module.exports = {
  name: 'purge',
  description: 'Tag a member and kick them.',
  execute(message) {
    if (!message.mentions.users.size) {
      return message.reply('you need to tag a user in order to kick them!');
    }

    const member = message.mentions.members.first();
    member.kick();
  },
};
