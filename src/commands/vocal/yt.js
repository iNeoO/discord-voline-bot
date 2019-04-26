const {
  Command,
} = require('discord.js-commando');
const ytAdd = require('./yt/add.js');
const ytClear = require('./yt/clear.js');
const ytList = require('./yt/list.js');
const ytPlay = require('./yt/play.js');
const ytRemove = require('./yt//remove.js');
const ytSkip = require('./yt/skip.js');
const {
  ytHelper,
} = require('@helpers/msg.js');


class Yt extends Command {
  constructor(client) {
    super(client, {
      name: 'yt',
      group: 'vocal',
      memberName: 'yt',
      description: 'yt commands',
      examples: [ytHelper],
      args: [
        {
          key: 'command',
          prompt: '**Which command do you want to use (add|clear|list|play|remove|skip) ?**',
          type: 'string',
        },
        {
          key: 'data',
          prompt: '**Which (id|url) ?**',
          type: 'string',
          default: '',
        },
      ],
    });
  }

  run(msg, { command, data }) {
    const params = {
      add: ytAdd,
      clear: ytClear,
      list: ytList,
      play: ytPlay,
      remove: ytRemove,
      skip: ytSkip,
    };
    if (command === 'help' || command === 'h') {
      return msg.reply(ytHelper);
    }
    const paramsKeys = Object.keys(params);
    const commandKey = paramsKeys.find(key => key === command);
    if (commandKey) {
      params[commandKey](msg, data);
    } else {
      return msg.reply(ytHelper);
    }
  }
}

module.exports = Yt;
