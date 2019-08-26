const {
  Command,
} = require('discord.js-commando');
const { Attachment } = require('discord.js');
const Jimp = require('jimp');


class Clivage extends Command {
  constructor(client) {
    super(client, {
      name: 'test',
      group: 'fun',
      memberName: 'test',
      description: 'It\'s a test',
      examples: ['!test'],
    });
  }
  async run(msg) {
    try {
      const { user } = msg.member;
      const background = await Jimp.read('./static/img/entry_valided.png');
      const avatar = await Jimp.read(user.avatarURL);
      avatar.resize(70, 70);
      const font = await Jimp.loadFont(Jimp.FONT_SANS_14_BLACK);
      const image = await background.composite(avatar, 130, 180)
        .print(font, 15, 155, user.username)
        .getBufferAsync(Jimp.MIME_PNG);
      msg.channel.send('test', new Attachment(image));
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Clivage;
