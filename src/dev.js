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
  unknownCommandResponse: false,
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


client.on('error', (e) => {
  console.error('____');
  console.error((new Date()).toISOString());
  console.error(e);
});

client.login(token);
