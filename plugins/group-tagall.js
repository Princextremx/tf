const config = require('../config');
const { cmd, commands } = require('../command');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions');

cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["gc_tagall"],
    desc: "To Tag all Members",
    category: "⛑️ group",
    use: '.tagall [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");
        
        const botOwner = conn.user.id.split(":")[0]; // Extract bot owner's number
        const senderJid = senderNumber + "@s.whatsapp.net";

        if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
            return reply("❌ ᴏɴʟʏ ɢʀᴏᴜᴘ ᴀᴅᴍɪɴs ᴏʀ ᴛʜᴇ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ");
        }

        // Ensure group metadata is fetched properly
        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let totalMembers = participants ? participants.length : 0;
        if (totalMembers === 0) return reply("❌ No members found in this group.");

        let emojis = ['│❉', '│❖', '│❍', '│❂', '│✷', '│☉', '│❋'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        // Proper message extraction
        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "ᴀᴛᴛᴇɴᴛɪᴏɴ ᴇᴠᴇʀʏᴏɴᴇ"; // Default message

        let teks = `╭─ 「 *\`TAG ALL\`* 」\n│✺ ɢʀᴏᴜᴘ : *${groupName}*\n│✺ ᴍᴇᴍʙᴇʀs : *${totalMembers}*\n│✺ ᴍᴇssᴀɢᴇ: *${message}*\n╰─────────────❍\n\n╭─ 「 *\`XTREME TAG\`* 」\n`;

        for (let mem of participants) {
            if (!mem.id) continue; // Prevent undefined errors
            teks += `${randomEmoji} @${mem.id.split('@')[0]}\n`;
        }

        teks += "└──❖ 𝐗𝐓𝐑𝐄𝐌𝐄-𝐗𝐌𝐃 ❖──";

        // Send the image along with the message
        const imageUrl = "profilePictureUrl";  // Replace with your image URL or local image path
        const imageBuffer = await getBuffer(imageUrl);

        conn.sendMessage(from, { 
            image: imageBuffer, 
            caption: teks, 
            mentions: participants.map(a => a.id)
        }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ *Error Occurred !!*\n\n${e.message || e}`);
    }
});

