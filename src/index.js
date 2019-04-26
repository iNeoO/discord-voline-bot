require('module-alias/register');
const path = require('path');
const { Attachment, Embed } = require('discord.js');
const Commando = require('discord.js-commando');
const {
  owner,
  prefix,
  token,
  newsIdChannel,
  lobbyIdChannel,
} = require('@/config.js');
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

client.on('guildMemberAdd', member => {
  const { user } = member;
  const embed = new Embed()
    .setColor('RANDOM')
    .setThumbnail(user.avatarURL)
    .setTitle(`Bienvenue <@${member.id}>`)
    .setDescription('vous invitons à lire les règles et à :')
    .setField('- vous présenter (optionnel)', '', true)
    .setField('- vous définir politiquement (si vous n\'êtes pas politisé, précisez le quand même)', '', true)
    .setField('- d\'où avez vous reçu votre invitation ?)', '', true)
    .setFooter('Quelqu\'un va passer pour te faire rentrer sur le serveur');
  member.guild.channels.get(lobbyIdChannel).send({ embed },
    new Attachment('./static/img/block.jpg', 'block.jpg'));
});

client.login(token);
