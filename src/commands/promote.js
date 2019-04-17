const formating = require('@helpers/formating.js');
const promoteMember = require('./promote/member.js');
const promoteActif = require('./promote/actif.js');

module.exports = {
  name: 'promote',
  description: 'Tag a member(s) and promote him/them.',
  execute(message, args) {
    const params = {
      member: promoteMember,
      actif: promoteActif,
    };
    formating.formatingParams(message, params, args)
      .catch((isUnknowParams) => {
        const rep = isUnknowParams ? unknowParams + helper : helper;
        message.reply(rep);
      }) ;
  },
};

const unknowParams = '';
const helper = '';
