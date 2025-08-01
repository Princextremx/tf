const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "ainfo",
    alias: ["siteinfo", "we"],
    desc: "Get website intel using GTech API", // Changed description
    category: "⌚ misc",
    react: "🕵️‍♂️", // Changed emoji to a spy/investigator
    filename: __filename
},
async (conn, mek, m, { args, reply }) => {
    try {
        const url = args[0];
        if (!url) return reply('_Example: *.webinfo https://your-rivals-front.com*_'); // FLEX-style prompt

        const apiKey = 'APIKEY'; // Replace with your actual API key
        const apiUrl = `https://gtech-api-xtp1.onrender.com/api/web/info?url=${encodeURIComponent(url)}&apikey=${apiKey}`;

        const { data } = await axios.get(apiUrl);

        if (!data || data.status !== "success" || !data.data) {
            return reply('🚫 *Fuggedaboutit!* Couldn\'t get the lowdown on that "joint." Double-check the address or my "contacts" might be compromised.'); // FLEX-style failure message
        }

        const info = data.data;

        const caption = `╭─❰ 𝐗𝐓𝐑𝐄𝐌𝐄-𝐗𝐌𝐃 ❱──➤ // D-style heading
┃ 🏷️ *The Name:* ${info.title || 'Unknown Ops'} // Xtreme-style terms
┃ 📃 *The Cover Story:* ${info.description || 'No Official Story'}
┃ 🏢 *The Boss/Publisher:* ${info.publisher || 'Unnamed Outfit'}
┃ 🗓️ *Established On:* ${info.date || 'Undisclosed Date'}
┃ 🖼️ *Mugshot Size:* ${info.image?.size_pretty || 'No Visual Intel'}
┃ 🌍 *The Address:* ${info.url || url}
╰──────────────➤

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`; // Added FLEX emperor branding

        // Fixed image thumbnail - you might want to change this to a more FLEX-style image
        const fixedImageUrl = 'https://files.catbox.moe/envb94.jpg'; // Consider replacing this with a relevant FLEX-style image if available
        const response = await axios.get(fixedImageUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data, 'binary');

        await conn.sendMessage(m.chat, {
            image: buffer,
            caption
        }, { quoted: m });

    } catch (e) {
        console.error("Error in webinfo command:", e);
        reply(`🚨 *Fuggedaboutit! Something went sideways, boss:* ${e.message}\n\n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`); // FLEX-style error with branding
    }
});
