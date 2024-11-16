// Image generator from hugging space (https://huggingface.co/spaces/m-ric/text-to-image)

import axios from 'axios';

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function hf_txt2img(prompt) {
  const randomString = generateRandomString(5);
  let attempts = 0;
  let res;
  do {
    if(attempts > 5) break;
    attempts++;
    try {
      const { data: data1 } = await axios.post('https://m-ric-text-to-image.hf.space/queue/join?__theme=light', {
        data: [prompt],
        event_data: null,
        fn_index: 0,
        trigger_id: 10,
        session_hash: randomString
      });
      const { data } = await axios.get('https://m-ric-text-to-image.hf.space/queue/data?session_hash=' + randomString);
      const result = data.match(/"url":"(.*?)"/)?.[1];
      res = {
        status: true,
        result: result
      }
  
    } catch (error) {
      res = {
        status: false,
        result: {},
        error: error.message
      }
    }
    if(!res.status) console.log('Retrying...');
  } while(!res.status);
  return res;
}

// Example of usage:

hf_txt2img('a black man holding a sign that says AKU CINTA AMBATUKAM DAN AMBASING').then(res => console.log(res));