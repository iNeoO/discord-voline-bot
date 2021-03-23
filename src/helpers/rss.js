const axios = require('axios');
const parser = require('xml2json');
const { rss } = require('@/config.js');
const { getters, setters } = require('@states/rss');

const getRss = async () => {
  const lastUpdate = getters.getDateUpdate();
  const newDate = new Date();
  const articles = await Promise.all(rss.map(async ({ name, url }) => {
    let data;
    try {
      data = await axios.get(url);
    } catch(e) {
      console.error(`\n\n${new Date()}: ${name}`);
      console.error(e);
      return ''
    }
    let json = '';
    try {
      json = parser.toJson(( data.data ? data.data : data ).trim(), { object: true });
    } catch(e) {
      console.error(`\n\n${new Date()}: ${name}`);
      console.error(e);
      return '';
    }
    const itemList = json.rss ? json.rss.channel.item : json.feed.entry;
    const items = itemList.filter((item) => {
      if (item.pubDate) {
        const date = Date(item.pubDate);
        return lastUpdate <= date && date <= new Date();
      }
      if (item['dc:date']) {
        const date = new Date(item['dc:date']);
        return lastUpdate <= date && date <= new Date();
      }
      if (item.published) {
        const date = new Date(item.published);
        return lastUpdate <= date && date <= new Date();
      }
      return false;
    }).map((item) => {
      if (item.title) {
        let categories;
        if (item.category) {
          categories = typeof item.category === 'string'
            ? item.category
            : item.category.map((cat) => {
              if (cat.$t) {
                return cat.$t;
              }
              return cat;
            });
        }
        return {
          title: item.title,
          categories,
          link: item.link || item.enclosure,
        };
      }
    });
    if (!items.length) {
      return '';
    }
    const articlesText = `\n\n___***${name}***___\n\n`;
    const uniqueItems = [];
    for(const item of items) {
      if (!uniqueItems.find((uniqItem) => uniqItem.link === item.link)) {
        uniqueItems.push(item);
      }
    }
    return uniqueItems.reduce((acc, art) => {
      let categories = '';
      if (art.categories) {
        categories = typeof art.categories === 'string'
          ? `- ${art.categories}\n`
          : `- ${art.categories.join('\n- ')}\n`;
      }
      return `${acc}**${art.title}** - ${art.link} \n${categories}\n`;
    }, articlesText);
  }));
  setters.setDateUpdate(newDate);
  return articles;
};

module.exports = {
  getRss,
};
