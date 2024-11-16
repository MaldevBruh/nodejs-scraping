import axios from 'axios';
import * as cheerio from 'cheerio';

async function topAnimeRatingInMAL() {
  try {
    const { data } = await axios.get('https://myanimelist.net/topanime.php', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
      }
    });
  
    const $ = cheerio.load(data);
  
    const animeList = $('tbody');
    const animes = [];
  
    animeList.find('tr.ranking-list').each((i, e) => {
      const title = $(e).find('a.hoverinfo_trigger').text().trim();
      const rating = $(e).find('span.score-label').text().trim();
      const cleanedRating = rating.replace('N/A', '').trim();
      const link = $(e).find('a.hoverinfo_trigger').attr('href');
  
      animes.push({
        index: i,
        title,
        rating: cleanedRating,
        link
      });
    });
    return animes;
  } catch(e) {
    console.log(e.message);
    return false;
  }
}

// Example of usage:

topAnimeRatingInMAL()
  .then(res => console.log(res))
  .catch(err => console.log(err));