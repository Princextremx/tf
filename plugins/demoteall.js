const { cmd } = require('../command');
const config = require('../config');

cmd({
  pattern: "demoteall",
  alias: ["dmtall"],
  desc: "Demote all group admins (except bot, owner, sudo).",
  category: "🍧group",
  filename: __filename
}, async (conn, m, msg) => {
  try {
    if (!m.isGroup) return m.reply("🚫 This command can only be used in groups.");

    const groupMetadata = await conn.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botNumber = await conn.decodeJid(conn.user.id);
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;

    const senderIsSudo = process.env.SUDO?.split(',').includes(m.sender);
    const senderIsOwner = m.sender.includes(config.OWNER_NUMBER);

    if (!botAdmin) return m.reply("🚫 Bot must be admin to execute this command.");
    if (!senderAdmin && !senderIsSudo && !senderIsOwner)
      return m.reply("🚫 Only group admins, sudo or owner can use this command.");

    const toDemote = participants
      .filter(p => p.admin === 'admin' || p.admin === 'superadmin')
      .map(p => p.id)
      .filter(id =>
        id !== botNumber &&
        !id.includes(config.OWNER_NUMBER) &&
        !process.env.SUDO?.split(',').includes(id)
      );

    if (toDemote.length === 0) return m.reply("✅ No admins to demote.");

    await conn.groupParticipantsUpdate(m.from, toDemote, 'demote');
    const mentions = toDemote.map(user => `@${user.split('@')[0]}`).join(' ');
    m.reply(`*👑 The following admins have been demoted:*\n${mentions}`, undefined, { mentions: toDemote });

  } catch (err) {
    console.error(err);
    m.reply("❌ An error occurred while executing the command.");
  }
});
