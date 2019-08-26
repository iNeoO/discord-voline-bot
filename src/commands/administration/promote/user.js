const { Attachment } = require('discord.js');
const {
  isAuthorized,
} = require('@helpers/permission.js');
const {
  moderatorIdRole,
  userIdRole,
  memberIdRole,
} = require('@/config.js');
const Jimp = require('jimp');

module.exports = (msg, user) => {
  const author = msg.member;
  const roles = [moderatorIdRole, memberIdRole];
  isAuthorized(author, roles).then(async (err) => {
    if (!err) {
      setTimeout(() => {
        const memberRole = msg.guild.roles.get(userIdRole);
        user.addRole(memberRole).catch(console.error);
      }, 4000);
      const background = await Jimp.read('./static/img/entry_valided.png');
      const avatar = await Jimp.read(user.avatarURL);
      avatar.resize(70, 70);
      const font = await Jimp.loadFont(Jimp.FONT_SANS_14_BLACK);
      const image = await background.composite(avatar, 130, 180)
        .print(font, 15, 155, user.username)
        .getBufferAsync(Jimp.MIME_PNG);
      return msg.channel.send(`<@${user.id}> as been promoted`, new Attachment(image));
    } else {
      msg.reply('you are not allowed to promote anybody.');
    }
  }).catch((e) => {
    console.error(e);
    msg.reply('Something went wrong');
  });
};
