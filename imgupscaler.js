import axios from 'axios';
import FormData from 'form-data';

class ImgUpscaler {
  constructor() {
    this.uploadUrl = 'https://get1.imglarger.com/api/Upscaler/UploadNew';
    this.statusUrl = 'https://get1.imglarger.com/api/Upscaler/CheckStatusNew';
  };

  async upload(buffer) {
    try {
      const formData = new FormData();
      formData.append('myfile', buffer);
      formData.append('scaleRadio', '4');
  
      const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Origin': 'https://imgupscaler.com',
        'Referer': 'https://imgupscaler.com/',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        ...formData.getHeaders()
      };
  
      const { data } = await axios.post(this.uploadUrl, formData, { headers });
      return {
        status: true,
        result: data.data.code
      };
    } catch(e) {
      return {
        status: false,
        result: {},
        message: e.message
      };
    };
  };

  async upscaler(buffer) {
    try {
      const headers = {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Origin': 'https://imgupscaler.com',
        'Referer': 'https://imgupscaler.com/',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'
      };
  
      const code = await this.upload(buffer);
      while (true) {
        const { data } = await axios.post(this.statusUrl, { code: code.result, scaleRadio: 4 }, { headers });
        
        if (data.data.status !== 'waiting') {
          return {
            status: true,
            result: data.data.downloadUrls[0]
          };
        };
  
        await new Promise(resolve => setTimeout(resolve, 1000));
      };
    } catch(e) {
      return {
        status: false,
        result: {},
        message: e.message
      };
    };
  };
};

// How to use:

import fs from 'fs';

const imgupscaler = new ImgUpscaler();

// Use buffer / path file / link image (In this case i'll use path file)

const pathFile = './JonMajors_LowQuality.jpg';
const readStream = fs.createReadStream(pathFile);

imgupscaler.upscaler(readStream)
  .then(res => console.log(res))
  .catch(err => console.error(err));