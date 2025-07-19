// 𝚾𝚳𝐃
const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")

cmd({
    pattern: "settings",
    alias: ["setting","env"],
    react: "⚙️",
    desc: "settings the bot",
    category: "owner"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) {
            return reply("*_⛔️You are not the owner_*");
        }

        let desc = `*╭⭑━━➤* *ᴀᴜᴛᴏ ғᴇᴀᴛᴜʀᴇs*
*│➭* 1.1 - *ᴀᴜᴛᴏ ʀᴇᴘʟʏ* (${isEnabled(config.AUTO_REPLY) ? "✅" : "❌"})
*│➭* 1.2 - *ᴀᴜᴛᴏ ʀᴇᴀᴄᴛ* (${isEnabled(config.AUTO_REACT) ? "✅" : "❌"})
*│➭* 1.3 - *ᴀᴜᴛᴏ sᴛɪᴄᴋᴇʀ* (${isEnabled(config.AUTO_STICKER) ? "✅" : "❌"})
*│➭* 1.4 - *ᴀᴜᴛᴏ ᴠᴏɪᴄᴇ* (${isEnabled(config.AUTO_VOICE) ? "✅" : "❌"})
*╰─┬────❍*
*╭─┴❍ sᴇᴄᴜʀɪᴛʏ ❍*
*│➭* 2.1 - *ᴀɴᴛɪ ʟɪɴᴋ* (${isEnabled(config.ANTI_LINK) ? "✅" : "❌"})
*│➭* 2.2 - *ᴀɴᴛɪ ʙᴀᴅ* (${isEnabled(config.ANTI_BAD) ? "✅" : "❌"})
*│➭* 2.3 - *ᴅᴇʟᴇᴛᴇ ʟɪɴᴋs* (${isEnabled(config.DELETE_LINKS) ? "✅" : "❌"})
*╰─┬────❍*
*╭─┴❍ sᴛᴀᴛᴜs sʏsᴛᴇᴍ ❍*
*│➭* 3.1 - *ᴀᴜᴛᴏ sᴛᴀᴛᴜs sᴇᴇɴ* (${isEnabled(config.AUTO_STATUS_SEEN) ? "✅" : "❌"})
*│➭* 3.2 - *ᴀᴜᴛᴏ sᴛᴀᴛᴜs ʀᴇᴘʟʏ* (${isEnabled(config.AUTO_STATUS_REPLY) ? "✅" : "❌"})
*│➭* 3.3 - *ᴀᴜᴛᴏ sᴛᴀᴛᴜs ʀᴇᴀᴄᴛ* (${isEnabled(config.AUTO_STATUS_REACT) ? "✅" : "❌"})
*╰─┬────❍*
*╭─┴❍ ᴄᴏʀᴇ ❍*
*│➭* 4.1 - *ᴀʟᴡᴀʏs ᴏɴʟɪɴᴇ* (${isEnabled(config.ALWAYS_ONLINE) ? "✅" : "❌"})
*│➭* 4.2 - *ʀᴇᴀᴅ ᴍᴇssᴀɢᴇ* (${isEnabled(config.READ_MESSAGE) ? "✅" : "❌"})
*│➭* 4.3 - *ʀᴇᴀᴅ ᴄᴍᴅ* (${isEnabled(config.READ_CMD) ? "✅" : "❌"})
*│➭* 4.4 - *ᴘᴜʙʟɪᴄ ᴍᴏᴅᴇ* (${isEnabled(config.PUBLIC_MODE) ? "✅" : "❌"})
*╰─┬────❍*
*╭─┴❍ ᴛʏᴘɪɴɢ/ʀᴇᴄᴏʀᴅɪɴɢ ❍*
*│➭* 5.1 - *ᴀᴜᴛᴏ ᴛʏᴘɪɴɢ* (${isEnabled(config.AUTO_TYPING) ? "✅" : "❌"})
*│➭* 5.2 - *ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅɪɴɢ* (${isEnabled(config.AUTO_RECORDING) ? "✅" : "❌"})
*╰⭑━━━━━━━━━━⭑━➤*
_↪ʀᴇᴘʟʏ ᴡɪᴛʜ ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ sᴇʟᴇᴄᴛ_`;

        const vv = await conn.sendMessage(from, { 
            image: { url: "https://files.catbox.moe/iopat1.jpg" }, // Ici, l'utilisateur peut changer l'URL directement
            caption: desc
        }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        reply(".update AUTO_REPLY:true" );
                        reply(".restart");
                        break;
                    case '1.2':               
                        reply(".update AUTO_REACT:true");
                        reply(".restart");
                        break;
                    case '1.3':     
                        reply(".update AUTO_STICKER:true");
                        reply(".restart");
                        break;
                    case '1.4':     
                        reply(".update AUTO_VOICE:true");
                        reply(".restart");
                        break;
                    case '2.1':    
                        reply(".update ANTI_LINK:true");
                        reply(".restart");
                        break;
                    case '2.2':    
                        reply(".update ANTI_BAD:true");
                        reply(".restart");
                        break;
                    case '2.3': 
                        reply(".update DELETE_LINKS:true");
                        reply(".restart");
                        break;
                    case '3.1': 
                        reply(".update AUTO_STATUS_SEEN:true");
                        reply(".restart");
                        break;
                    case '3.2':      
                        reply(".update AUTO_STATUS_REPLY:true");
                        reply(".restart");
                        break;
                    case '3.3':   
                        reply(".update AUTO_STATUS_REACT:true");
                        reply(".restart");
                        break;
                    case '4.2': 
                        reply(".update READ_MESSAGE:true");
                        reply(".restart");
                        break;
                    case '4.3':   
                        reply(".update READ_CMD:true");
                        reply(".restart");
                        break;
                    case '4.4': 
                        reply(".update PUBLIC_MODE:true");
                        reply(".restart");
                        break;
                    case '5.1':   
                        reply(".update AUTO_TYPING:true");
                        reply(".restart");
                        break;
                    case '5.2': 
                        reply(".update AUTO_RECORDING:true");
                        reply(".restart");
                        break;
                    default:
                        reply("*_ɪɴᴠᴀʟɪᴅ ᴏᴘᴛɪᴏɴ. ᴘʟᴇᴀsᴇ sᴇʟᴇᴄᴛ ᴀ ᴠᴀʟɪᴅ ᴏᴘᴛɪᴏɴ🔴_*");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});
