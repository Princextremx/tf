const { cmd } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["bo", "ob"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "🌟",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const status = `╭─ 「 *\`𝐗𝐓𝐑𝐄𝐌𝐄-𝐗𝐌𝐃\`* 」
│✨ *ʙᴏᴛ ɪs ᴀᴄᴛɪᴠᴇ & ᴏɴʟɪɴᴇ!*
│🧠 *ᴏᴡɴᴇʀ:* ${config.OWNER_NAME}
│⚡ *ᴠᴇʀsɪᴏɴ:* 1.0.0
│📝 *ᴘʀᴇғɪx:* [${config.PREFIX}]
│📳 *ᴍᴏᴅᴇ:* [${config.MODE}]
│💾 *ʀᴀᴍ:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
│🖥️ *ʜᴏsᴛ:* ${os.hostname()}
│⌛ *ᴜᴘᴛɪᴍᴇ:* ${runtime(process.uptime())}
╰────────────────❍`;

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/p01dj2.jpg` },
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363418161689316@newsletter',
                    newsletterName: '𝐗𝐓𝐑𝐄𝐌𝐄-𝐗𝐌𝐃',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
          
