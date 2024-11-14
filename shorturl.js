import axios from 'axios';

async function shortUrl(url) {
  const rUrl = 'https://d.131213.xyz/create';

  const headers = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Origin': 'https://d.131213.xyz',
    'Referer': 'https://d.131213.xyz/',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
  }

  try {
    const { data } = await axios.post(rUrl, { url }, { headers });
    return {
      status: true,
      result: data.link
    }
  } catch(e) {
    return {
      status: false,
      result: {},
      message: e.message
    };
  };
};

async function attemptShortUrl(url) {
  let res;
  do {
    res = await shortUrl(url);
    if (!res.status) {
      console.log("Retrying...");
    }
  } while (!res.status);

  return res;
};

// Example of usage:

attemptShortUrl('https://telegram.org')
  .then(res => console.log(res));