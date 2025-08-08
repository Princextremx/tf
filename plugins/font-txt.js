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

        // Si aucun argument → montrer la liste des styles
        if (!args.length) {
            return reply(
                `╭─ 「 *\`FANCY LIST STYLE\`* 」\n│EXAMPLE: FANCY 10 XTREMEXMD\n│` +
                String.fromCharCode(8206).repeat(4001) + 
                fancy.list('XTREME XMD', fancy)
            );
        }

        if (!id || !text) {
            return reply(
                `Example: ${prefix}fancy 10 XTREME-XMD\n` +
                String.fromCharCode(8206).repeat(4001) + 
                fancy.list('XTREME-XMD', fancy)
            );
        }

        const selectedStyle = fancy[parseInt(id) - 1];
        if (selectedStyle) {
            return reply(fancy.apply(selectedStyle, text));
            //send image 
            await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/mry39g.jpg' },
        } else {
            return reply('_Style not found :(_');
        }
    } catch (error) {
        console.error(error);
        return reply('_An error occurred :(_');
    }
});
