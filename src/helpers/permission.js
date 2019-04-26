const { adminIds } = require('@/config.js');

module.exports = {
  isAuthorized(member, roles) {
    return new Promise((resolve, reject) => {
      const hasRole = roles.find((role) => member.roles.has(role));
      if (hasRole || adminIds.contains(member.id)) {
        return resolve();
      }
      return reject();
    });
  },
  isTargetAble(member, roles) {
    return new Promise((resolve, reject) => {
      const hasRole = roles.find((role) => member.roles.has(role));
      if (hasRole || adminIds.contains(member.id)) {
        return reject();
      }
      return resolve();
    });
  },
};
