require('module-alias/register');
const fs = require('fs');
const Discord = require('discord.js');
const { id, prefix, token, lobbyIdChannel, newsIdChannel } = require('@/config.js');
const { quotes } = require('@helpers/quotes.js');
const { setters } = require('@states/rss.js');
const { getRss } = require('@helpers/rss.js');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('src/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  client.user.setActivity('Fighting red fascism');
  console.log('Ready!');
  setters.setDateUpdate(new Date());

  setInterval(async () => {
    const articles = await getRss();
    articles.forEach(text => {
      if(text.length) {
        client.channels.get(newsIdChannel).send(text);
      }
    });
  }, 1000 * 60 * 60);
});

client.on('message', message => {
  if (message.content.startsWith(id) && !message.author.bot) {
    // console.log(message.content);
    const random = Math.floor((Math.random() * quotes.length));
    message.reply(` ${quotes[random]}`);
  }
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

client.on('guildMemberAdd', member => {
  member.guild.channels.get(lobbyIdChannel).send(`
Bienvenue <@${member.id}>, nous vous invitons à lire les règles et à :
  - vous présenter (optionnel)
  - vous définir politiquement (si vous n'êtes pas politisé, précisez le quand même)
  - donner votre avis sur les règles et les valeurs du serveur
  - d'où avez vous reçu votre invitation ?`,
  new Discord.Attachment('./static/img/block.jpg', 'block.jpg'));
});

client.on('error', (e) => {
  console.error('____');
  console.error((new Date()).toISOString());
  console.error(e);
});
client.login(token);
