const { cmd } = require('../command');
const config = require('../config');

const isEnabled = (v) => v === "true" ? "✅" : "❌";

cmd({
  pattern: "settings",
  alias: ["setting", "env"],
  react: "⚙️",
  desc: "View and configure bot settings",
  category: "owner",
  filename: __filename
}, async (conn, m, msg, { from, isOwner }) => {
  try {
    if (!isOwner) return m.reply("*⛔ Only the bot owner can use this command.*");

    const menu = `
*╭─❏ BOT SETTINGS PANEL*
│
│ 1.1 - Auto Reply: ${isEnabled(config.AUTO_REPLY)}
│ 1.2 - Auto React: ${isEnabled(config.AUTO_REACT)}
│ 1.3 - Auto Sticker: ${isEnabled(config.AUTO_STICKER)}
│ 1.4 - Auto Voice: ${isEnabled(config.AUTO_VOICE)}
│
│ 2.1 - Anti-Link: ${isEnabled(config.ANTI_LINK)}
│ 2.2 - Anti-Bad: ${isEnabled(config.ANTI_BAD)}
│ 2.3 - Delete Links: ${isEnabled(config.DELETE_LINKS)}
│
│ 3.1 - Status Seen: ${isEnabled(config.AUTO_STATUS_SEEN)}
│ 3.2 - Status Reply: ${isEnabled(config.AUTO_STATUS_REPLY)}
│ 3.3 - Status React: ${isEnabled(config.AUTO_STATUS_REACT)}
│
│ 4.1 - Always Online: ${isEnabled(config.ALWAYS_ONLINE)}
│ 4.2 - Read Message: ${isEnabled(config.READ_MESSAGE)}
│ 4.3 - Read CMD: ${isEnabled(config.READ_CMD)}
│ 4.4 - Public Mode: ${isEnabled(config.PUBLIC_MODE)}
│
│ 5.1 - Auto Typing: ${isEnabled(config.AUTO_TYPING)}
│ 5.2 - Auto Recording: ${isEnabled(config.AUTO_RECORDING)}
│
*╰─❏ Reply with option number (e.g. 1.1)*
    `.trim();

    const sent = await conn.sendMessage(from, {
      image: { url: "https://files.catbox.moe/iopat1.jpg" },
      caption: menu
    }, { quoted: m });

    const settingsMap = {
      "1.1": "AUTO_REPLY",
      "1.2": "AUTO_REACT",
      "1.3": "AUTO_STICKER",
      "1.4": "AUTO_VOICE",
      "2.1": "ANTI_LINK",
      "2.2": "ANTI_BAD",
      "2.3": "DELETE_LINKS",
      "3.1": "AUTO_STATUS_SEEN",
      "3.2": "AUTO_STATUS_REPLY",
      "3.3": "AUTO_STATUS_REACT",
      "4.1": "ALWAYS_ONLINE",
      "4.2": "READ_MESSAGE",
      "4.3": "READ_CMD",
      "4.4": "PUBLIC_MODE",
      "5.1": "AUTO_TYPING",
      "5.2": "AUTO_RECORDING"
    };

    // Créer un listener temporaire
    const onReply = async (update) => {
      const msgReceived = update.messages[0];
      if (!msgReceived?.message) return;

      const text = msgReceived.message?.conversation || msgReceived.message?.extendedTextMessage?.text;
      const replyTo = msgReceived.message?.extendedTextMessage?.contextInfo?.stanzaId;

      if (replyTo !== sent.key.id) return;

      const key = settingsMap[text.trim()];
      if (!key) return conn.sendMessage(from, { text: "❌ Invalid option. Please choose a correct number." });

      await conn.sendMessage(from, { text: `.update ${key}:true` });
      await conn.sendMessage(from, { text: `.restart` });

      conn.ev.off('messages.upsert', onReply); // Retirer le listener après réponse
    };

    conn.ev.on('messages.upsert', onReply);

  } catch (err) {
    console.error(err);
    m.reply("❌ An error occurred while showing settings.");
  }
});
