const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');

cmd({
  pattern: "owner",
  react: "💫", 
  alias: ["kerm"],
  desc: "Get owner number",
  category: "⌚ misc",
  filename: __filename
}, async (conn, mek, m, { from }) => {
  try {
    const owners = [
      { number: '+529145550855', name: 'ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ', organization: 'ᴘʀɪɴᴄᴇ ᴛᴇᴀᴍ' }
    ];

    for (let i = 0; i < owners.length; i++) {
      const owner = owners[i];
      const vcfContent = `BEGIN:VCARD\n` +
        `VERSION:3.0\n` +
        `FN:${owner.name}\n` +
        `ORG:${owner.organization};\n` +
        `TEL;TYPE=CELL;TYPE=VOICE:${owner.number}\n` +
        `END:VCARD`;

      const fileName = `owner_${i}.vcf`;
      const filePath = path.join(__dirname, fileName);
      fs.writeFileSync(filePath, vcfContent);

      await conn.sendMessage(from, {
        document: fs.readFileSync(filePath),
        fileName: fileName,
        mimetype: 'text/vcard',
        caption: `✨ ʜᴇʀᴇ ɪs ᴛʜᴇ ᴄᴏɴᴛᴀᴄᴛ ᴏғ *${owner.name}* ✨`
      }, { quoted: mek });

      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error(error);
    await conn.sendMessage(from, {
      text: 'Sorry, there was an error retrieving owner contacts.'
    }, { quoted: mek });
  }
});
