const axios = require('axios');
const parser = require('xml2json');
const { rssUrl } = require('../config.json');
const { getters, setters } = require('../state/rss');

const getRss = async () => {
  const { data } = await axios.get(rssUrl);
  const json = parser.toJson(data, { object: true });
  const itemList = json.rss.channel.item;
  const items = itemList.map((item) => {
    return {
      title: item.title,
      categories: item.category.map((cat) => cat.$t),
      link: item.link,
    };
  });
  if (!getters.getArticles().length) {
    setters.set(items);
    return [];
  }
  const articles = getters.getArticles();
  setters.set(items);
  const newArticles = items.filter(item =>
    !articles.find(article => article.title === item.title));
  if (newArticles.length) {
    return newArticles.map((art) => {
      return `**${art.title}** - ${art.link} \n- ${art.categories.join('\n- ')}\n`;
    });
  }
  return [];
};

module.exports = {
  getRss,
};
