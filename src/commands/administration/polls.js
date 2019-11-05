const Discord = require('discord.js');
const {
  Command,
} = require('discord.js-commando');
const {
  voteIdChannel,
  moderatorIdRole,
  memberIdRole,
} = require('@/config.js');
const {
  isAuthorized,
} = require('@helpers/permission.js');


const helper = '**```!polls <question> -- <answer 1> -- <answer 2> -- <answer 3>```**';
const emojiChoices = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟'];
const emojiNeutral = '🤷';


class Polls extends Command {
  constructor(client) {
    super(client, {
      name: 'polls',
      group: 'administration',
      memberName: 'polls',
      description: 'Create a poll with multiple reponse (need to be moderator or member)',
      examples: [helper],
      argsType: 'single',
      args: [
        {
          key: 'polls',
          prompt: '**Which poll do you want to create ?**\n**'
            + '```!polls <question> -- <answer 1> -- <answer 2> -- <answer 3>```**\n',
          type: 'string',
        },
      ],
    });
  }

  run(msg, { polls }) {
    const roles = [moderatorIdRole, memberIdRole];
    const { member } = msg;
    isAuthorized(member, roles).then((err) => {
      if (!err) {
        const choiceArray = polls.split('--');
        const question = choiceArray.shift();
        if (choiceArray.length <= 2) {
          return msg.reply(`**You need to have at least 3 choices**\n${helper}`);
        }
        if (choiceArray.length > 10) {
          return msg.reply('**Invalid number of answers (Max is 10)**');
        }
        const response = choiceArray.reduce(
          (acc, choice, i) => `${acc}${i + 1} : ${choice} \n`,
          `${question} \n\n`,
        );
        msg.delete();
        const embed = new Discord.RichEmbed()
          .setTitle('A Poll Has Been Started!')
          .setColor('#5599ff')
          .setDescription(response)
          .setFooter(`Poll Started By: ${msg.author.username}`, `${msg.author.avatarURL}`);
        const channel = msg.client.channels.find('id', voteIdChannel);
        channel.send({ embed }).then(async (messageAnswered) => {
          const reactionArray = [];
          for (let i = 0; i < choiceArray.length; i++) {
            reactionArray[i] = await messageAnswered.react(emojiChoices[i]);
          }
          reactionArray.push(await messageAnswered.react(emojiNeutral));
        });
      } else {
        msg.reply('**You are not allowed to launch a poll.**');
      }
    }).catch((e) => {
      console.error(e);
      msg.reply('Something went wrong');
    });
  }
}

exports.default = Polls;
