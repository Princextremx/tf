const fs = require("fs");
const path = require("path");
const { cmd } = require("../command");

const OWNER_PATH = path.join(__dirname, "../lib/sudo.json");

// Ensure the sudo.json file exists
const ensureOwnerFile = () => {
  if (!fs.existsSync(OWNER_PATH)) {
    fs.writeFileSync(OWNER_PATH, JSON.stringify([]));
  }
};

// Command: Add a temporary owner
cmd({
    pattern: "setsudo",
    alias: ["sudoadd", "addowner"],
    desc: "Add a temporary owner",
    category: "owner",
    react: "🔝",
    filename: __filename
}, async (conn, mek, m, { from, args, q, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("_❗ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ʙʏ ᴍʏ ᴏᴡɴᴇʀ!_");

        // Identify the target user
        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("*_❌ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ɴᴜᴍʙᴇʀ ᴏʀ ᴛᴀɢ/ʀᴇᴘʟʏ ᴀ ᴜsᴇʀ_*");

        let owners = JSON.parse(fs.readFileSync(OWNER_PATH, "utf-8"));

        if (owners.includes(target)) {
            return reply("_*❌ ᴛʜɪs ᴜsᴇʀ ɪs ᴀʟʀᴇᴀᴅʏ ᴀ ᴛᴇᴍᴘᴏʀᴀʀʏ ᴏᴡɴᴇʀ*_");
        }

        owners.push(target);
        const uniqueOwners = [...new Set(owners)];
        fs.writeFileSync(OWNER_PATH, JSON.stringify(uniqueOwners, null, 2));

        const successMsg = "_*✅ sᴜᴄᴄᴇssғᴜʟʟʏ ᴀᴅᴅᴇᴅ ᴜsᴇʀ ᴀs ᴛᴇᴍᴘᴏʀᴀʀʏ ᴏᴡɴᴇʀ_*";
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/1rioah.jpg" },
            caption: successMsg
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

// Command: Remove a temporary owner
cmd({
    pattern: "delsudo",
    alias: ["delowner", "sudodel"],
    desc: "Remove a temporary owner",
    category: "owner",
    react: "⬇️",
    filename: __filename
}, async (conn, mek, m, { from, args, q, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("_❗ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ʙʏ ᴍʏ ᴏᴡɴᴇʀ!_");

        let target = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");

        if (!target) return reply("*_❌ ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ɴᴜᴍʙᴇʀ ᴏʀ ᴛᴀɢ/ʀᴇᴘʟʏ ᴀ ᴜsᴇʀ_*");

        let owners = JSON.parse(fs.readFileSync(OWNER_PATH, "utf-8"));

        if (!owners.includes(target)) {
            return reply("*_❌ ᴜsᴇʀ ɴᴏᴛ ғᴏᴜɴᴅ ɪɴ ᴏᴡɴᴇʀ ʟɪsᴛ_*");
        }

        const updated = owners.filter(x => x !== target);
        fs.writeFileSync(OWNER_PATH, JSON.stringify(updated, null, 2));

        const successMsg = "_*✅ sᴜᴄᴄᴇssғᴜʟʟʏ ʀᴇᴍᴏᴠᴇᴅ ᴜsᴇʀ ᴀs ᴛᴇᴍᴘᴏʀᴀʀʏ ᴏᴡɴᴇʀ*_";
        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/p3hqkn.jpg" },
            caption: successMsg
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});

// Command: List all temporary owners
cmd({
    pattern: "listsudo",
    alias: ["listowner"],
    desc: "List all temporary owners",
    category: "owner",
    react: "📄",
    filename: __filename
}, async (conn, mek, m, { from, isCreator, reply }) => {
    try {
        if (!isCreator) return reply("_❗ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ᴄᴀɴ ᴏɴʟʏ ʙᴇ ᴜsᴇᴅ ʙʏ ᴍʏ ᴏᴡɴᴇʀ!_");

        let owners = JSON.parse(fs.readFileSync(OWNER_PATH, "utf-8"));
        owners = [...new Set(owners)];

        if (owners.length === 0) {
            return reply("_*❌ ɴᴏ ᴛᴇᴍᴘᴏʀᴀʀʏ ᴏᴡɴᴇʀs ғᴏᴜɴᴅ*_");
        }

        let listMessage = "*_🤴 ʟɪsᴛ ᴏғ sᴜᴅᴏ ᴏᴡɴᴇʀs:_*\n\n";
        owners.forEach((owner, i) => {
            listMessage += `${i + 1}. ${owner.replace("@s.whatsapp.net", "")}\n`;
        });

        await conn.sendMessage(from, {
            image: { url: "https://files.catbox.moe/8vy8kc.jpg" },
            caption: listMessage
        }, { quoted: mek });
    } catch (err) {
        console.error(err);
        reply("❌ Error: " + err.message);
    }
});
                
