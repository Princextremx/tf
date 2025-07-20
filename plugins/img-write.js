const { cmd } = require("../command");
const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const os = require("os");

cmd({
  pattern: "write",
  desc: "Write text on an image",
  category: "tools",
  filename: __filename
}, async (conn, m, msg) => {
  try {
    if (!m.quoted || !m.quoted.imageMessage) {
      return m.reply("*📸 ʀᴇᴘʟʏ ᴛᴏ ᴀɴ ɪᴍᴀɢᴇ ᴡɪᴛʜ ᴛʜᴇ ᴄᴏᴍᴍᴀɴᴅ ʟɪᴋᴇ:* *ᴡʀɪᴛᴇ xᴛʀᴇᴍᴇ xᴍᴅ*");
    }

    const text = msg.split(" ").slice(1).join(" ");
    if (!text) return m.reply("*✏️ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴛʜᴇ ᴛᴇxᴛ. ᴇxᴀᴍᴘʟᴇ:* *.ᴡʀɪᴛᴇ ʜᴇʟʟᴏ ᴡᴏʀʟᴅ*");

    const imgBuffer = await conn.downloadMediaMessage(m.quoted);
    const img = await Jimp.read(imgBuffer);

    const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
    const margin = 10;
    const textWidth = img.bitmap.width - 2 * margin;
    const textHeight = Jimp.measureTextHeight(font, text, textWidth);

    // Draw background box (optional style)
    const boxHeight = textHeight + 40;
    const box = new Jimp(img.bitmap.width, boxHeight, '#00000088'); // semi-transparent black
    img.composite(box, 0, img.bitmap.height - boxHeight);

    // Write text centered at bottom
    img.print(
      font,
      margin,
      img.bitmap.height - textHeight - 20,
      {
        text,
        alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
        alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE
      },
      img.bitmap.width - margin * 2,
      textHeight
    );

    const outputPath = path.join(os.tmpdir(), `write_${Date.now()}.jpg`);
    await img.quality(90).writeAsync(outputPath);

    await conn.sendMessage(m.from, { image: fs.readFileSync(outputPath), caption: `*✅ ᴛᴇxᴛ ᴀᴅᴅᴇᴅ:* *${text}*` }, { quoted: m });

    fs.unlinkSync(outputPath);
  } catch (err) {
    console.error(err);
    m.reply("*❌ ᴇʀʀᴏʀ ᴀᴅᴅɪɴɢ ᴛᴇxᴛ ᴛᴏ ɪᴍᴀɢᴇ*");
  }
});
