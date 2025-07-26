const { cmd } = require("../command");
const axios = require("axios");

cmd({
  pattern: "tweets",
  alias: ["tw"],
  react: "😅",
  desc: "Create a fake styled tweet.",
  category: "🎭 fun",
  filename: __filename
}, async (conn, mek, m, { q, reply }) => {
  try {
    if (!q) return reply("📝 Please provide some text for the tweet.");

    const displayname = m.pushName || "User";
    const username = m.sender.split("@")[0];
    const avatar = await conn.profilePictureUrl(m.sender, "image").catch(() => "https://i.imgur.com/vuxJCTB.jpeg");

    const replies = "246";
    const retweets = "125";
    const theme = "dark";

    const tweetURL = `https://some-random-api.com/canvas/misc/tweet?displayname=${encodeURIComponent(displayname)}&username=${encodeURIComponent(username)}&avatar=${encodeURIComponent(avatar)}&comment=${encodeURIComponent(q)}&replies=${replies}&retweets=${retweets}&theme=${theme}`;

    await conn.sendMessage(m.chat, {
      image: { url: tweetURL },
      caption: `> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴘʀɪɴᴄᴇ xᴛʀᴇᴍᴇ*`
    }, { quoted: m });

  } catch (error) {
    console.error("Tweet Command Error:", error);
    reply(`❌ An error occurred: ${error.message || "Unknown error"}`);
  }
});
