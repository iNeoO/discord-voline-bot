const media = [
  '- !asi <url> : get links of an emission or the pdf of an article',
  '- !diplo <url> : convert monde-diplomatique article to pdf',
  '- !hs <url> : get links of an emission',
  '- !mediapart <url> : convert mediapart article to pdf',
  '- !rss : Check for news on rss',
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
  '- !mediation <@someone> : Remove all roles an give "en Médiation" role (need to be member or moderator)',
  '- !poll <question> : Create a poll with pos/neg/abs (need to be member or moderator)',
  '- !polls <question> -- rep 1 -- rep2 -- rep3 ... : Create a poll multiple answers (need to be member or moderator)',
  '- !promote member <@someone> : Give rights to someone (need to be moderator)',
  '- !promote user <@someone> : Give rights to someone (need to be member or moderator)',
  '- !kick <@someone> : Kick someone from the Discord (need to be moderator)',
];

const msgs = [
  { key: 'administration', text: administration },
  { key: 'fun', text: fun },
  { key: 'media', text: media },
];

const help = msgs.reduce((acc, msg) => `${acc}**${msg.key}**\n\`\`\`${msg.text.join('\n')}\`\`\`\n`, '');

const rate = Array.apply(null, { length: 11 }).map(Number.call, (Number) => (Number) + '/10');

const formatingMsg = msgsArray => `\`\`\`${msgsArray.join('\n')}\`\`\`\n`;

module.exports = {
  help,
  rate,
  mediaHelper: formatingMsg(media),
  funHelper: formatingMsg(fun),
  administrationHelper: formatingMsg(administration),
};
