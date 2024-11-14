// Tiktok Downloader (https://ssstik.io)

import axios from 'axios';
import * as cheerio from 'cheerio';

async function ssstik(url) {
  const data = new URLSearchParams();
  data.append('id', url);
  data.append('locale', 'en');
  data.append('tt', 'djRjTmpl');

  const headers = {
    "Accept": "*/*",
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    "Origin": "https://ssstik.io",
    "Referer": "https://ssstik.io/en-1",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
  }

  try {
    const res = await axios.post('https://ssstik.io/abc?url=dl', data.toString(), { headers });
    const $ = cheerio.load(res.data);
    const linkmp4 = $('a.without_watermark').attr('href');
    const linkmp3 = $('a.download_link.music').attr('href');
    const caption = $('.maintext').text();
    const thumbnail = $('style').html().match(/background-image:\s*url\((.*?)\)/)[1];
    return {
      status: true,
      result: {
        linkmp4,
        linkmp3,
        caption,
        thumbnail
      }
    }
  } catch (e) {
    return e.message;
  }
}

// Example of usage:

ssstik('https://www.tiktok.com/@_onepieceislife/video/7436977719629368584?is_from_webapp=1&sender_device=pc&web_id=7436305549014386184')
  .then(res => console.log(res))
  .catch(err => console.log(err));
