const { cmd } = require('../command');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const Jimp = require('jimp');
const config = require('../config.js');

cmd({
    pattern: "fullpp",
    desc: "Set bot profile picture from replied image",
    category: "owner",
    react: "🖼️",
    filename: __filename
},
async (conn, mek, m, { sender, from, quoted }) => {
    try {
        const botNumber = await conn.decodeJid(conn.user.id);
        const isBot = sender === botNumber;

        // Only bot can use this command
        if (!isBot) {
            return m.reply("❌ This command can only be used by the bot itself.");
        }

        // Check if replied message is an image
        if (!quoted?.message?.imageMessage) {
            return m.reply("⚠️ Please *reply to an image* to set as profile picture.");
        }

        await m.React('⏳'); // Loading reaction

        // Download image with retry
        let media;
        for (let i = 0; i < 3; i++) {
            try {
                media = await downloadMediaMessage(quoted, 'buffer');
                if (media) break;
            } catch (error) {
                if (i === 2) {
                    await m.React('❌');
                    return m.reply("❌ Failed to download image. Try again.");
                }
            }
        }

        // Process image
        const image = await Jimp.read(media);
        if (!image) throw new Error("Invalid image format");

        // Make square if needed
        const size = Math.max(image.bitmap.width, image.bitmap.height);
        if (image.bitmap.width !== image.bitmap.height) {
            const squareImage = new Jimp(size, size, 0x000000FF);
            squareImage.composite(image, (size - image.bitmap.width) / 2, (size - image.bitmap.height) / 2);
            image.clone(squareImage);
        }

        // Resize to WhatsApp requirements
        image.resize(640, 640);
        const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

        // Update profile picture
        await conn.updateProfilePicture(botNumber, buffer);
        await m.React('✅');

        // Success response
        return conn.sendMessage(
            from,
            {
                text: "✅ *Profile Picture Updated successfully!*",
                contextInfo: {
                    mentionedJid: [sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363398101781980@newsletter',
                        newsletterName: "𝐇𝐀𝐈𝐊𝐎-𝐌𝐃𝐗-𝐕𝟏🪀",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: m }
        );

    } catch (error) {
        console.error("Error setting profile picture:", error);
        await m.React('❌');
        return m.reply("❌ An error occurred while updating the profile picture.");
    }
});
