const { adminIds } = require('@/config.js');

module.exports = {
  isAuthorized(member, roles) {
    return new Promise((resolve) => {
      const hasRole = roles.find((role) => member.roles.has(role));
      if (hasRole || adminIds.includes(member.id)) {
        return resolve(null);
      }
      return resolve(true);
    });
  },
  isTargetAble(member, roles) {
    return new Promise((resolve) => {
      const hasRole = roles.find((role) => member.roles.has(role));
      if (hasRole || adminIds.includes(member.id)) {
        return resolve(true);
      }
      return resolve(null);
    });
  },
};
