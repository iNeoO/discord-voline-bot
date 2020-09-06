require('module-alias/register');
const path = require('path');
const {
  RichEmbed,
} = require('discord.js');
const Commando = require('discord.js-commando');
const {
  id,
  owner,
  prefix,
  token,
  newsIdChannel,
  lobbyIdChannel,
  conversationIdChannel,
} = require('@/config.js');
const {
  quotes,
} = require('@helpers/quotes.js');
const {
  setters,
} = require('@states/rss.js');
const {
  getRss,
} = require('@helpers/rss.js');


const client = new Commando.Client({
  commandPrefix: prefix,
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

client.on('ready', () => {
  client.user.setActivity('Fighting red fascism');
  console.log('Ready!');
  setters.setDateUpdate(new Date());

  setInterval(async () => {
    let articles;
    try {
      articles = await getRss();
    } catch(e) {
      console.error(`------------------\n${new Date()}\nSomething went wrong with news rss ${e}`);
    }
    if (!articles) {
      return;
    }
    articles.forEach(text => {
      if (text.length) {
        client.channels.get(newsIdChannel).send(text);
      }
    });
  }, 1000 * 60 * 60);
});

client.on('message', message => {
  if (message.content.startsWith(`<@!${id}>`)
    && !message.author.bot
    && message.channel.type !== 'dm'
    || message.content.includes(`<@!${id}>`)) {
    const random = Math.floor((Math.random() * quotes.length));
    message.reply(` ${quotes[random]}`);
    return;
  }
  if (message.channel.type === 'dm' && !message.author.bot) {
    const content = message.content.split(' ');
    if (content && content[0]) {
      const command = message.content.startsWith(client.commandPrefix)
        ? content[0].substring(0, client.commandPrefix.length)
        : content[0];
      const commands = client.registry.commands.map(({ name }) => name);
      if (commands.includes(command)) {
        return;
      }
      client.channels.get(conversationIdChannel).send(`${message.author.username} : ${message.content}`);
    }
    return;
  }
});

client.on('guildMemberAdd', async member => {
  const { user } = member;
  const embed = new RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(user.avatarURL)
    .setTitle(`Bienvenue ${user.username}#${user.discriminator}`)
    .setDescription('vous invitons à lire les règles et à :')
    .addField('- vous présenter (optionnel)', 'introduce yourself (optional)', true)
    .addField('- vous définir politiquement (si vous n\'êtes pas politisé, précisez le quand même)', 'Define yourself politically (if you are not politicized, specify it anyway', true)
    .addField('- d\'où avez vous reçu votre invitation ?', 'Where did you receive your invitation from ?', true)
    .setFooter('Quelqu\'un va passer pour te faire rentrer sur le serveur.');
  member.guild.channels.get(lobbyIdChannel).send({ embed });
});

client.on('error', (e) => {
  console.error('____');
  console.error((new Date()).toISOString());
  console.error(e);
});

client.login(token);
