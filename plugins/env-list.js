// 𝚾𝚳𝐃
const config = require('../config')
const {cmd , commands} = require('../command')
const os = require("os")

cmd({
    pattern: "settings",
    alias: ["setting"],
    react: "⚙️",
    desc: "settings the bot",
    category: "owner"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) {
            return reply("*_⛔️You are not the owner_*");
        }

        let desc = `
        
╭┈┉⚙ *xᴍᴅ ʙᴏᴛ sᴇᴛᴛɪɴɢs* ⚙┉┈╮
┇
┇💼 ᴡᴏʀᴋ ᴍᴏᴅᴇ : 𝙿𝚄𝙱𝙻𝙸𝙲🌎/𝙿𝚁𝙸𝚅𝙰𝚃𝙴
┇🔊 ᴀᴜᴛᴏ ᴠᴏɪᴄᴇ : ♻ 𝙾𝙽/𝙾𝙵𝙵
┇📝 ᴀᴜᴛᴏ sᴛᴀᴛᴜs : ♻ 𝙾𝙽/𝙾𝙵𝙵
┇⌨ ᴀᴜᴛᴏ ᴛʏᴘɪɴɢ : ♻ 𝙾𝙽/𝙾𝙵𝙵
┇🛠 ᴀᴜᴛᴏ ʀᴇᴀᴅ ᴄᴏᴍᴍᴀɴᴅ : ♻ 𝙾𝙽/𝙾𝙵𝙵
╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯

   🔗  *_ᴄᴜsᴛᴏᴍɪᴢᴇ ʏᴏᴜʀ sᴇᴛᴛɪɴɢs_* ⤵️
   
> *↪ʀᴇᴘʟʏ ᴡɪᴛʜ ᴛʜᴇ ɴᴜᴍʙᴇʀ ʏᴏᴜ ᴡᴀɴᴛ ᴛᴏ sᴇʟᴇᴄᴛ*

    🔧 *ᴏᴘᴛɪᴏɴs ᴍᴇɴᴜ* 🔧

┣━ *ᴡᴏʀᴋ ᴍᴏᴅᴇ* ⤵️
┃   ┣ 1.1 🔹 ᴘᴜʙʟɪᴄ ᴡᴏʀᴋ
┃   ┣ 1.2 🔹 ᴘʀɪᴠᴀᴛᴇ ᴡᴏʀᴋ

┣━ *ᴀᴜᴛᴏ ᴠᴏɪᴄᴇ* ⤵️
┃   ┣ 2.1 🔊 ᴀᴜᴛᴏ ᴠᴏɪᴄᴇ ᴏɴ
┃   ┗ 2.2 🔕 ᴀᴜᴛᴏ ᴠᴏɪᴄᴇ ᴏғғ

┣━ *ᴀᴜᴛᴏ sᴛᴀᴛᴜs sᴇᴇɴ* ⤵️
┃   ┣ 3.1 👁‍🗨 ᴀᴜᴛᴏ ʀᴇᴀᴅ sᴛᴀᴛᴜs ᴏɴ
┃   ┗ 3.2 👁❌ ᴀᴜᴛᴏ ʀᴇᴀᴅ sᴛᴀᴛᴜs ᴏғғ

┣━ *ᴀᴜᴛᴏ ᴛʏᴘɪɴɢ* ⤵️
┃   ┣ 4.1 📝 ᴀᴄᴛɪᴠᴀᴛᴇ ᴀᴜᴛᴏ ᴛʏᴘɪɴɢ
┃   ┗ 4.2 📝❌ ᴅᴇᴀᴄᴛɪᴠᴀᴛᴇ ᴀᴜᴛᴏ ᴛʏᴘɪɴɢ

┣━ *ᴀᴜᴛᴏ sᴛɪᴄᴋᴇʀ* ⤵️
┃   ┣ 5.1 🎉 ᴀᴄᴛɪᴠᴀᴛᴇ ᴀᴜᴛᴏ sᴛɪᴄᴋᴇʀ
┃   ┗ 5.2 🎉❌ ᴅᴇᴀᴄᴛɪᴠᴀᴛᴇ ᴀᴜᴛᴏ sᴛɪᴄᴋᴇʀ

┣━ *ᴀɴᴛɪ ʙᴀᴅ* ⤵️
┃   ┣ 6.1 🚫 ᴀᴄᴛɪᴠᴀᴛᴇ ᴀɴᴛɪ ʙᴀᴅ
┃   ┗ 6.2 🚫❌ ᴅᴇᴀᴄᴛɪᴠᴀᴛᴇ ᴀɴᴛɪ ʙᴀᴅ

┣━ *ᴀᴜᴛᴏ ʀᴇᴘʟʏ* ⤵️
┃   ┣ 7.1 💬 ᴀᴄᴛɪᴠᴀᴛᴇ ᴀᴜᴛᴏ ʀᴇᴘʟʏ
┃   ┗ 7.2 💬❌ ᴅᴇᴀᴄᴛɪᴠᴀᴛᴇ ᴀᴜᴛᴏ ʀᴇᴘʟʏ

┣━ *ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅɪɴɢ* ⤵️
┃   ┣ 8.1 🎥 ᴀᴄᴛɪᴠᴀᴛᴇ ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅɪɴɢ
┃   ┗ 8.2 🎥❌ ᴅᴇᴀᴄᴛɪᴠᴀᴛᴇ ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅɪɴɢ

┣━ *ᴀʟᴡᴀʏs ᴏɴʟɪɴᴇ* ⤵️
┃   ┣ 9.1 🌐 ᴀᴄᴛɪᴠᴀᴛᴇ ᴀʟᴡᴀʏs ᴏɴʟɪɴᴇ
┃   ┗ 9.2 🌐❌ ᴅᴇᴀᴄᴛɪᴠᴀᴛᴇ ᴀʟᴡᴀʏs ᴏɴʟɪɴᴇ

┣━ *ᴀɴᴛɪ ʟɪɴᴋ* ⤵️
┃   ┣ 10.1 🔗 ᴀᴄᴛɪᴠᴀᴛᴇ ᴀɴᴛɪ ʟɪɴᴋ
┃   ┗ 10.2 🔗❌ ᴅᴇᴀᴄᴛɪᴠᴀᴛᴇ ᴀɴᴛɪ ʟɪɴᴋ
┗━━━━━━━━━━━━━━━━━━━━━`;

        const vv = await conn.sendMessage(from, { 
            image: { url: "https://files.catbox.moe/w3ir6e.jpg" }, // Ici, l'utilisateur peut changer l'URL directement
            caption: desc
        }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1.1':
                        reply(".update MODE:public" );
                        reply(".restart");
                        break;
                    case '1.2':               
                        reply(".update MODE:private");
                        reply(".restart");
                        break;
                    case '2.1':     
                        reply(".update AUTO_VOICE:true");
                        reply(".restart");
                        break;
                    case '2.2':     
                        reply(".update AUTO_VOICE:false");
                        reply(".restart");
                        break;
                    case '3.1':    
                        reply(".update AUTO_READ_STATUS:true");
                        reply(".restart");
                        break;
                    case '3.2':    
                        reply(".update AUTO_READ_STATUS:false");
                        reply(".restart");
                        break;
                    case '4.1': 
                        reply(".update FAKE_TYPING:true");
                        reply(".restart");
                        break;
                    case '4.2': 
                        reply(".update FAKE_TYPING:false");
                        reply(".restart");
                        break;
                    case '5.1':      
                        reply(".update AUTO_STICKER:true");
                        reply(".restart");
                        break;
                    case '5.2':   
                        reply(".update AUTO_STICKER:false");
                        reply(".restart");
                        break;
                    case '6.1': 
                        reply(".update ANTI_BAD:true");
                        reply(".restart");
                        break;
                    case '6.2':   
                        reply(".update ANTI_BAD:false");
                        reply(".restart");
                        break;
                    case '7.1': 
                        reply(".update AUTO_REPLY:true");
                        reply(".restart");
                        break;
                    case '7.2':   
                        reply(".update AUTO_REPLY:false");
                        reply(".restart");
                        break;
                    case '8.1': 
                        reply(".update FAKE_RECORDING:true");
                        reply(".restart");
                        break;
                    case '8.2':   
                        reply(".update FAKE_RECORDING:false");
                        reply(".restart");
                        break;
                    case '9.1': 
                        reply(".update ALWAYS_ONLINE:true");
                        reply(".restart");
                        break;
                    case '9.2':   
                        reply(".update ALWAYS_ONLINE:false");
                        reply(".restart");
                        break;
                    case '10.1': 
                        reply(".update ANTI_LINK:true");
                        reply(".restart");
                        break;
                    case '10.2':   
                        reply(".update ANTI_LINK:false");
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
