// code by ⿻ ⌜ 𝐊𝐇𝐀𝐍 ⌟⿻⃮͛🇵🇰𖤐

const axios = require("axios");
const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "ss",
  alias: ["ssweb"],
  react: "💫",
  desc: "Download screenshot of a given link.",
  category: "other",
  use: ".ss <link>",
  filename: __filename,
}, 
async (conn, mek, m, {
  from, l, quoted, body, isCmd, command, args, q, isGroup, sender, 
  senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, 
  groupMetadata, groupName, participants, isItzcp, groupAdmins, 
  isBotAdmins, isAdmins, reply 
}) => {
  if (!q) {
    return reply("_*ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴜʀʟ ᴛᴏ ᴄᴀᴘᴛᴜʀᴇ ᴀ sᴄʀᴇᴇɴsʜᴏᴛ*_");
  }

  try {
    // created by jawad tech 
    const response = await axios.get(`https://api.davidcyriltech.my.id/ssweb?url=${q}`);
    const screenshotUrl = response.data.screenshotUrl;

    // give credit and use
    const imageMessage = {
      image: { url: screenshotUrl },
      caption: "*ʏᴏᴜʀ sᴄʀᴇᴇɴ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ*\n\n> *_ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ_*",
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363398101781980@newsletter',
          newsletterName: "𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗",
          serverMessageId: 143,
        },
      },
    };

    await conn.sendMessage(from, imageMessage, { quoted: m });
  } catch (error) {
    console.error(error);
    reply("*ғᴀɪʟᴇᴅ ᴛᴏ ᴄᴀᴘᴛᴜʀᴇ ᴛʜᴇ sᴄʀᴇᴇɴsʜᴏᴛ. ᴘʟᴇᴀsᴇ ᴛʀʏ ᴀɢᴀɪɴ*");
  }
});

// ⿻ ⌜ XTREME ⌟⿻⃮͛𖤐
