const { cmd } = require("../command");
const config = require("../config");
const Jimp = require("jimp");
const fs = require("fs");
const os = require("os");
const path = require("path");

cmd({
  pattern: "write",
  desc: "Write text on image",
  category: "tools",
  filename: __filename
}, async (conn, m, msg, { text }) => {
  let outPath;
  try {
    // Check if user replied to an image
    if (!m.quoted || !m.quoted.message || !m.quoted.message.imageMessage) {
      return m.reply("🖼️ Please reply to an image with: *.write Your text here*");
    }

    if (!text) return m.reply("✏️ You must provide text. Example: *.write Hello World*");

    // Download the quoted image
    const imgBuffer = await conn.downloadMediaMessage(m.quoted);

    // Load image using Jimp
    const image = await Jimp.read(imgBuffer);

    // Choose dynamic font size based on image width
    let font;
    if (image.bitmap.width > 1000) {
      font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
    } else if (image.bitmap.width > 500) {
      font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    } else {
      font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
    }

    const textWidth = image.bitmap.width - 40;
    const textHeight = Jimp.measureTextHeight(font, text, textWidth);
    const bgHeight = textHeight + 40;

    // Optional: add a semi-transparent background under the text
    const bg = new Jimp(textWidth + 40, bgHeight, "#00000080");
    image.composite(bg, 20, image.bitmap.height - bgHeight - 20);

    // Write the text
    image.print(
      font,
      20,
      image.bitmap.height - textHeight - 40,
      {
        text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
      },
      textWidth,
      textHeight
    );

    // Save to temp file
    outPath = path.join(os.tmpdir(), `write_${Date.now()}.jpg`);
    await image.quality(90).writeAsync(outPath);

    // Send the image back
    await conn.sendMessage(m.from, {
      image: fs.readFileSync(outPath),
      caption: "✅ Text added to image!"
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("❌ Failed to process the image.");
  } finally {
    if (outPath && fs.existsSync(outPath)) fs.unlinkSync(outPath); // Cleanup
  }
});
