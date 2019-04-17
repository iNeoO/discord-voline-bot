const state = {
  playList: [],
  playingSong: null,
  connection: null,
};

const setters = {
  add(song) {
    state.playList.push(song);
  },
  remove(index) {
    state.playList.splice(index, 1);
  },
  clear() {
    state.playList = [];
  },
  setConnection(connection) {
    state.connection = connection;
  },
  setPlayingSong(song) {
    state.playingSong = song;
  },
};

const getters = {
  getPlayList() {
    return state.playList;
  },
  getNbPlayList() {
    return state.playList.length;
  },
  shiftplayList() {
    return state.playList.shift();
  },
  getConnection() {
    return state.connection;
  },
  getPlayingSong() {
    return state.playingSong;
  },
};

module.exports = {
  getters,
  setters,
};
