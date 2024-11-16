// Image generator from hugging space (https://huggingface.co/spaces/m-ric/text-to-image)

import axios from 'axios';
import crypto from 'crypto';

function sessionHash() {
  const randomBytes = crypto.randomBytes(9);

  return randomBytes.toString('base64').slice(0, 10);
}

async function hf_txt2img(prompt) {
  const theSessionHash = sessionHash();
  try {
    const { data: data1 } = await axios.post('https://m-ric-text-to-image.hf.space/queue/join?__theme=light', {
      data: [prompt],
      event_data: null,
      fn_index: 0,
      trigger_id: 10,
      session_hash: theSessionHash
    });
    const { data } = await axios.get('https://m-ric-text-to-image.hf.space/queue/data?session_hash=' + theSessionHash);
    return data;

  } catch (error) {
    return error;
  }
}

// Example of usage:

hf_txt2img('a black man holding a sign that says AMBATUKAM').then(res => console.log(res));