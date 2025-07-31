const axios = require('axios');
const { cmd } = require('../command'); // Make sure this cmd() function is defined properly

cmd({
  pattern: "getimage",
  desc: "Download an image from a URL",
  category: "misc",
  use: '.getimage <image_url>',
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
    console.error(error);
    m.reply("❌ Failed to download the image. Please check the URL and try again.");
  }
});
