const { cmd } = require('../command');
const fs = require('fs');
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');

cmd({
  pattern: 'write',
  desc: 'Write text on an image',
  category: '🖥️ tools',
  filename: __filename
}, async (m, { qtext, rich }) => {
  if (!qtext) return m.reply("Please provide some text.\nEx: `write Reo Musashi`");
  
  try {
    // image de fond
    const imagePath = path.join(__dirname, '../assets/lighter.jpg');
    const backgroundImage = await loadImage(imagePath);
    
    // Créer le canvas avec les dimensions de l'image
    const canvas = createCanvas(backgroundImage.width, backgroundImage.height);
    const ctx = canvas.getContext('2d');
    
    // Dessiner l'image de fond
    ctx.drawImage(backgroundImage, 0, 0);
    
    // Configuration du texte
    const text = qtext.toUpperCase();
    const fontSize = Math.floor(backgroundImage.width / 15); // Taille adaptative
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    
    // Mesurer le texte pour le centrer
    const textMetrics = ctx.measureText(text);
    const textWidth = textMetrics.width;
    const textHeight = fontSize;
    
    // Position du texte (centré en bas)
    const x = backgroundImage.width / 2;
    const y = backgroundImage.height - 20;
    
    // Dessiner le contour du texte (pour meilleure lisibilité)
    ctx.strokeText(text, x, y);
    // Dessiner le texte principal
    ctx.fillText(text, x, y);
    
    // Créer le dossier temp s'il n'existe pas
    const tempDir = path.join(__dirname, '../temp');
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    // Sauvegarde temporaire
    const outputPath = path.join(tempDir, `write_${Date.now()}.jpg`);
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.9 });
    fs.writeFileSync(outputPath, buffer);
    
    // Envoie l'image
    await rich.sendMessage(m.from, {
      image: fs.readFileSync(outputPath),
      caption: `✨ Text: ${qtext}`
    }, { quoted: m });
    
    // Supprime l'image après envoi
    fs.unlinkSync(outputPath);
    
  } catch (e) {
    console.error('Error in write command:', e);
    m.reply("❌ Error generating the image. Please check if the background image exists.");
  }
});
