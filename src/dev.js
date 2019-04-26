require('module-alias/register');
const path = require('path');
const Commando = require('discord.js-commando');
const {
  owner,
  // prefix,
  token,
  newsIdChannel,
} = require('@/config.js');
const {
  setters,
} = require('@states/rss.js');
const {
  getRss,
} = require('@helpers/rss.js');


const client = new Commando.Client({
  // commandPrefix: prefix,
  commandPrefix: '?',
  owner: owner,
  disableEveryone: true,
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ['administration', 'Administration commands'],
    ['fun', 'Fun commands'],
    ['media', 'Media commands'],
    ['vocal', 'Vocal commands'],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, 'commands'));

client.on('ready', () => {
  client.user.setActivity('Fighting red fascism');
  console.log('Ready!');
  setters.setDateUpdate(new Date());

  setInterval(async () => {
    const articles = await getRss();
    articles.forEach(text => {
      if (text.length) {
        client.channels.get(newsIdChannel).send(text);
      }
    });
  }, 1000 * 60 * 60);
});

client.login(token);
