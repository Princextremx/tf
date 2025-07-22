const { cmd } = require('../command');
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// remove only member
cmd({
    pattern: "removemembers",
    alias: ["kickall", "endgc", "endgroup"],
    desc: "*ʀᴇᴍᴏᴠᴇ ᴀʟʟ ɴᴏɴ-ᴀᴅᴍɪɴ ᴍᴇᴍʙᴇʀs ғʀᴏᴍ ᴛʜᴇ ɢʀᴏᴜᴘ*",
    react: "🗑️",
    category: "⛑️ group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, groupMetadata, groupAdmins, isBotAdmins, senderNumber, reply, isGroup
}) => {
    try {
        if (!isGroup) return reply("*ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs*");
        const botOwner = conn.user.id.split(":")[0];
        if (senderNumber !== botOwner) return reply("*ᴏɴʟʏ ᴛʜᴇ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ*");
        if (!isBotAdmins) return reply("*ɪ ɴᴇᴇᴅ ᴀᴅᴍɪɴ ʀɪɢʜᴛs to ᴘᴇʀғᴏʀᴍ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ*");

        const allParticipants = groupMetadata.participants;
        const nonAdmins = allParticipants.filter(p => !groupAdmins.includes(p.id));

        for (let p of nonAdmins) {
            try {
                await conn.groupParticipantsUpdate(from, [p.id], "remove");
                await sleep(2000);
            } catch (e) {
                console.error(`*ᴇʀʀᴏʀ ʀᴇᴍᴏᴠɪɴɢ ${p.id}:*`, e);
            }
        }

        reply("*☑️ ᴀʟʟ ɴᴏɴ-ᴀᴅᴍɪɴ ᴍᴇᴍʙᴇʀs ʜᴀᴠᴇ ʙᴇᴇɴ ʀᴇᴍᴏᴠᴇᴅ sɪʟᴇɴᴛʟʏ*");
    } catch (e) {
        console.error("Error:", e);
        reply("*⚠️ ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ʀᴇᴍᴏᴠɪɴɢ ɴᴏɴ-ᴀᴅᴍɪɴs*");
    }
});

// remove only admins
cmd({
    pattern: "removeadmins",
    alias: ["kickadmins", "kickall3", "deladmins"],
    desc: "*ʀᴇᴍᴏᴠᴇ ᴀʟʟ ᴀᴅᴍɪɴ ᴍᴇᴍʙᴇʀs ғʀᴏᴍ ᴛʜᴇ ɢʀᴏᴜᴘ, ᴇxᴄʟᴜᴅɪɴɢ ᴛʜᴇ ʙᴏᴛ ᴀɴᴅ ʙᴏᴛ ᴏᴡɴᴇʀ*",
    react: "🚮",
    category: "⛑️ group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, isGroup, senderNumber, groupMetadata, groupAdmins, isBotAdmins, reply
}) => {
    try {
        if (!isGroup) return reply("*ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs*");
        const botOwner = conn.user.id.split(":")[0];
        if (senderNumber !== botOwner) return reply("*ᴏɴʟʏ ᴛʜᴇ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ*");
        if (!isBotAdmins) return reply("*ɪ ɴᴇᴇᴅ ᴛᴏ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴇxᴇᴄᴜᴛᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ*");

        const allParticipants = groupMetadata.participants;
        const adminParticipants = allParticipants.filter(member => 
            groupAdmins.includes(member.id) && 
            member.id !== conn.user.id && 
            member.id !== `${botOwner}@s.whatsapp.net`
        );

        for (let p of adminParticipants) {
            try {
                await conn.groupParticipantsUpdate(from, [p.id], "remove");
                await sleep(2000);
            } catch (e) {
                console.error(`*ғᴀɪʟᴇᴅ ᴛᴏ ʀᴇᴍᴏᴠᴇ ${p.id}:*`, e);
            }
        }

        reply("*☑️ ᴀʟʟ ᴀᴅᴍɪɴ ᴍᴇᴍʙᴇʀs (ᴇxᴄᴇᴘᴛ ʙᴏᴛ ᴀɴᴅ ᴏᴡɴᴇʀ) ʜᴀᴠᴇ ʙᴇᴇɴ ʀᴇᴍᴏᴠᴇᴅ sɪʟᴇɴᴛʟʏ*");
    } catch (e) {
        console.error("Error:", e);
        reply("*⚠️ ᴇʀʀᴏʀ ᴡʜɪʟᴇ ʀᴇᴍᴏᴠɪɴɢ ᴀᴅᴍɪɴs*");
    }
});

// remove admins and members both
cmd({
    pattern: "removeall2",
    alias: ["kickall2", "endgc2", "endgroup2"],
    desc: "Remove all members and admins from the group, excluding the bot and bot owner.",
    react: "📢",
    category: "⛑️ group",
    filename: __filename,
}, 
async (conn, mek, m, {
    from, isGroup, senderNumber, groupMetadata, isBotAdmins, reply
}) => {
    try {
        if (!isGroup) return reply("*ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ɪɴ ɢʀᴏᴜᴘs*");
        const botOwner = conn.user.id.split(":")[0];
        if (senderNumber !== botOwner) return reply("*ᴏɴʟʏ ᴛʜᴇ ʙᴏᴛ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ*");
        if (!isBotAdmins) return reply("*ɪ ɴᴇᴇᴅ ᴛᴏ ʙᴇ ᴀɴ ᴀᴅᴍɪɴ ᴛᴏ ᴇxᴇᴄᴜᴛᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ*");

        const allParticipants = groupMetadata.participants;
        const participantsToRemove = allParticipants.filter(
            p => p.id !== conn.user.id && p.id !== `${botOwner}@s.whatsapp.net`
        );

        for (let p of participantsToRemove) {
            try {
                await conn.groupParticipantsUpdate(from, [p.id], "remove");
                await sleep(2000);
            } catch (e) {
                console.error(`*ғᴀɪʟᴇᴅ ᴛᴏ ʀᴇᴍᴏᴠᴇ ${p.id}:*`, e);
            }
        }

        reply("*☑️ All ᴍᴇᴍʙᴇʀs (ᴇxᴄᴇᴘᴛ ʙᴏᴛ ᴀɴᴅ ᴏᴡɴᴇʀ) ʜᴀᴠᴇ ʙᴇᴇɴ ʀᴇᴍᴏᴠᴇᴅ sɪʟᴇɴᴛʟʏ*");
    } catch (e) {
        console.error("Error:", e);
        reply("*⚠️ ᴇʀʀᴏʀ ᴡʜɪʟᴇ ʀᴇᴍᴏᴠɪɴɢ ᴍᴇᴍʙᴇʀs*");
    }
});
