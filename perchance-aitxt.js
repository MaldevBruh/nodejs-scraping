// Scrape https://perchance.org/ai-text-generator (AI Text Generator)

import axios from 'axios';

async function perchanceAITXT(prompt) {
  const { data: userKey } = await axios.get(`https://text-generation.perchance.org/api/verifyUser?thread=1&__cacheBust=${Math.random()}`);

  const formData = {
    instruction: prompt,
    startWith: '',
    stopSequences: [],
    generatorName: 'ai-text-generator',
    startWithTokenCount: 1,
    instructionTokenCount: 5,
  };

  try {
    const response = await axios.post(`https://text-generation.perchance.org/api/generate?userKey=${userKey.userKey}&thread=1&requestId=aiTextCompletion${Date.now()}__cacheBust=${Math.random()}`, formData, {
      headers: {
          'content-type': 'text/plain;charset=UTF-8',
          'referer': 'https://text-generation.perchance.org/embed',
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
      },
      responseType: 'stream',
    });

    let result = '';

    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      for (const line of lines) {
        if (line.trim()) {
          try {
            const cleanedLine = line.replace(/^data:/, '').trim();
            const parsed = JSON.parse(cleanedLine);
            if (parsed.text) {
              result += parsed.text;
            }
          } catch (error) {
            console.error('Invalid JSON line:', line)
          }
        }
      }
    });

    return new Promise(resolve => {
      response.data.on('end', () => resolve({
        ok: true,
        result: result.trim()
      }));
    });
  } catch (error) {
    return {
      ok: false,
      result: {},
      error: error.response?.data || error.message
    }
  }
}

perchanceAITXT('Are you human?').then(res => console.log(res));