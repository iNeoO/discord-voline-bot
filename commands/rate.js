const { rate } = require('../helpers/msg.js');

module.exports = {
  name: 'rate',
  description: 'return a random valor between 0 and 10',
  execute(message) {
    const random = Math.floor((Math.random() * 11));
    const random2 = Math.floor((Math.random() * 11));
    const goulag = random2 === 10 ? 'Now go to goulag' : '';
    message.reply(` i would say ${rate[random]} ! ${goulag}`);
  },
};
