const media = [
  '- !asi <url> : get link of an emission or the pdf of an article',
  '- !diplo <url> : convert monde-diplomatique article to pdf',
  '- !mediapart <url> : convert mediapart article to pdf',
  '- !propagande : Display propagande image',
  '- !rss : Check for news on rss',
];

const vocal = [
  '- !leave : Make bot leave vocal-channel',
  '- !radio <url> : Set the bot join chanel and play radio (default radiolib)',
  '- !yt : Commands to use bot in vocal with youtube',
  '      - !yt add <url> : Add a music in the playList',
  '      - !yt clear : Clear the playlist',
  '      - !yt list : Display the playlist',
  '      - !yt play <url> : Play the url or the playlist',
  '      - !yt remove <index> : Remove a music by index in the playlist',
  '      - !yt skip : Skip the actual music',
];

const fun = [
  '- !clivage <text> : Answer with sé de drouate or sé de gôche',
  '- !meme <index> : Display random meme image or the meme at the index provided',
  '- !propagande <index> : Display random propagande image or the propagande at the index provided',
  '- !q <text> : Answer yes or no',
  '- !rate <text> : Give a number between 0 and 10 to rate something',
];

const administration = [
  '- !clear : Clean message in a channel (need to be moderator)',
  '- !infos <@someone> : Get some info on someone',
  '- !mediation <@someone> : Remove all roles an give "en Médiation" role (need to be actif or moderator)',
  '- !poll <question> : Create a poll with pos/neg/abs (need to be moderator or actif)',
  '- !polls <question> -- rep 1 -- rep2 -- rep3 ... : Create a poll multiple answers (need to be moderator or actif)',
  '- !promote actif <@someone> : Give rights to someone (need to be moderator)',
  '- !promote member <@someone> : Give rights to someone (need to be moderator or actif)',
  '- !kick <@someone> : Kick someone from the Discord (need to be moderator)',
];

const msgs = [
  { key: 'administration', text: administration },
  { key: 'fun', text: fun },
  { key: 'media', text: media },
  { key: 'vocal', text: vocal },
];

const help = msgs.reduce((acc, msg) => `${acc}**${msg.key}**\n\`\`\`${msg.text.join('\n')}\`\`\`\n`, '');

const rate = Array.apply(null, { length: 11 }).map(Number.call, (Number) => (Number < 10 ? `0${Number}` : Number) + '/10');

module.exports = {
  help,
  rate,
};
