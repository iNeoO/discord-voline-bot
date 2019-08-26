const {
  mediationMuteIdRole,
} = require('@/config.js');

module.exports = (msg, user) => {
  const mediationRole = msg.guild.roles.get(mediationMuteIdRole);
  const target = msg.guild.member(user);
  const hasRole = target.roles.has(mediationRole);
  if (hasRole) {
    target.removeRole(mediationRole).catch(console.error);
    const reponse = `mediation mute role removed for <@${user.id}>`;
    msg.channel.send(reponse);
  } else {
    target.addRole(mediationRole).catch(console.error);
    const reponse = `mediation mute role added for <@${user.id}>`;
    console.log(reponse);
    msg.channel.send(reponse);
  }
};
