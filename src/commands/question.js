module.exports = {
  name: 'q',
  description: 'return a random valor between 0 and 10',
  execute(message, args) {
    const random = Math.round(Math.random());
    const answer = random ? ' i would say yes !' : ' i would say no !';
    message.reply(`\`${args.slice(0).join(' ')}\`,\n ${answer}`);
  },
};
