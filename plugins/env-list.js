const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "settings",
  alias: ["setting", "env"],
  react: "⚙️",
  desc: "Show current bot settings",
  category: "owner",
  filename: __filename
}, async (conn, m, msg, { from, isOwner }) => {
  try {
    if (!isOwner) return m.reply("*⛔ You must be the bot owner to use this command.*");

    const isEnabled = (val) => val === "true" ? "✅" : "❌";

    const settingsList = `
╭─〔 ⚙️ BOT SETTINGS 〕─⬣
│ 1. Auto Reply: ${isEnabled(config.AUTO_REPLY)}
│ 2. Auto React: ${isEnabled(config.AUTO_REACT)}
│ 3. Auto Sticker: ${isEnabled(config.AUTO_STICKER)}
│ 4. Auto Voice: ${isEnabled(config.AUTO_VOICE)}
│
│ 5. Anti-Link: ${isEnabled(config.ANTI_LINK)}
│ 6. Anti-Bad: ${isEnabled(config.ANTI_BAD)}
│ 7. Delete Links: ${isEnabled(config.DELETE_LINKS)}
│
│ 8. Status Seen: ${isEnabled(config.AUTO_STATUS_SEEN)}
│ 9. Status Reply: ${isEnabled(config.AUTO_STATUS_REPLY)}
│ 10. Status React: ${isEnabled(config.AUTO_STATUS_REACT)}
│
│ 11. Always Online: ${isEnabled(config.ALWAYS_ONLINE)}
│ 12. Read Message: ${isEnabled(config.READ_MESSAGE)}
│ 13. Read CMD: ${isEnabled(config.READ_CMD)}
│ 14. Public Mode: ${isEnabled(config.PUBLIC_MODE)}
│
│ 15. Auto Typing: ${isEnabled(config.AUTO_TYPING)}
│ 16. Auto Recording: ${isEnabled(config.AUTO_RECORDING)}
╰────────────⬣

🔧 Reply with a number (e.g. 1) to activate the feature.
`;

    const sent = await conn.sendMessage(from, {
      image: { url: "https://telegra.ph/file/170a783e3c6d897847804.jpg" },
      caption: settingsList
    }, { quoted: m });

    conn.ev.once('messages.upsert', async (up) => {
      const replyMsg = up.messages[0];
      const body = replyMsg?.message?.conversation || replyMsg?.message?.extendedTextMessage?.text;
      const context = replyMsg?.message?.extendedTextMessage?.contextInfo?.stanzaId;

      if (context !== sent.key.id) return;

      const num = body.trim();
      const settingsMap = {
        "1": "AUTO_REPLY", "2": "AUTO_REACT", "3": "AUTO_STICKER", "4": "AUTO_VOICE",
        "5": "ANTI_LINK", "6": "ANTI_BAD", "7": "DELETE_LINKS",
        "8": "AUTO_STATUS_SEEN", "9": "AUTO_STATUS_REPLY", "10": "AUTO_STATUS_REACT",
        "11": "ALWAYS_ONLINE", "12": "READ_MESSAGE", "13": "READ_CMD", "14": "PUBLIC_MODE",
        "15": "AUTO_TYPING", "16": "AUTO_RECORDING"
      };

      if (!settingsMap[num]) {
        return conn.sendMessage(from, { text: "❌ Invalid option. Please choose a valid number." }, { quoted: replyMsg });
      }

      const envKey = settingsMap[num];

      await conn.sendMessage(from, { text: `.update ${envKey}:true` });
      await conn.sendMessage(from, { text: `.restart` });

    });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(from, { text: "❌ An error occurred while processing the settings." });
  }
});
