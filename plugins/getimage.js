const axios = require('axios');
const { cmd } = require('../command'); // Importe la fonction cmd()

cmd({
  pattern: "getimage",
  desc: "Télécharge une image depuis une URL",
  category: "tools",
  use: ".getimage <image_url>",
  filename: __filename
}, async (m, sock, args) => {
  const imageUrl = args[0];

  if (!imageUrl) {
    return m.reply("❌ Please provide a valid image URL.\nExample: .getimage https://example.com/image.jpg");
  }

  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });

    await sock.sendMessage(m.chat, {
      image: Buffer.from(response.data),
      caption: "✅ Here is your image from the URL!"
    }, { quoted: m });
  } catch (error) {
    console.error("Erreur lors du téléchargement de l'image :", error);
    m.reply("❌ Failed to download the image. Make sure the URL is correct.");
  }
});
