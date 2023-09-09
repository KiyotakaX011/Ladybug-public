/* 
 * This file is copyrighted to Ra_One.
 * Unauthorized downloading or usage without permission is strictly prohibited and may be subject to legal consequences.
 */
const fs = require("fs");


const uptime = () => {
  const totalSeconds = process.uptime();
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${hours}:${minutes}:${seconds}`;
};

module.exports = {
  name: "hi",
  alias: ["hello", "hoi", "yo", "bonjour"],
  description: "Send a random picture and greet the user",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix, pushName, botName }) => {
    try {
      await doReact("🥰");

      const pad = (s) => (s < 10 ? "0" : "") + s;
      const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);
        return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
      };

      const assetsFolder = "./Assets"; // Path to the assets folder
      const files = fs.readdirSync(assetsFolder); // Read the files in the folder

      // Select a random file
      const randomIndex = Math.floor(Math.random() * files.length);
      const randomFile = files[randomIndex];

      // Send the random picture and greet the user
      const imagePath = `${assetsFolder}/${randomFile}`;
      await Atlas.sendMessage(
        m.from,
        {
          image: { url: imagePath },
          caption: `\nHello *${pushName}* senpai, I am *${botName}*. Type *${prefix}help* to get my full command list.\n\n_🧩 Server Uptime:_ *${formatTime(process.uptime())}*\n_🎀 Status:_ *Operational*\n\._⚠ Mode :_ --" `,
        },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error occurred while executing 'hi' command:", error);
      return "An error occurred while sending the random picture.";
    }
  },
};
