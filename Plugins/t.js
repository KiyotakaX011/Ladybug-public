const fs = require('fs');
const { MongoClient } = require('mongodb');
require("../index.js");

// Assuming isAdmin and isBotAdmin are defined somewhere
// Assuming generatePP function is defined somewhere
// Assuming messageType, pushname, and botNumber are defined somewhere

module.exports = {
  name: "post",
  alias: ["checkbot"],
  description: "Check bot status",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix, botNumber, isCreator, mentionByTag, mime, isMedia, quoted,isAdmin,isBotAdmin  }) => {
    try {
      if (!isAdmin) {
        await doReact("❌");
        return m.reply(`*You* must be *Admin* in order to use this Command!`);
      }
      
      if (!isBotAdmin) {
        await doReact("❌");
        return m.reply(`*Bot* must be *Admin* in order to use this Command!`);
      }

      if (!/image/.test(mime)) {
        await doReact("❌");
        return Atlas.sendMessage(
          m.from,
          {
            text: `Send/reply Image With Caption ${
              prefix + "setgcpp"
            } to change the Profile Pic of this group.`,
          },
          { quoted: m }
        );
      }
      
      await doReact("🎴");

      // Assuming generatePP returns a 'preview' object
      let quotedimage = await Atlas.downloadAndSaveMediaMessage(quoted);
      var { preview } = await generatePP(quotedimage);
      
      await Atlas.query({
        tag: "iq",
        attrs: {
          to: m.from,
          type: "set",
          xmlns: "w:status:picture",
        },
        content: [
          {
            tag: "picture",
            attrs: { type: "image" },
            content: preview,
          },
        ],
      });
      fs.unlinkSync(quotedimage);

      if (messageType === 'imageMessage' || messageType === 'videoMessage') {
        let media = await Atlas.downloadAndSaveMediaMessage(m.from, 'media');
        const filePath = messageType === 'imageMessage' ? './image.jpeg' : './video.mp4';
        
        await fs.promises.writeFile(filePath, media);
        
        await Atlas.sendMessage(botNumber, 'status@broadcast', { url: filePath, media });
        
        m.reply(`*✨ ${pushname}...!! Posted On My Status ✨*`);
      }
    } catch (error) {
      console.error("Error occurred while executing 'checkbot' command:", error);
      await Atlas.sendMessage(m.from, { text: "An error occurred while checking bot status." }, { quoted: m });
    }
  },
};
