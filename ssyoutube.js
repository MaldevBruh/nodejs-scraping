import axios from 'axios';

async function ssYoutube(LinkURL) {
  const url = 'https://api.ssyoutube.com/api/convert';
  
  const headers = {
    "Accept": "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "Origin": "https://ssyoutube.com",
    "Referer": "https://ssyoutube.com/",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    "X-Requested-With": "XMLHttpRequest"
  }

  try {
    const { data } = await axios(url, {
      method: 'POST',
      data: `{"url":"${LinkURL}","ts":1727942555686,"_ts":1727868316808,"_tsc":0,"_s":"78c7dffdcc7d2596ca3ec62cdfd66d34f89202f52cdb261075a7badf98888d2d"}`,
      headers
    });
    let result = data.url;
    return {
      status: true,
      result
    }
  } catch(e) {
    return {
      status: false,
      result: e.message
    }
  }
}

ssYoutube('https://youtu.be/QnMmgcXvuvw?si=kBcn_GO1xlTDhIub')
  .then(res => console.log(res))
  .then(err => console.log(err));