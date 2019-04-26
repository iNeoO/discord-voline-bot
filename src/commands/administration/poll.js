const { RichEmbed } = require('discord.js');
const {
  Command,
} = require('discord.js-commando');
const {
  voteIdChannel,
  moderatorIdRole,
  actifIdRole,
} = require('@/config.js');
const {
  isAuthorized,
} = require('@helpers/permission.js');


const helper = '**```!poll <question>```**';
const emojiNeutral = '🤷';
const emojiUp = '👍';
const emojiDown = '👎';


class Poll extends Command {
  constructor(client) {
    super(client, {
      name: 'poll',
      group: 'administration',
      memberName: 'poll',
      description: 'Create a poll with yes/no/neutral (need to be moderator or actif)',
      examples: [helper],
      args: [
        {
          key: 'question',
          prompt: '**Which question do you want to ask ?**',
          type: 'string',
        },
      ],
    });
  }

  run(msg, { question }) {
    const roles = [moderatorIdRole, actifIdRole];
    const { member } = msg;
    isAuthorized(member, roles).then(() => {
      msg.delete();
      const embed = new RichEmbed()
        .setTitle('A Poll Has Been Started!')
        .setColor('#5599ff')
        .setDescription(question)
        .setFooter(`Poll Started By: ${msg.author.username}`, `${msg.author.avatarURL}`);

      const channel = msg.client.channels.find('id', voteIdChannel);
      channel.send({ embed }).then((messageAnswered) => {
        messageAnswered.react(emojiUp)
          .then(() => messageAnswered.react(emojiDown))
          .then(() => messageAnswered.react(emojiNeutral))
          .catch(() => messageAnswered.error('Emoji failed to react.'));
      });
    }).catch(() => {
      msg.reply('**You are not allowed to launch a poll.**');
    });
  }
}

exports.default = Poll;
