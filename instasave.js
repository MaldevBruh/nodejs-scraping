import axios from 'axios';
import cheerio from 'cheerio';

async function igdl(url) {
  const data = new URLSearchParams();
  data.append('url', url);
  data.append('lang', 'en');

  const headers = {
    "Accept": "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
    "Origin": "https://instasave.website",
    "Referer": "https://instasave.website/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36"
  }
  const res = await axios.post('https://api.instasave.website/media', data.toString(), { headers });
  const $ = cheerio.load(res.data);
  const result = $('a:contains("Download")').attr('href');
  return result.replace(/\\\"/g, '');
}

igdl('https://www.instagram.com/p/C-fLenrv9sW/')
  .then(res => console.log(res))
  .catch(e => console.log(e.response ? e.response.data : e));