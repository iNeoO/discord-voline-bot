const { Attachment } = require('discord.js');
const {
  isAuthorized,
} = require('@helpers/permission.js');
const {
  moderatorIdRole,
  userIdRole,
  memberIdRole,
  homeIdChannel,
  sosDiscordUrl
} = require('@/config.js');
const Jimp = require('jimp');

module.exports = (msg, member) => {
  const author = msg.member;
  const roles = [moderatorIdRole, memberIdRole];
  isAuthorized(author, roles).then(async (err) => {
    if (!err) {
      setTimeout(() => {
        const memberRole = msg.guild.roles.get(userIdRole);
        member.addRole(memberRole).catch(console.error);
      }, 4000);
      const background = await Jimp.read('./static/img/entry_valided.png');
      const avatar = await new Jimp.read(member.user.avatarURL || './static/img/avatar-discord.jpg');
      avatar.resize(70, 70);
      const font = await Jimp.loadFont('./static/font/04b_03-16-2.fnt');
      const image = await background.composite(avatar, 130, 180)
        .print(font, 15, 157, member.user.username)
        .getBufferAsync(Jimp.MIME_PNG);
      return msg.guild.channels.get(homeIdChannel).send(`<@${member.id}> you have been promoted, Le discord de secours est : ${sosDiscordUrl}, (image come from a game, Papers, Please)`, new Attachment(image));
    } else {
      msg.reply('you are not allowed to promote anybody.');
    }
  }).catch((e) => {
    console.error(e);
    msg.reply('Something went wrong');
  });
};
