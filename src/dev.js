require('module-alias/register');
const Discord = require('discord.js');
const { prefix, token } = require('@/config.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const yt = require('./commands/yt.js');
client.commands.set(yt.name, yt);

const help = require('./commands/help.js');
client.commands.set(help.name, help);


// const promote = require('./commands/promoteActif.js');
// client.commands.set(promote.name, promote);

client.on('ready', () => {
  client.user.setActivity('Fighting red fascism');
  console.log('Ready!');
});

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift();
  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  }
  catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command.');
  }
});

client.on('error', console.error);
client.login(token);
