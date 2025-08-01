const { cmd } = require('../command');
const config = require('../config.cjs');

cmd({
  pattern: ['promote', 'admin', 'toadmin'],
  desc: 'Promote mentioned user(s) to admin',
  category: 'group',
  use: '@user / reply',
  react: '🧑‍💼',
  filename: __filename,
  onlyGroup: true,
  async run(m, sock) {
    const groupMetadata = await sock.groupMetadata(m.from);
    const participants = groupMetadata.participants;

    const botNumber = await sock.decodeJid(sock.user.id);
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;

    const senderIsSudo = process.env.SUDO?.split(',').includes(m.sender);
    const senderIsOwner = m.sender.includes(config.OWNER_NUMBER);

    if (!botAdmin) return m.reply('🚫 BOT MUST BE AN ADMIN TO USE THIS COMMAND');
    if (!senderAdmin && !senderIsSudo && !senderIsOwner)
      return m.reply('🚫 YOU MUST BE AN ADMIN OR SUDO/OWNER TO USE THIS COMMAND');

    if (!m.mentionedJid) m.mentionedJid = [];
    if (m.quoted?.participant) m.mentionedJid.push(m.quoted.participant);

    const text = m.body.split(' ').slice(1).join(' ');
    const users = m.mentionedJid.length > 0
      ? m.mentionedJid
      : text.replace(/[^0-9]/g, '').length > 0
        ? [text.replace(/[^0-9]/g, '') + '@s.whatsapp.net']
        : [];

    if (users.length === 0) {
      return m.reply("🚫 PLEASE MENTION OR QUOTE A USER TO PROMOTE");
    }

    const validUsers = users.filter(Boolean);
    const usernames = await Promise.all(
      validUsers.map(async (user) => {
        try {
          const contact = await sock.getContact(user);
          return contact.notify || contact.pushname || user.split('@')[0];
        } catch {
          return user.split('@')[0];
        }
      })
    );

    await sock.groupParticipantsUpdate(m.from, validUsers, 'promote')
      .then(() => {
        const promotedNames = usernames.map(username => `@${username}`).join(', ');
        m.reply(`*USERS ${promotedNames} PROMOTED SUCCESSFULLY IN THE GROUP ${groupMetadata.subject}*`);
      })
      .catch(() => m.reply('❌ Failed to promote user(s) in the group.'));
  }
});
