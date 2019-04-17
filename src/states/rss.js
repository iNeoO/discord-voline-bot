const state = {
  dateUpdate: null,
};

const setters = {
  setDateUpdate(date) {
    state.dateUpdate = date;
  },
};

const getters = {
  getDateUpdate() {
    return state.dateUpdate;
  },
};

module.exports = {
  getters,
  setters,
};
