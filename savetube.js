/*
  - Scrape "ytshorts.savetube.me" (Downloader YouTube)
*/

import axios from 'axios';

async function savetube(url) {
  let res;
  let a;
  let attempts = 0;
  do {
    try {
      const urlApi = 'https://cdn52.savetube.su/info?url=' + encodeURIComponent(url);
  
      const headers = {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:132.0) Gecko/20100101 Firefox/132.0'
      };
        const { data } = await axios.get(urlApi, { headers });
        res = {
          status: true,
          result: {
            title: data.data.title,
            duration: data.data.durationLabel,
            thumbnail: data.data.thumbnail,
            audio_formats: data.data.audio_formats,
            video_formats: data.data.video_formats
          }
        }
      }
	  catch (error) {
        console.log('Retrying...');
	a = error;
        res = {
          status: false,
          result: {},
          message: error
        }
      }
      attempts++;
      if(attempts >= 10) {
        res = {
          status: false,
          result: {},
          message: a
        }
        break;
      }
  } while(!res.status);
  return res;
};

// Example of usage:

savetube('https://music.youtube.com/watch?v=WQjGcNBuv30&si=LukIPDKcEGoForEg')
  .then(res => {
    console.log(res);
    console.log(res.result.video_formats[0].url);
  });
