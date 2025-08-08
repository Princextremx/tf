const { cmd } = require('../command');
const fancy = require('../lib/style');

cmd({
    pattern: "fancy",
    desc: "Apply fancy text styles",
    category: "fun",
    react: "💫",
    filename: __filename
}, 
async (conn, mek, m, { from, args, prefix, reply }) => {
    try {
        const id = args[0]?.match(/\d+/)?.join('');
        const text = args.slice(1).join(" ");

        if (!id || !text) {
            return reply(
                `╭─ 「 *\`LIST FANCY\`* 」\n│ᴇxᴀᴍᴘʟᴇ: .ғᴀɴᴄʏ 10 xᴛʀᴇᴍᴇ-xᴍᴅ\n│` +
                String.fromCharCode(8206).repeat(4001) + 
                fancy.list('XTREME XMD', fancy)
            );
        }

        const selectedStyle = fancy[parseInt(id) - `│1`];
        if (selectedStyle) {
            return reply(fancy.apply(selectedStyle, text));
        } else {
            return reply('_sᴛʏʟᴇ ɴᴏᴛ ғᴏᴜɴᴅ :(_');
        }
    } catch (error) {
        console.error(error);
        return reply('_An error occurred :(_');
    }
});
