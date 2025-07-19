const { cmd } = require('../command');
const config = require('../config');
const os = require("os");

// Helper function to format ON/OFF
const isEnabled = (value) => value === "true" ? "✅" : "❌";

cmd({
  pattern: "settings",
  alias: ["setting", "env"],
  react: "⚙️",
  desc: "Display bot feature settings",
  category: "owner",
  filename: __filename
}, async (conn, mek, m, {
  from, isOwner, reply
}) => {
  try {
    if (!isOwner) return reply("*⛔ You are not the owner.*");

    let desc = `*╭⭑━━➤ BOT SETTINGS*
*│➭ 1.1 - Auto Reply:* ${isEnabled(config.AUTO_REPLY)}
*│➭ 1.2 - Auto React:* ${isEnabled(config.AUTO_REACT)}
*│➭ 1.3 - Auto Sticker:* ${isEnabled(config.AUTO_STICKER)}
*│➭ 1.4 - Auto Voice:* ${isEnabled(config.AUTO_VOICE)}
*│➭ 2.1 - Anti-Link:* ${isEnabled(config.ANTI_LINK)}
*│➭ 2.2 - Anti-Bad:* ${isEnabled(config.ANTI_BAD)}
*│➭ 2.3 - Delete Links:* ${isEnabled(config.DELETE_LINKS)}
*│➭ 3.1 - Status Seen:* ${isEnabled(config.AUTO_STATUS_SEEN)}
*│➭ 3.2 - Status Reply:* ${isEnabled(config.AUTO_STATUS_REPLY)}
*│➭ 3.3 - Status React:* ${isEnabled(config.AUTO_STATUS_REACT)}
*│➭ 4.1 - Always Online:* ${isEnabled(config.ALWAYS_ONLINE)}
*│➭ 4.2 - Read Message:* ${isEnabled(config.READ_MESSAGE)}
*│➭ 4.3 - Read Cmd:* ${isEnabled(config.READ_CMD)}
*│➭ 4.4 - Public Mode:* ${isEnabled(config.PUBLIC_MODE)}
*│➭ 5.1 - Auto Typing:* ${isEnabled(config.AUTO_TYPING)}
*│➭ 5.2 - Auto Recording:* ${isEnabled(config.AUTO_RECORDING)}
*╰⭑ Reply with a number to activate the feature*`;

    const sent = await conn.sendMessage(from, {
      image: { url: "https://files.catbox.moe/iopat1.jpg" },
      caption: desc
    }, { quoted: mek });

    conn.ev.on('messages.upsert', async (msgUpdate) => {
      const msg = msgUpdate.messages[0];
      if (!msg.message || !msg.message.extendedTextMessage) return;

      const selected = msg.message.extendedTextMessage.text.trim();
      const ref = msg.message.extendedTextMessage.contextInfo?.stanzaId;

      if (ref === sent.key.id) {
        const commands = {
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

        const envKey = commands[selected];
        if (!envKey) {
          return reply("*❌ Invalid option. Please choose a valid number.*");
        }

        await reply(`.update ${envKey}:true`);
        await reply(".restart");
      }
    });

  } catch (e) {
    console.error(e);
    await conn.sendMessage(from, { react: { text: '❌', key: mek.key } });
    reply("❌ An error occurred while displaying the settings.");
  }
});
