/*
  - Scrape https://seoschmiede.at Model ChatGPT (Idk what version is this:v, but in the website says this is ChatGPT)
*/

import axios from 'axios';

async function openAI(content) {
  const url = 'https://chatbot-ji1z.onrender.com/chatbot-ji1z';

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Origin': 'https://seoschmiede.at',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.3'
  }

  const { data } = await axios.post(url, `{"messages":[{"role":"user","content":"${content}"}]}`, { headers });

  return data.choices[0].message.content;
}

// Example of usage:

// openAI('bagaimana cara agar jago koding')
//   .then(res => console.log(res))
//   .catch(e => console.error(e));

export { openAI };
