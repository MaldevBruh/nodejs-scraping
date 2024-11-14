/*
  ** Scrape https://publer.io/tools/youtube-downloader (YouTube Downloader)
*/

import fetch from 'node-fetch';

async function publerYTDL(url) {
  let attempts = 0;
  let res;

  do {
    attempts++;
    try {
      const response = await (await fetch('https://app.publer.io/hooks/media', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'referer': 'https://publer.io/',
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
        },
        body: JSON.stringify({
          url
        })
      })).json()

      let response2;
      do {
        response2 = await (await fetch('https://app.publer.io/api/v1/job_status/' + response.job_id)).json();
      } while(response2.status === 'working');
      res = {
        status: true,
        result: response2.payload[0].path
      }
    } catch (error) {
      res =  {
        status: false,
        result: {},
        message: error.message
      }
    }
  } while(!res.status);
  return res;
}

// Example of usage:

publerYTDL('https://youtu.be/QnMmgcXvuvw?si=62SZa8ROh2SnO6jr').then(res => console.log(res));

/*

Output:
{
  status: true,
  result: 'https://cdn54.savetube.su/media/QnMmgcXvuvw/christina-perri-a-thousand-years-audio-edit-720-ytshorts.savetube.me.mp4'
}

*/