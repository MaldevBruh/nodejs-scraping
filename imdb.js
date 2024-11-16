import axios from 'axios';
import * as cheerio from 'cheerio';

async function imdb() {
  try {
    const { data } = await axios.get('https://www.imdb.com/chart/top', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });
    const $ = cheerio.load(data);
    const filmList = $('ul.ipc-metadata-list.ipc-metadata-list--dividers-between.sc-a1e81754-0.dHaCOW.compact-list-view.ipc-metadata-list--base');
    
    const films = [];

    filmList.find('li.ipc-metadata-list-summary-item.sc-10233bc-0.TwzGn.cli-parent').each((i, e) => {
      const title = $(e).find('h3.ipc-title__text').text().trim();
      const rating = $(e).find('span.ipc-rating-star--rating').text().trim();
      films.push({ title, rating });
    });

    console.log(films);
  } catch(e) {
    console.log(e.message);
  }
}

imdb()