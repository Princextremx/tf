

const axios = require("axios");
const { cmd, commands } = require('../command');

cmd({
    pattern: "insta",
    alias: ["igdl", "reel", "ig", "instadl"],
    desc: "Download Instagram reels or image posts",
    category: "downloader",
    react: "⏳",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide an Instagram post or reel link.");
        if (!q.includes("instagram.com")) return reply("Invalid Instagram link.");

        const apiUrl = `https://api-aswin-sparky.koyeb.app/api/downloader/igdl?url=${encodeURIComponent(url)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.data) {
            await react("❌"); 
            return reply("Failed to fetch Instagram media.");
        }

        const { username, fullname, caption, likes, comments, followed, download } = data.data;

        const captionText = `📸 *ɪɴsᴛᴀɢʀᴀᴍ ᴘᴏsᴛ* 📸\n\n` +
                            `👤 *ᴜsᴇʀ:* ${fullname} (@${username})\n` +
                            `❤️ *ʟɪᴋᴇs:* ${likes}\n💬 *Comments:* ${comments}\n👥 *ғᴏʟʟᴏᴡᴇʀs:* ${followed}\n` +
                            `📝 *ᴄᴀᴘᴛɪᴏɴ:*\n${caption || "ɴᴏ ᴄᴀᴘᴛɪᴏɴ ᴀᴠᴀɪʟᴀʙʟᴇ."}`;

        for (const media of download) {
            if (media.type === "image") {
                await conn.sendMessage(from, {
                    image: { url: media.url },
                    caption: captionText,
                    contextInfo: { 
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363418161689316@newsletter',
                            newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                            serverMessageId: 143
                        }
                    }
                }, { quoted: mek });
            } else if (media.type === "video") {
                await conn.sendMessage(from, {
                    video: { url: media.url },
                    caption: captionText,
                    contextInfo: { 
                        mentionedJid: [m.sender],
                        forwardingScore: 999,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363418161689316@newsletter',
                            newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                            serverMessageId: 143
                        }
                    }
                }, { quoted: mek });
            }
        }

        await react("✅"); // React after successfully sending media
    } catch (e) {
        console.error("Error in Instagram downloader command:", e);
        await react("❌");
        reply(`An error occurred: ${e.message}`);
    }
});
