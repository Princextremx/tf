const { cmd } = require('../command');

cmd({
  pattern: "owner",
  react: "💫", 
  alias: ["kerm"],
  desc: "Get owner number",
  category: "⌚ misc",
  filename: __filename
}, async (conn, mek, m, { from }) => {
  try {
    // Propriétaires' informations de contact
    const owners = [
      { number: '+529145550855', name: 'ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ', organization: 'ᴘʀɪɴᴄᴇ ᴛᴇᴀᴍ' }
    ];

    let contacts = [];
    owners.forEach((owner) => {
      const vcard = `BEGIN:VCDCARD\n` +
        `VERSION:3.0\n` +
        `FN:${owner.name}\n` +
        `ORG:${owner.organization};\n` +
        `TEL;type=CELL;type=VOICE;waid=${owner.number.replace('+', '')}:${owner.number}\n` +
        `END:VCARD`;
      contacts.push({ vcard });
    });

    // Envoyer les vCards
    const sentVCard = await conn.sendMessage(from, { contacts: { displayName: "creators", contacts } });

    // Mentionner les deux propriétaires
    const mentionedJid = owners.map(owner => owner.number.replace('+', '') + '@s.whatsapp.net');

    // Envoyer un message de réponse qui référence les vCards
    await conn.sendMessage(from, {
      text: `ʜᴇʀᴇ ɪs ᴛʜᴇ ᴄᴏɴᴛᴀᴄᴛs ᴏғ ᴛʜᴇ ᴄʀᴇᴀᴛᴏʀs :\n\n${owners.map(o => `? ${o.name} : ${o.number}`).join('\n')}`,
      contextInfo: {
        mentionedJid,
        quotedMessageId: sentVCard.key.id
      }
    }, { quoted: mek });
  } catch (error) {
    console.error(error);
    await conn.sendMessage(from, {
      text: 'Sorry, there was an error retrieving owner contacts.'
    }, { quoted: mek });
  }
});
