const fs = require('fs');
const Discord = require('discord.js');
const { id, prefix, token } = require('./config.json');
const { quotes } = require('./helpers/msg.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  client.user.setActivity('Fighting red fascism');
  console.log('Ready!');
});

client.on('message', message => {
  if (message.content.startsWith(id) && !message.author.bot) {
    // console.log(message.content);
    const random = Math.floor((Math.random() * quotes.length));
    message.reply(` ${quotes[random]}`);
  }
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  }
  catch (error) {
    console.error(error);
    message.reply('there was an error trying to execute that command!');
  }
});

client.on('error', console.error);
client.login(token);
