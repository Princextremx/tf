
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "📠",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/PrinceXtremeX/XTREME-XMD';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Format the repository information
        const formattedInfo = `
╭─❄️ *ᴡᴇʟᴄᴏᴍᴇ ᴛᴏ xᴛʀᴇᴍᴇ ᴡ.ᴀ ʙᴏᴛ*
│  👋 ʜᴇʟʟᴏ ᴅᴇᴀʀ ᴜsᴇʀ!              
│  🔥 sɪᴍᴘʟᴇ, ᴄᴏʟᴅ & ғᴇᴀᴛᴜʀᴇ-ʀɪᴄʜ ʙᴏᴛ
│  💖 ᴛʜᴀɴᴋ ʏᴏᴜ ғᴏʀ ᴜsɪɴɢ *xᴛʀᴇᴍᴇ xᴍᴅ*
│  ⭐ ᴅᴏɴ’ᴛ ғᴏʀɢᴇᴛ ᴛᴏ *sᴛᴀʀ* & *ғᴏʀᴋ* ᴜs!
│  🔗 https://github.com/PrinceXtremeX/XTREME-XMD
╰────────────────────────╯

${readMore}

╭─⛄ *ʙᴏᴛ ɪɴғᴏ* ⛄─╮
│❄️ *ʙᴏᴛ ɴᴀᴍᴇ:* ${repoData.name}
│👨‍💻 *ᴏᴡɴᴇʀ:*  ${repoData.owner.login}
│🌟 *sᴛᴀʀs:* ${repoData.stargazers_count}
│🍴 *ғᴏʀᴋs:* ${repoData.forks_count}
│📃 *ᴅᴇsᴄʀɪᴘᴛɪᴏɴ:* ${repoData.description || 'No description'}
╰─────────────╯

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`;

        // Send an image with the formatted info as a caption and context info
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/jfbed2.jpg ` },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363398101781980@newsletter',
                    newsletterName: '𝗫𝗧𝗥𝗘𝗠𝗘-𝗫𝗠𝗗',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });
        
        
        } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
