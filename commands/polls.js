const Discord = require('discord.js');
const { voteIdChannel } = require('../config.json');

module.exports = {
  name: 'polls',
  description: 'Make a poll with multiple answers',
  execute(message, args) {

    const questionArray = args.slice(0).join(' ').split('--');
    if (questionArray.length <= 3) {
      return message.reply('**Invalid Format:** `!polls <Question> -- answer 1 -- answer 2 -- answer 3`');
    }
    if (questionArray.length > 11) {
      return message.reply('**Invalid number of answers (Max 10)**');
    }
    const emojiChoices = ['1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟'];
    const emojiNeutral = '🤷';
    let question = `${questionArray[0]} \n\n`;
    for(let i = 1; i < questionArray.length; i += 1) {
      question += `${i} : ${questionArray[i]} \n`;
    }
    const embed = new Discord.RichEmbed()
      .setTitle('A Poll Has Been Started!')
      .setColor('#5599ff')
      .setDescription(`${question}`)
      .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`);

    const channel = message.client.channels.find('id', voteIdChannel);
    channel.send({ embed }).then(async (messageAnswered) => {
      const reactionArray = [];
      for (let i = 0; i < questionArray.length - 1; i++) {
        reactionArray[i] = await messageAnswered.react(emojiChoices[i]);
      }
      reactionArray.push(await messageAnswered.react(emojiNeutral));
    });
  },
};
