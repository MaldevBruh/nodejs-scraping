
/*
    - Flux Ai Image Unlimited Request (https://websim.ai/c/xTlURHyzK8sRkKovE)
*/
import axios from 'axios';

async function flux(prompt) {
  const url = 'https://websim.ai/api/image_gen';
  const headers = {
    'accept': '*/*',
    'content-type': 'application/json',
    'origin': 'https://websim.ai',
    'referer': 'https://websim.ai/c/xTlURHyzK8sRkKovE',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  }
  try {
    const { data } = await axios.post(url, {
      prompt,
      width: 1024,
      height: 1024,
      site_id: 'xTlURHyzK8sRkKovE',
      image_id: 148282854,
      src: 'https://picsum.photos/800/800?random=0.6376885910964529',
      html: '<html><head><style>html{min-height:100%}</style></head><body></body></html>',
      forceRegenerate: false
    }, {
      headers
    });

    return {
      status: true,
      result: data.url
    }
  } catch (e) {
    return {
      status: false,
      message: e.message
    }
  }
}

// Example of usage

flux('an astronaut riding a horse in the space')
  .then(res => console.log(res))
  .catch(err => console.log(err));

/* Output:
    {
      status: true,
      result: 'https://replicate.delivery/yhqm/KQQ7mx0HE87xAZH7txJ5Bulb035iZzxLCwCDBRyUE1fyxhxJA/out-0.webp'
    }
*/