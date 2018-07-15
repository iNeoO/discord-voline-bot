module.exports = {
  name: 'q',
  description: 'return a random valor between 0 and 10',
  execute(message) {
    const random = Math.round(Math.random());
    const answer = random ? 'I would say yes' : 'I would say no';
    message.reply(answer);
  },
};
