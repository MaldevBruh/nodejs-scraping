import axios from 'axios';
import * as cheerio from 'cheerio';

async function topmanga() {
  const url = 'https://myanimelist.net/topmanga.php?type=manga';

  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
      }
    });

    const $ = cheerio.load(data);

    const mangaList = $('tbody');
    const mangas = [];

    mangaList.find('tr.ranking-list').each((i, e) => {
      const title = $(e).find('a.hoverinfo_trigger').text().trim();
      const score = $(e).find('span.score-label').text().trim().replace(/N\/A/g, '');
      const link = $(e).find('a.hoverinfo_trigger').attr('href');
      mangas.push({
        index: i,
        title,
        score,
        link
      })
    });
    return {
      status: true,
      result: mangas
    }
  } catch (e) {
    return {
      status: false,
      message: e.message
    }
  }
}

// Example of usage:

topmanga('Frieren')
  .then(res => console.log(res))
  .catch(err => console.log(err));