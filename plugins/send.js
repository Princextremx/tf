const { cmd } = require('../command');

// Ce type de commande réagit à un mot exact sans préfixe
cmd({
  pattern: 'Send',
  desc: 'Répond automatiquement quand quelqu’un écrit "Send"',
  category: 'auto',
  usePrefix: false, // Important : empêche l’utilisation du préfixe
  react: '🎐',
  filename: __filename
}, async (m, { sock }) => {
  if (m.body?.trim().toLowerCase() === 'send') {
    await sock.sendMessage(m.chat, {
      text: '🎐 *ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ ᴀ sᴛᴀᴛᴜs!*',
    }, { quoted: m });
  }
});
