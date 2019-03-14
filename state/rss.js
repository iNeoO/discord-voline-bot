const state = {
  articles: [],
};

const setters = {
  set(articles) {
    state.articles = articles;
  },
};

const getters = {
  getArticles() {
    return state.articles;
  },
};

module.exports = {
  getters,
  setters,
};
