const { cmd } = require('../command');
const crypto = require('crypto');
const webp = require('node-webpmux');
const axios = require('axios');
const fs = require('fs-extra');
const { exec } = require('child_process');
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const Config = require('../config');

// Take Sticker 

cmd(
    {
        pattern: 'rename',
        alias: ['s', 'stake'],
        desc: 'Create a sticker with a custom pack name.',
        category: 'sticker',
        use: '<reply media or URL>',
        react: "🤹🏻‍♂️",
        filename: __filename,
    },
    async (conn, mek, m, { quoted, args, q, reply, from }) => {
        if (!mek.quoted) return reply(`*_ʀᴇᴘʟʏ ᴛᴏ ᴀɴʏ sᴛɪᴄᴋᴇʀ_*`);
        if (!q) return reply(`*_ᴘʟᴇᴀsᴇ ᴘʀᴏᴠɪᴅᴇ ᴀ ᴘᴀᴄᴋ ɴᴀᴍᴇ_*
> *ᴇxᴇᴍᴘʟᴇ .ᴛᴀᴋᴇ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`);

        let mime = mek.quoted.mtype;
        let pack = q;

        if (mime === "imageMessage" || mime === "stickerMessage") {
            let media = await mek.quoted.download();
            let sticker = new Sticker(media, {
                pack: pack, 
                type: StickerTypes.FULL,
                categories: ["🤩", "🎉"],
                id: "12345",
                quality: 75,
                background: 'transparent',
            });
            const buffer = await sticker.toBuffer();
            return conn.sendMessage(mek.chat, { sticker: buffer }, { quoted: mek });
        } else {
            return reply("*_ᴜʜʜ, ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ ᴀɴ ɪᴍᴀɢᴇ._*");
        }
    }
);

//Sticker create 

cmd(
    {
        pattern: 'take',
        alias: ['takes', 'stickergif'],
        desc: 'Create a sticker from an image, video, or URL.',
        category: 'sticker',
        use: '*_<ʀᴇᴘʟʏ ᴍᴇᴅɪᴀ ᴏʀ ᴜʀʟ>_*',
        react: "🤹🏻‍♂️",
        filename: __filename,
    },
    async (conn, mek, m, { quoted, args, q, reply, from }) => {
        if (!mek.quoted) return reply(`*_ʀᴇᴘʟʏ ᴛᴏ ᴀɴʏ ɪᴍᴀɢᴇ ᴏʀ ᴠɪᴅᴇᴏ, sɪʀ._*`);
        let mime = mek.quoted.mtype;
        let pack = Config.STICKER_NAME || `${pushname}`;
        
        if (mime === "imageMessage" || mime === "stickerMessage") {
            let media = await mek.quoted.download();
            let sticker = new Sticker(media, {
                pack: pack, 
                type: StickerTypes.FULL,
                categories: ["🤩", "🎉"], 
                id: "12345",
                quality: 75, 
                background: 'transparent',
            });
            const buffer = await sticker.toBuffer();
            return conn.sendMessage(mek.chat, { sticker: buffer }, { quoted: mek });
        } else {
            return reply("*_ᴜʜʜ, ᴘʟᴇᴀsᴇ ʀᴇᴘʟʏ ᴛᴏ ᴀɴ ɪᴍᴀɢᴇ_*");
        }
    }
);

// JawadTechX
              
