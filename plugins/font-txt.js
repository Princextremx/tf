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

        // Fonction pour lister avec numéros
        const getNumberedList = (sampleText) => {
            return Object.keys(fancy)
                .filter(k => !isNaN(k)) // garder seulement les styles avec index
                .map((key, index) => `${index + 1}. ${fancy.apply(fancy[index], sampleText)}`)
                .join("\n");
        };

        // Si aucun argument → afficher la liste numérotée
        if (!args.length) {
            return reply(
                `EXAMPLE: .FANCY 10 XTREME XMD\n` +
                String.fromCharCode(8206).repeat(4001) + 
                getNumberedList('XTREME XMD')
            );
        }

        // Si id ou texte manquant
        if (!id || !text) {
            return reply(
                `EXAMPLE: .FANCY 10 XTREME XMD\n` +
                String.fromCharCode(8206).repeat(4001) + 
                getNumberedList('XTREME XMD')
            );
        }

        // Application du style choisi
        const selectedStyle = fancy[parseInt(id) - 1];
        if (selectedStyle) {
            return reply(fancy.apply(selectedStyle, text));
        } else {
            return reply('_Style not found :(_');
        }
    } catch (error) {
        console.error(error);
        return reply('_An error occurred :(_');
    }
});
