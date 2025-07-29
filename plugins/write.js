const { cmd } = require('../command');
const fs = require('fs');
const Jimp = require('jimp');
const path = require('path');

cmd({
  pattern: 'write',
  desc: 'Write text on an image',
  category: 'tools',
  filename: __filename
}, async (m, { qtext, rich }) => {
  if (!qtext) return m.reply("Please provide some text.\nEx: `write Reo Musashi`");

  try {
    // Charger l'image de fond
    const imagePath = path.join(__dirname, '../assets/lighter.jpg'); // Mets ici ton image par défaut
    const image = await Jimp.read(imagePath);

    // Configuration du texte
    const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    const text = qtext.toUpperCase();

    // Centrer le texte en bas de l’image
    const textWidth = Jimp.measureText(font, text);
    const textHeight = Jimp.measureTextHeight(font, text, image.bitmap.width);

    image.print(
      font,
      (image.bitmap.width - textWidth) / 2,
      image.bitmap.height - textHeight - 10,
      text
    );

    // Sauvegarde temporaire
    const outputPath = path.join(__dirname, '../temp', `write_${Date.now()}.jpg`);
    await image.writeAsync(outputPath);

    // Envoie l'image
    await rich.sendMessage(m.from, {
      image: fs.readFileSync(outputPath),
      caption: qtext
    }, { quoted: m });

    // Supprime l'image après envoi
    fs.unlinkSync(outputPath);
  } catch (e) {
    console.error(e);
    m.reply("❌ Error generating the image.");
  }
});
