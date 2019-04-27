require('module-alias/register');
const path = require('path');
const Commando = require('discord.js-commando');
const {
  owner,
  // prefix,
  token,
} = require('@/config.js');


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
});

client.login(token);
