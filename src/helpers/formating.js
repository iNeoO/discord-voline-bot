module.exports = {
  formatingDate(date) {
    const d = new Date(date);
    let month = d.getMonth() + 1;
    let day = d.getDate();
    const year = d.getFullYear();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return [year, month, day].join('-');
  },
  formatingTime(date) {
    const d = new Date(date);
    let hours = d.getHours();
    let minutes = d.getMinutes();
    let seconds = d.getSeconds();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
    return [hours, minutes, seconds].join(':');
  },
  formatingDateTime(date) {
    return `${this.formatingDate(date)} ${this.formatingTime(date)}`;
  },
  formatingParams(message, params, args) {
    return new Promise((resolve, reject) => {
      const paramsList = args.slice(0);
      if (paramsList.includes('help') || paramsList.includes('h')) {
        return reject(false);
      }
      const argsList = args.slice(1)
        .filter(arg => !arg.includes('-'));
      const paramsKeys = Object.keys(params);
      const commandKey = paramsKeys.find(key => paramsList.includes(key)
        || paramsList.includes(key.charAt(0)));
      if (commandKey) {
        resolve(params[commandKey].execute(message, argsList));
      } else {
        return reject(true);
      }
    });
  },
};
