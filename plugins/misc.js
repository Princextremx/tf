const axios = require('axios');
const config = require('../config');
const { cmd, commands } = require('../command');
const util = require("util");
const { getAnti, setAnti, initializeAntiDeleteSettings } = require('../data/antidel');

initializeAntiDeleteSettings();

cmd({
    pattern: "antidelete",
    alias: ['antidel', 'ad'],
    desc: "Sets up the Antidelete",
    category: "⌚ misc",
    filename: __filename
},
async (conn, mek, m, { from, reply, q, text, isOwner, fromMe }) => {
    if (!isOwner) return reply('This command is only for the bot owner');
    try {
        const command = q?.toLowerCase();

        switch (command) {
            case 'on':
                await setAnti('gc', false);
                await setAnti('dm', false);
                return reply('_*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ɪs ɴᴏᴡ ᴏғғ ғᴏʀ ɢʀᴏᴜᴘ ᴄʜᴀᴛs ᴀɴᴅ ᴅɪʀᴇᴄᴛ ᴍᴇssᴀɢᴇs*_');

            case 'off gc':
                await setAnti('gc', false);
                return reply('_*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ɢʀᴏᴜᴘ ᴄʜᴀᴛs ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ*_');

            case 'off dm':
                await setAnti('dm', false);
                return reply('_*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ᴅɪʀᴇᴄᴛ ᴍᴇssᴀɢᴇs ɪs ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ*_');

            case 'set gc':
                const gcStatus = await getAnti('gc');
                await setAnti('gc', !gcStatus);
                return reply(`_*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ɢʀᴏᴜᴘ ᴄʜᴀᴛs ${!gcStatus ? 'ᴇɴᴀʙʟᴇᴅ' : 'ᴅɪsᴀʙʟᴇᴅ'}*_`);

            case 'set dm':
                const dmStatus = await getAnti('dm');
                await setAnti('dm', !dmStatus);
                return reply(`_*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ғᴏʀ ᴅɪʀᴇᴄᴛ ᴍᴇssᴀɢᴇs ${!dmStatus ? 'ᴇɴᴀʙʟᴇᴅ' : 'ᴅɪsᴀʙʟᴇᴅ'}*_`);

            case 'set all':
                await setAnti('gc', true);
                await setAnti('dm', true);
                return reply('_*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ sᴇᴛ ғᴏʀ ᴀʟʟ ᴄʜᴀᴛs*_');

            case 'status':
                const currentDmStatus = await getAnti('dm');
                const currentGcStatus = await getAnti('gc');
                return reply(`_*ᴀɴᴛɪᴅᴇʟᴇᴛᴇ sᴛᴀᴛᴜs*_\n\n*ᴅᴍ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ:* ${currentDmStatus ? 'ᴇɴᴀʙʟᴇᴅ' : 'ᴅɪsᴀʙʟᴇᴅ'}\n*ɢʀᴏᴜᴘ ᴄʜᴀᴛ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ:* ${currentGcStatus ? 'ᴇɴᴀʙʟᴇᴅ' : 'ᴅɪsᴀʙʟᴇᴅ'}`);

            default:
                const helpMessage = `╭─ 「 *\`COMMANDS GUIDE\`* 」
│• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴏɴ–ᴀᴄᴛɪᴠᴇ ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ɢʟᴏʙᴀʟᴇᴍᴇɴᴛ
│• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴏғғ ɢᴄ–ᴅᴇsᴀᴄᴛɪᴠᴀᴛᴇ ғᴏʀ ɢʀᴏᴜᴘ
│• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ᴏғғ ᴅᴍ–ᴅᴇsᴀᴄᴛɪᴠᴀᴛ ғᴏʀ ᴅᴍ
│• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ sᴇᴛ ɢᴄ–ᴀᴄᴛɪᴠᴀᴛᴇ/ᴅᴇsᴀᴄᴛɪᴠᴀᴛᴇ ғᴏʀ ɢʀᴏᴜᴘs
│• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ sᴇᴛ ᴅᴍ–ᴀᴄᴛɪᴠᴀᴛᴇ/ᴅᴇsᴀᴄᴛɪᴠᴀᴛᴇ ғᴏʀ ᴅᴍ
│• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ sᴇᴛ ᴀʟʟ–ᴀᴄᴛɪᴠᴀᴛᴇ ғᴏʀ ᴀʟʟ ᴄʜᴀᴛs
│• .ᴀɴᴛɪᴅᴇʟᴇᴛᴇ sᴛᴀᴛᴜs–ᴠᴇ́ʀɪғɪᴇ ʟᴇ sᴛᴀᴛᴜᴛ ᴀᴄᴛᴜᴇʟ
╰──────────────────❍`;

                return reply(helpMessage);
        }
    } catch (e) {
        console.error("Error in antidelete command:", e);
        return reply("*_ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ᴘʀᴏᴄᴇssɪɴɢ ʏᴏᴜʀ ʀᴇǫᴜᴇsᴛ_*");
    }
});


cmd({
    pattern: "vv3",
    alias: ['retrive', '🔥'],
    desc: "Fetch and resend a ViewOnce message content (image/video).",
    category: "⌚ misc",
    use: '<query>',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const quotedMessage = m.msg.contextInfo.quotedMessage; // Get quoted message

        if (quotedMessage && quotedMessage.viewOnceMessageV2) {
            const quot = quotedMessage.viewOnceMessageV2;
            if (quot.message.imageMessage) {
                let cap = quot.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.videoMessage) {
                let cap = quot.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
            if (quot.message.audioMessage) {
                let anu = await conn.downloadAndSaveMediaMessage(quot.message.audioMessage);
                return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
            }
        }

        // If there is no quoted message or it's not a ViewOnce message
        if (!m.quoted) return reply("Please reply to a ViewOnce message.");
        if (m.quoted.mtype === "viewOnceMessage") {
            if (m.quoted.message.imageMessage) {
                let cap = m.quoted.message.imageMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.imageMessage);
                return conn.sendMessage(from, { image: { url: anu }, caption: cap }, { quoted: mek });
            }
            else if (m.quoted.message.videoMessage) {
                let cap = m.quoted.message.videoMessage.caption;
                let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.videoMessage);
                return conn.sendMessage(from, { video: { url: anu }, caption: cap }, { quoted: mek });
            }
        } else if (m.quoted.message.audioMessage) {
            let anu = await conn.downloadAndSaveMediaMessage(m.quoted.message.audioMessage);
            return conn.sendMessage(from, { audio: { url: anu } }, { quoted: mek });
        } else {
            return reply("This is not a ViewOnce message.");
        }
    } catch (e) {
        console.log("Error:", e);
        reply("An error occurred while fetching the ViewOnce message.");
    }
});

// if you want use the codes give me credit on your channel and repo in this file and my all files 
  
