require('module-alias/register');
const path = require('path');
const Commando = require('discord.js-commando');
const {
  owner,
  // prefix,
  token,
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
  setters.setDateUpdate(new Date());
  (async () => {
    const articles = await getRss();
    articles.forEach(text => {
      if (text.length) {
        client.channels.get('461489871526035488').send(text);
      }
    });
  })();
  console.log('Ready!');
});

client.on('error', (e) => {
  console.error('____');
  console.error((new Date()).toISOString());
  console.error(e);
});

client.login(token);
