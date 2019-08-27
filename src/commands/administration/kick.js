const {
  Attachment,
} = require('discord.js');
const {
  Command,
} = require('discord.js-commando');
const {
  isAuthorized,
  isTargetAble,
} = require('@helpers/permission.js');
const {
  moderatorIdRole,
  memberIdRole,
} = require('@/config.js');
const Jimp = require('jimp');


class Kick extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      group: 'administration',
      memberName: 'kick',
      description: 'Kick an user (need to be moderator or member)',
      examples: ['!kick <@user>'],
      args: [
        {
          key: 'user',
          prompt: '**Which user do you want to kick (@user) ?**',
          type: 'user',
        },
      ],
    });
  }

  run(msg, { user }) {
    const roles = [
      moderatorIdRole,
      memberIdRole,
    ];
    const author = msg.member;
    isAuthorized(author, roles).then((err) => {
      const guardRoles = [
        moderatorIdRole,
        memberIdRole,
      ];
      if (!err) {
        const target = msg.guild.member(user);
        isTargetAble(target, guardRoles).then(async (err) => {
          if (!err) {
            setTimeout(() => {
              target.kick();
              return msg.reply(`<@${target.id}> has been kicked !`);
            }, 5000);
            const background = await Jimp.read('./static/img/entry_denied.png');
            const avatar = await Jimp.read(user.avatarURL);
            avatar.resize(70, 70);
            const font = await Jimp.loadFont('./static/font/04b_03-16-2.fnt');
            const image = await background.composite(avatar, 130, 180)
              .print(font, 15, 157, user.username)
              .getBufferAsync(Jimp.MIME_PNG);
            return msg.channel.send(`<@${user.id}> has been denied`, new Attachment(image));
          } else {
            msg.reply('This user can\'t be kicked.');
          }
        }).catch((e) => {
          console.error(e);
          msg.reply('Something went wrong');
        });
      } else {
        msg.reply('you are not allowed to kick anybody.');
      }
    }).catch((e) => {
      console.log(e);
      msg.reply('Something went wrong');
    });
  }
}

module.exports = Kick;
