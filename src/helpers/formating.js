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
};
