const fs = require("fs");
const path = require("path");
const { jidNormalizedUser } = require("baileys");
const { cmd } = require("../command");

const SUDO_PATH = path.join(__dirname, "../lib/sudo.json");

// 📂 Vérifie et initialise le fichier sudo.json
const ensureSudoFile = () => {
  if (!fs.existsSync(SUDO_PATH)) {
    fs.writeFileSync(SUDO_PATH, JSON.stringify([]));
  }
};
ensureSudoFile();

// 🔎 Fonction pour identifier le JID cible
const getTargetJid = (m, args) => {
  if (m.mentionedJid && m.mentionedJid.length > 0) {
    return jidNormalizedUser(m.mentionedJid[0]);
  } else if (m.quoted?.sender) {
    return jidNormalizedUser(m.quoted.sender);
  } else if (args[0]) {
    const num = args[0].replace(/\D/g, "");
    return jidNormalizedUser(num + "@s.whatsapp.net");
  }
  return null;
};

// ➕ setsudo
cmd({
  pattern: "setsudo",
  alias: ["addsudo", "sudoadd"],
  desc: "Add a user to sudo list",
  category: "owner",
  react: "😇",
  filename: __filename
}, async (conn, mek, m, { from, args, reply, isCreator }) => {
  try {
    if (!isCreator) return reply("_📛 This command is restricted to the owner._");

    let target = getTargetJid(m, args);
    if (!target) return reply("❌ Please reply, mention or provide a valid number.");

    let sudoList = JSON.parse(fs.readFileSync(SUDO_PATH, "utf-8"));

    if (sudoList.includes(target)) {
      return reply("⚠️ @" + target.split("@")[0] + " is already a sudo user.", { mentions: [target] });
    }

    sudoList.push(target);
    fs.writeFileSync(SUDO_PATH, JSON.stringify([...new Set(sudoList)], null, 2));

    await conn.sendMessage(from, {
      image: { url: "https://files.catbox.moe/vtbi4a.jpg" },
      caption: "✅ @" + target.split("@")[0] + " has been *added* to the sudo list."
    }, { quoted: mek, mentions: [target] });
  } catch (err) {
    console.error(err);
    reply("❌ Error: " + err.message);
  }
});

// ⤵️ delsudo
cmd({
  pattern: "delsudo",
  alias: ["sudodel", "delowner"],
  desc: "Remove a user from sudo list",
  category: "owner",
  react: "🫩",
  filename: __filename
}, async (conn, mek, m, { from, args, reply, isCreator }) => {
  try {
    if (!isCreator) return reply("_📛 This command is restricted to the owner._");

    let target = getTargetJid(m, args);
    if (!target) return reply("❌ Please reply, mention or provide a valid number.");

    let sudoList = JSON.parse(fs.readFileSync(SUDO_PATH, "utf-8"));

    if (!sudoList.includes(target)) {
      return reply("⚠️ @" + target.split("@")[0] + " is not in the sudo list.", { mentions: [target] });
    }

    sudoList = sudoList.filter(u => u !== target);
    fs.writeFileSync(SUDO_PATH, JSON.stringify(sudoList, null, 2));

    await conn.sendMessage(from, {
      image: { url: "https://files.catbox.moe/ee7do3.jpg" },
      caption: "✅ @" + target.split("@")[0] + " has been *removed* from the sudo list."
    }, { quoted: mek, mentions: [target] });
  } catch (err) {
    console.error(err);
    reply("❌ Error: " + err.message);
  }
});

// 📋 listsudo
cmd({
  pattern: "listsudo",
  alias: ["sudolist", "listowner"],
  desc: "List all sudo users",
  category: "owner",
  react: "📋",
  filename: __filename
}, async (conn, mek, m, { from, reply, isCreator }) => {
  try {
    if (!isCreator) return reply("_📛 This command is restricted to the owner._");

    let sudoList = JSON.parse(fs.readFileSync(SUDO_PATH, "utf-8"));
    sudoList = [...new Set(sudoList)];

    if (sudoList.length === 0) return reply("❌ No sudo users found.");

    let list = sudoList.map((u, i) => `${i + 1}. @${u.split("@")[0]}`).join("\n");

    await conn.sendMessage(from, {
      image: { url: "https://files.catbox.moe/vz98kd.jpg" },
      caption: "*🤴 List of Sudo Users:*\n\n" + list,
      mentions: sudoList
    }, { quoted: mek });
  } catch (err) {
    console.error(err);
    reply("❌ Error: " + err.message);
  }
});
