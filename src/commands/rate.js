const { rate } = require('@helpers/msg.js');

module.exports = {
  name: 'rate',
  description: 'return a random valor between 0 and 10',
  execute(message, args) {
    const random = Math.floor((Math.random() * 11));
    message.reply(`\`${args.slice(0).join(' ')}\`,\n i would say ${rate[random]} !`);
  },
};
