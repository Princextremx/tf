const { cmd } = require('../command');
const config = require('../config');

const isEnabled = (v) => v === "true" ? "✅" : "❌";

cmd({
  pattern: "settings",
  alias: ["setting", "env"],
  react: "⚙️",
  desc: "Show & toggle bot settings",
  category: "owner",
  filename: __filename
}, async (conn, m, msg, { from, isOwner }) => {
  try {
    if (!isOwner) return m.reply("⛔ *Only the bot owner can use this command.*");

    const menu = `*🔧 BOT SETTINGS PANEL*

1. Auto Reply: ${isEnabled(config.AUTO_REPLY)}
2. Auto React: ${isEnabled(config.AUTO_REACT)}
3. Auto Sticker: ${isEnabled(config.AUTO_STICKER)}
4. Auto Voice: ${isEnabled(config.AUTO_VOICE)}

5. Anti-Link: ${isEnabled(config.ANTI_LINK)}
6. Anti-Bad: ${isEnabled(config.ANTI_BAD)}
7. Delete Links: ${isEnabled(config.DELETE_LINKS)}

8. Status Seen: ${isEnabled(config.AUTO_STATUS_SEEN)}
9. Status Reply: ${isEnabled(config.AUTO_STATUS_REPLY)}
10. Status React: ${isEnabled(config.AUTO_STATUS_REACT)}

11. Always Online: ${isEnabled(config.ALWAYS_ONLINE)}
12. Read Message: ${isEnabled(config.READ_MESSAGE)}
13. Read CMD: ${isEnabled(config.READ_CMD)}
14. Public Mode: ${isEnabled(config.PUBLIC_MODE)}

15. Auto Typing: ${isEnabled(config.AUTO_TYPING)}
16. Auto Recording: ${isEnabled(config.AUTO_RECORDING)}

_Reply with a number (e.g. 1) to enable that feature_`;

    const sent = await conn.sendMessage(from, {
      image: { url: "https://files.catbox.moe/iopat1.jpg" },
      caption: menu
    }, { quoted: m });

    const features = {
      "1": "AUTO_REPLY",
      "2": "AUTO_REACT",
      "3": "AUTO_STICKER",
      "4": "AUTO_VOICE",
      "5": "ANTI_LINK",
      "6": "ANTI_BAD",
      "7": "DELETE_LINKS",
      "8": "AUTO_STATUS_SEEN",
      "9": "AUTO_STATUS_REPLY",
      "10": "AUTO_STATUS_REACT",
      "11": "ALWAYS_ONLINE",
      "12": "READ_MESSAGE",
      "13": "READ_CMD",
      "14": "PUBLIC_MODE",
      "15": "AUTO_TYPING",
      "16": "AUTO_RECORDING"
    };

    const handler = async (up) => {
      const msg = up.messages[0];
      if (!msg.message || !msg.key.fromMe) return;

      const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
      const replyTo = msg.message?.extendedTextMessage?.contextInfo?.stanzaId;

      if (replyTo !== sent.key.id) return;

      const key = features[text.trim()];
      if (!key) return m.reply("❌ *Invalid option. Please choose a valid number from the menu.*");

      await conn.sendMessage(from, { text: `.update ${key}:true` });
      await conn.sendMessage(from, { text: `.restart` });
    };

    conn.ev.once("messages.upsert", handler);

  } catch (e) {
    console.error(e);
    m.reply("❌ *An error occurred while loading the settings.*");
  }
});
