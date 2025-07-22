const { cmd } = require('../command');

cmd({
  pattern: 'give',
  desc: 'Réponse automatique stylée au mot "send"',
  category: '🔂 auto',
  usePrefix: false,
  react: '✨',
  filename: __filename
}, async (m, { sock }) => {
  const triggers = ['send', 'status', 'give']; // mots déclencheurs
  const msg = m.body?.trim().toLowerCase();

  if (!triggers.includes(msg)) return;

  // Animation de "chargement" avant réponse
  await sock.sendMessage(m.chat, {
    text: '🔄 Processing...',
  }, { quoted: m });

  // Petite pause avant la vraie réponse (style réaliste)
  await new Promise(r => setTimeout(r, 1500));

  // Message stylé
  const message = `
╭━━━〔 𝗥𝗘𝗤𝗨𝗘𝗦𝗧 𝗣𝗥𝗢𝗖𝗘𝗦𝗦𝗘𝗗 ✨ 〕━━━╮
┃📩 *PLEASE REPLY TO A STATUS!*
┃
┃🕓 *Time:* ${new Date().toLocaleTimeString()}
┃🔰 *Bot:* XTREME-MDX-V2
╰━━━━━━━━━━━━━━━━━━━━━╯
  `.trim();

  await sock.sendMessage(m.chat, {
    text: message,
  }, { quoted: m });
});
