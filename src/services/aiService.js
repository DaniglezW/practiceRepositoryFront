
import { translate } from '@vitalets/google-translate-api';

const API_URL = 'https://s9.piclumen.art/comfy/api/generate-image';

const aiService = {
  async sendPrompt(prompt) {
    try {
      const translated = await translate(prompt, { to: 'en' });

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: translated.text }),
      });

      if (!response.ok) {
        throw new Error('Error al comunicarse con la API');
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      return imageUrl;
    } catch (error) {
      console.error('Error en aiService:', error);
      throw error;
    }
  },
};

export default aiService;
