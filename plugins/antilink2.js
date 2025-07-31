const { cmd } = require('../command');
const { setAntilink, getAntilink, removeAntilink } = require('../lib/index');
const isAdmin = require('../lib/isAdmin');

cmd({
  pattern: "antilink",
  desc: "Enable or configure anti-link protection",
  category: "group",
  filename: __filename,
  react: "🔗"
}, async ({ m, sock, text, from, sender, isGroup }) => {
  if (!isGroup) return m.reply("*_This command is for groups only._*");

  const isSenderAdmin = await isAdmin(sock, from, sender);
  if (!isSenderAdmin) return m.reply("```For Group Admins Only!```");

  const prefix = '.';
  const args = text.trim().split(' ');
  const action = args[0]?.toLowerCase();

  if (!action) {
    const usage = `\`\`\`ANTILINK SETUP\n\n${prefix}antilink on\n${prefix}antilink set delete | kick | warn\n${prefix}antilink off\n${prefix}antilink get\n\`\`\``;
    return m.reply(usage);
  }

  switch (action) {
    case 'on':
      const existing = await getAntilink(from, 'on');
      if (existing?.enabled) return m.reply("*_Antilink is already ON_*");
      await setAntilink(from, 'on', 'delete');
      return m.reply("*_Antilink has been turned ON_*");

    case 'off':
      await removeAntilink(from, 'on');
      return m.reply("*_Antilink has been turned OFF_*");

    case 'set':
      if (args.length < 2) return m.reply("*_Usage: antilink set delete | kick | warn_*");
      const setAction = args[1].toLowerCase();
      if (!['delete', 'kick', 'warn'].includes(setAction)) {
        return m.reply("*_Invalid action. Choose delete, kick, or warn._*");
      }
      await setAntilink(from, 'on', setAction);
      return m.reply(`*_Antilink action set to ${setAction}_*`);

    case 'get':
      const status = await getAntilink(from, 'on');
      const response = `*_Antilink Configuration:_*\nStatus: ${status ? 'ON' : 'OFF'}\nAction: ${status?.action || 'Not set'}`;
      return m.reply(response);

    default:
      return m.reply(`*_Use ${prefix}antilink for usage._*`);
  }
});
