const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/groupeventss');
const { writeFileSync } = require('fs');
const path = require('path');

cmd({
    pattern: "antipromote",
    alias: ["welcomeset"],
    desc: "Enable or disable welcome messages for new members",
    category: "settings",
    filename: __filename
},
async (conn, mek, m, { from, args, isCreator, reply }) => {
    if (!isCreator) return reply("*📛 ᴏɴʟʏ ᴛʜᴇ ᴏᴡɴᴇʀ ᴄᴀɴ ᴜsᴇ ᴛʜɪs ᴄᴏᴍᴍᴀɴᴅ!*");

    const status = args[0]?.toLowerCase();
    if (status === "on") {
        config.ADMIN_EVENTS = "true";
        return reply("*_✅ ᴀɴᴛɪᴘʀᴏᴍᴏᴛᴇ ᴍᴇssᴀɢᴇs ᴀʀᴇ ɴᴏᴡ ᴇɴᴀʙʟᴇᴅ_*");
    } else if (status === "off") {
        config.ADMIN_EVENTS = "false";
        return reply("*_❌ ᴀɴᴛɪᴘʀᴏᴍᴏᴛᴇ ᴍᴇssᴀɢᴇs ᴀʀᴇ ɴᴏᴡ ᴅɪsᴀʙʟᴇᴅ_*");
    } else {
        return reply(`Example: .welcome on`);
    }
})
