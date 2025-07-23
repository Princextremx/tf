// 🧠 Donne du crédit si tu utilises ce fichier sur ta chaîne YouTube, merci !
// Credits: Dev Raheem-cm - RAHEEM-XMD-3💜

const { isJidGroup, default: makeWASocket } = require('@whiskeysockets/baileys');
const config = require('../config');
const { handleAntiMention } = require('../command/antimention'); // 🔗 adapte le chemin si besoin

// Fonction utilisée pour envoyer un message avec contexte personnalisé
const getContextInfo = (m) => ({
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363418161689316@newsletter',
        newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
        serverMessageId: 143,
    },
});

// Images par défaut en cas d'erreur de pp groupe
const ppUrls = [
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

// 💬 Événements de groupe (welcome, goodbye, promote, demote)
const GroupEvents = async (conn, update) => {
    try {
        const isGroup = isJidGroup(update.id);
        if (!isGroup) return;

        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const desc = metadata.desc || "No Description";
        const groupMembersCount = metadata.participants.length;

        let ppUrl;
        try {
            ppUrl = await conn.profilePictureUrl(update.id, 'image');
        } catch {
            ppUrl = ppUrls[Math.floor(Math.random() * ppUrls.length)];
        }

        for (const num of participants) {
            const userName = num.split("@")[0];
            const timestamp = new Date().toLocaleString();

            if (update.action === "add" && config.WELCOME === "true") {
                const WelcomeText = `╭━━≫ 𝐖𝐄𝐋𝐂𝐎𝐌𝐄🎉 ≪━━➤
┃ ⥤ *ʜɪ ᴅᴇᴀʀ* : @${userName}
┃⥤ *ᴀᴜᴛʜᴏʀ* : *ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*
┃⥤ *ɴᴜᴍʙᴇʀ* : *#${groupMembersCount}*
┃⥤ *ᴛɪᴍᴇ* : *${timestamp}*
┃⥤ *ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ*
┃☞ *ʀᴇɢʟᴇᴍᴇɴᴛs*
┃ ┗ *ᴘᴀs ᴅᴇ ʟɪɴᴋs🚯*
┃ ┗ *ᴘᴀs ᴅᴇ ᴄᴏɴᴛᴇɴᴜ xxx🔞*
┃ ┗ *ᴘᴀs ᴅᴇ sᴘᴀᴍ📵*
╰━━━━━━━━━━━━━━━━━━➤
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: WelcomeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "remove" && config.WELCOME === "true") {
                const GoodbyeText = `╭━━≫ 𝐆𝐎𝐎𝐃𝐁𝐘𝐄🥺 ≪━━➤
┃ ⥤ *ʙʏᴇ ᴅᴇᴀʀ* : @${userName}
┃⥤ *ᴀᴜᴛʜᴏʀ* : *ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*
┃⥤ *ɴᴜᴍʙᴇʀ* : *#${groupMembersCount}*
┃⥤ *ᴛɪᴍᴇ* : *${timestamp}*
┃⥤ *ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ*
╰━━━━━━━━━━━━━━━━━━➤
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

                await conn.sendMessage(update.id, {
                    image: { url: ppUrl },
                    caption: GoodbyeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "demote" && config.ADMIN_EVENTS === "true") {
                const demoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `╭━〔 𝗔𝗡𝗧𝗜𝗗𝗘𝗠𝗢𝗧𝗘 〕━━➤
┃@${demoter}
┃ *ʜᴀs ᴅᴇᴍᴏᴛᴇᴅ* @${userName}
┃ *ᴛɪᴍᴇ:* ${timestamp}
╰━━━━━━━━━━━━━━⭑━➤
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });

            } else if (update.action === "promote" && config.ADMIN_EVENTS === "true") {
                const promoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `${config.PREFIX}demoteall
╭━〔 𝗔𝗡𝗧𝗜𝗣𝗥𝗢𝗠𝗢𝗧𝗘 〕━➤
┃@${promoter}
┃ *ʜᴀs ᴘʀᴏᴍᴏᴛᴇᴅ* @${userName}
┃ *ᴛɪᴍᴇ:* ${timestamp}
╰━━━━━━━━━━━━━━⭑━➤
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴇᴠ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

// ✅ Création du bot et intégration du système antimention
async function startBot() {
    const conn = makeWASocket({
        // ... Tes configs habituelles (auth, printQR, etc.)
    });

    // 🎯 Gestion des messages
    conn.ev.on('messages.upsert', async ({ messages }) => {
        const m = messages[0];
        if (!m || !m.message) return;

        try {
            // ✅ Antimention ici
            await handleAntiMention(conn, m);

            // ⬇️ Tu peux ajouter ici tes commandes custom ex: await cmdHandler(conn, m)

        } catch (err) {
            console.error("Erreur message handler :", err);
        }
    });

    // 🧩 Gestion des événements de groupe
    conn.ev.on("group-participants.update", async (update) => {
        await GroupEvents(conn, update);
    });
}

// 🚀 Lancement du bot
startBot();

// 📤 Exporte si besoin
module.exports = GroupEvents;
