/*
  Flux Ai Image Generator 2 (https://fluximagegenerator.ai)
  Created by MaldevBruh
*/

import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path';
import crypto from 'crypto';

class imgBB { // Yang upload imgBB ini bukan buatan gw, tapi Daffa Code :v
    constructor() {
        this.exp = {
            'Selamanya': '', '5 Menit': 'PT5M', '15 Menit': 'PT15M',
            '30 Menit': 'PT30M', '1 Jam': 'PT1H', '3 Jam': 'PT3H',
            '6 Jam': 'PT6H', '12 Jam': 'PT12H', '1 Hari': 'P1D',
            '2 Hari': 'P2D', '3 Hari': 'P3D', '4 Hari': 'P4D',
            '5 Hari': 'P5D', '6 Hari': 'P6D', '1 Minggu': 'P1W',
            '2 Minggu': 'P2W', '3 Minggu': 'P3W', '1 Bulan': 'P1M',
            '2 Bulan': 'P2M', '3 Bulan': 'P3M', '4 Bulan': 'P4M',
            '5 Bulan': 'P5M', '6 Bulan': 'P6M',
        };
    }

    async cookies() {
        const response = await axios.get('https://id.imgbb.com/');
        return response.headers['set-cookie'].find(c => c.startsWith('PHPSESSID=')).split(';')[0];
    }

    token() { return crypto.randomBytes(20).toString('hex'); }

    rf(extension) { 
        return `${crypto.randomBytes(16).toString('hex')}.${extension}`; 
    }

    async uploadImage(source, toket, expiration) {
        const form = new FormData();
        let fileName;

        if (Buffer.isBuffer(source)) {
            fileName = this.rf('jpg'); 
            form.append('source', source, { filename: fileName });
        } else if (typeof source === 'string' && source.startsWith('http')) {
            try {
                const response = await axios.get(source, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(response.data);
                fileName = this.rf('jpg'); 
                form.append('source', buffer, { filename: fileName });
            } catch (error) {
                console.error(error);
                throw new Error('Link nya gak bisa di download euy 🤣');
            }
        } else {
            if (typeof source === 'string' && fs.existsSync(source)) {
                fileName = path.basename(source);
                form.append('source', fs.createReadStream(source), { filename: fileName });
            } else {
                throw new Error('Path file nya gak valid atau file nya yg gak ada 🙃');
            }
        }

        form.append('type', 'file');
        form.append('action', 'upload');
        form.append('timestamp', Date.now());
        form.append('auth_token', this.token());
        form.append('expiration', this.exp[expiration]);

        const headers = { ...form.getHeaders(), 'User-Agent': 'Postify/1.0.0', 'Cookie': toket };
        const response = await axios.post('https://id.imgbb.com/json', form, { headers });
        return response.data;
    }

    async upload(source, expiration) {
        const toket = await this.cookies();
        return this.uploadImage(source, toket, expiration);
    }
}

const imgbb = new imgBB();

async function flux2(prompt) {
  const url = 'https://fluximagegenerator.ai/api/huggingface';

  const formData = {
    height: 1024,
    prompt,
    version: 'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
    width: 1024
  }

  const headers = {
    'Accept': '*/*',
    'Content-Type': 'application/json',
    'Origin': 'https://fluximagegenerator.ai',
    'Referer': 'https://fluximagegenerator.ai/flux1-schnell',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36'
  }

  try {
    const { data } = await axios.post(url, formData, { headers, responseType: 'arraybuffer' });
    const res = await imgbb.upload(data, 'Selamanya');
    return {
      status: true,
      result: res.image.url
    }
  } catch(err) {
    return {
      status: false,
      message: err.message
    }
  }
}

// Contoh penggunaan:

flux2('a black cat in the space holding a sign that says AKU SUKA JOMOK')
  .then(res => console.log(res))
  .catch(err => console.error(err));