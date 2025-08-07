const { cmd } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "bot",
    alias: ["bott", "bots"],
    desc: "thanks to dev for helping",
    category: "misc",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from }) => {
    try {
        const uptime = runtime(process.uptime());
        const startTime = new Date(Date.now() - process.uptime() * 1000);
        const message = `╭─ 「 *\`BOT ONLINE\`* 」
│꙳ *ʙᴏᴛ ɴᴀᴍᴇ* ↔ xᴛʀᴇᴍᴇ xᴍᴅ
│꙳ *sᴛᴀᴛᴜs* ↔ ᴏɴʟɪɴᴇ
│꙳ *ᴀᴜᴛᴏ ʀᴇsᴛᴀʀᴛ* ↔ ᴏɴʟɪɴᴇ
│꙳ *ʙᴏᴛ ʀᴜɴ* ↔${uptime}
│꙳ *ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ*
╰────────────────❍
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/mry39g.jpg' },
            caption: message,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 1000,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363418161689316@newsletter', // remplace avec ton vrai newsletterJid si besoin
                    newsletterName: '𝐗𝐓𝐑𝐄𝐌𝐄-𝐗𝐌𝐃',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (err) {
        console.error("ThanksTo Error:", err);
        await conn.sendMessage(from, { text: `Error: ${err.message}` }, { quoted: mek });
    }
});
