module.exports = {
  name: 'q',
  description: 'return a random valor between 0 and 10',
  execute(message) {
    const random = Math.round(Math.random());
    const answer = random ? ' i would say yes !' : ' i would say no !';
    message.reply(answer);
  },
};
