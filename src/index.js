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

client.on('message', message => {
  if (message.content.startsWith(`<@${id}>`) && !message.author.bot) {
    const random = Math.floor((Math.random() * quotes.length));
    message.reply(` ${quotes[random]}`);
  }
});

client.on('guildMemberAdd', member => {
  const { user } = member;
  const embed = new RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(user.avatarURL)
    .setTitle(`Bienvenue ${user.username}#${user.discriminator}`)
    .setDescription('vous invitons à lire les règles et à :')
    .addField('- vous présenter (optionnel)', 'introduce yourself (optional)', true)
    .addField('- vous définir politiquement (si vous n\'êtes pas politisé, précisez le quand même)', 'Define yourself politically (if you are not politicized, specify it anyway', true)
    .addField('- d\'où avez vous reçu votre invitation ?', 'Where did you receive your invitation from ?', true)
    .setImage('attachment://block.jpg')
    .setFooter('Quelqu\'un va passer pour te faire rentrer sur le serveur');
  embed.files = [{
    attachment: './static/img/block.jpg',
    name: 'block.jpg',
  }];
  member.guild.channels.get(lobbyIdChannel).send({ embed });
});

client.login(token);
