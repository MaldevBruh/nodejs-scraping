import axios from 'axios';
import FormData from 'form-data';

async function aivoicegenerator(text) {
  try {
    const url = 'https://aivoicegenerator.com/home/tryme_action/';

    const form = new FormData();
    form.append('csrf_test_name', '0f109c4a30bf5aefc3a670c8af970758');
    form.append('front_tryme_language', 'en-US');
    form.append('front_tryme_voice', 'QObKyouBVf49fcda7e728e3b7f01158e4e5312774JvLByN4n0_standard');
    form.append('front_tryme_text', text);

    let cookieString;
    await axios.get('https://aivoicegenerator.com/', {
      withCredentials: true
    })
    .then(res => {
      const setCookie = res.headers['set-cookie'];
      cookieString = setCookie.join('; ');
      console.log(cookieString);
    });

    const headers = {
      'Accept': '*/*',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Cookie': cookieString,
      'Origin': 'https://aivoicegenerator.com',
      'Referer': 'https://aivoicegenerator.com/',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
      'X-Requested-With': 'XMLHttpRequest',
      ...form.getHeaders()
    }

    const { data } = await axios.post(url, form, { headers });
    return data;
  } catch(e) {
    return {
      status: false,
      message: e.message
    }
  }
}

aivoicegenerator('halo sunda')
  .then(res => console.log(res))
  .catch(err => console.error(err));