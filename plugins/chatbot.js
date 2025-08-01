const { cmd } = require('../command');
const fetch = require('node-fetch'); // installe avec: npm install node-fetch@2

// Commande pour activer/désactiver le chatbot
cmd({
  pattern: 'chatbot',
  desc: 'Activer ou désactiver le chatbot',
  category: '⌚ misc',
  react: '🤖',
  filename: __filename
}, async (m, { args }) => {
  if (!args[0]) return m.reply('Usage: chatbot on/off');

  const status = args[0].toLowerCase();
  if (status !== 'on' && status !== 'off') return m.reply('Utilise "on" ou "off" uniquement.');

  global.chatbotStatus = global.chatbotStatus || {};
  global.chatbotStatus[m.chat] = status === 'on';

  return m.reply(`🤖 Chatbot est maintenant *${status.toUpperCase()}* pour ce chat.`);
});


// Listener pour répondre automatiquement avec l'API Blackbox
const setupChatbotListener = (client) => {
  client.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const from = msg.key.remoteJid;
    const sender = msg.key.participant || msg.key.remoteJid;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    if (!text) return;
    global.chatbotStatus = global.chatbotStatus || {};
    if (!global.chatbotStatus[from]) return;

    const botJid = client.user.id.split(':')[0] + '@s.whatsapp.net';
    if (sender === botJid) return;

    try {
      await client.sendMessage(from, { react: { text: '💬', key: msg.key } });

      const query = encodeURIComponent(text);
      const res = await fetch(`https://api.blackbox.cool/api/chatbot?msg=${query}`);
      const data = await res.json();

      if (data.success) {
        await client.sendMessage(
          from,
          { text: data.response, mentions: [sender] },
          { quoted: msg }
        );
      }
    } catch (e) {
      console.log('Chatbot API error:', e);
    }
  });
};

module.exports = { setupChatbotListener };
