/*
  - Scrape https://nekomori.space
*/

import axios from 'axios';

async function nekomori(message, assistantId = 422) {
  const url = 'https://nekomori.space/api/v1.1/messages';

  const form = {
    assistantId,
    message
  }

  const headers = {
    'accept': '*/*',
    'content-type': 'application/json',
    'origin': 'https://nekomori.space',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest'
  }

  try {
    const { data } = await axios.post(url, form, { headers });
    return data.conversation.message || data.textContent;
  } catch(e) {
    return e.message;
  }
}

// Example of usage:

nekomori('are you wanna fight with me, huh?', 422)
  .then(res => console.log(res))
  .catch(err => console.error(err));