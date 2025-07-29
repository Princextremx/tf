const { cmd } = require('../command');
const fs = require('fs');
const Jimp = require('jimp');
const path = require('path');

cmd({
  pattern: 'write',
  desc: 'Write text at the bottom of an image',
  category: '🖥️ tools',
  filename: __filename
}, async (m, { qtext, rich }) => {
  if (!qtext) return m.reply('Please write some text.\nEx: write Reo Musashi');

  const image = await Jimp.read('./assets/lighter.jpg'); // image de fond
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  const text = qtext.toUpperCase();

  const textWidth = Jimp.measureText(font, text);
  const textHeight = Jimp.measureTextHeight(font, text, image.bitmap.width);

  image.print(
    font,
    (image.bitmap.width - textWidth) / 2,                   // Centré horizontalement
    image.bitmap.height - textHeight - 10,                 // En bas avec une marge
    text
  );

  const output = './temp/write.jpg';
  await image.writeAsync(output);

  await rich.sendMessage(m.from, {
    image: fs.readFileSync(output),
    caption: qtext
  }, { quoted: m });
});
