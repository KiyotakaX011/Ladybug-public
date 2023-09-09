const ytdl = require('ytdl-core');
const fs = require("fs");
const yts = require("youtube-yts");
const {
  fetchJson,
  getBuffer,
  GIFBufferToVideoBuffer,
} = require("../System/Function2.js");

module.exports = {
  name: "ytshort",
  alias: ["ytshort"],
  uniquecommands: ["ytshort"],
  description: "Download and send YouTube short videos",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix, pushName, args }) => {
    try {
      if (!text) {
        await doReact("❌");
        return m.reply(
          `Please provide a link!\n\nExample: *${prefix}ytshort <link>*`
        );
      }

      await doReact("📥");

      // Fetch video information using ytdl-core
      const videoInfo = await ytdl.getInfo(text);
      
      // Get the highest quality video format (you can modify this as needed)
      const videoFormat = ytdl.chooseFormat(videoInfo.formats, { quality: 'highest' });
      
      if (!videoFormat) {
        await doReact("❌");
        return m.reply("Failed to get video format.");
      }

      // Get the video URL from the chosen format
      const videoUrl = videoFormat.url;

      Atlas.sendMessage(
        m.from,
        {
          video: {
            url: videoUrl,
          },
        },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error occurred:", error);
      await doReact("❌");
      m.reply("An error occurred while processing your request.");
    }
  },
};
