const { cmd } = require('../command');

cmd({
    pattern: "ikeep",
    alias: ["I-keep"],
    desc: "Garde uniquement les membres avec les indicatifs donnés, supprime les autres",
    category: "group",
    react: "🧹",
    filename: __filename
},
async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, reply, groupMetadata, isCreator
}) => {
    if (!isGroup) return reply("❌ Cette commande fonctionne uniquement dans les groupes.");
    if (!isCreator) return reply("❌ Seul le propriétaire du bot peut utiliser cette commande.");
    if (!isBotAdmins) return reply("❌ Je dois être admin pour faire ça.");
    if (!q) return reply("❌ Fournis au moins un indicatif. Exemple: .take 509,508,1");

    // Traitement des indicatifs
    const codes = q.split(",").map(code => code.trim()).filter(code => /^\d+$/.test(code));

    if (codes.length === 0) {
        return reply("*❌ No valid callsign detected. Use only comma-separated numbers.*");
    }

    try {
        const participants = await groupMetadata.participants;

        const toRemove = participants.filter(participant => {
            const jid = participant.id;
            const isAdmin = participant.admin;
            const number = jid.split("@")[0]; // extraire le numéro

            // Garder si le numéro commence par un des indicatifs fournis
            const keep = codes.some(code => number.startsWith(code));
            return !keep && !isAdmin;
        });

        if (toRemove.length === 0) {
            return reply("*✅ All members have a matching callsign, no one to remove.*");
        }

        const jids = toRemove.map(p => p.id);
        await conn.groupParticipantsUpdate(from, jids, "remove");

        reply(`✅ Withdrawn ${toRemove.length} members who do not have the codes: ${codes.join(", ")}`);
    } catch (error) {
        console.error("Take command error:", error);
        reply("❌ Erreur lors du traitement : " + error.message);
    }
});
