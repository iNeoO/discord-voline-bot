const formating = require('@helpers/formating.js');
const ytAdd = require('./yt/add.js');
const ytClear = require('./yt/clear.js');
const ytList = require('./yt/list.js');
const ytPlay = require('./yt/play.js');
const ytRemove = require('./yt//remove.js');
const ytSkip = require('./yt/skip.js');

module.exports = {
  name: 'yyt',
  description: 'yt command manager',
  execute(message, args) {
    const params = {
      add: ytAdd,
      clear: ytClear,
      list: ytList,
      play: ytPlay,
      remove: ytRemove,
      skip: ytSkip,
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
