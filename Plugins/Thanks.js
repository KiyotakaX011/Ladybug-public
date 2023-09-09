const fs = require("fs");

module.exports = {
  name: "thanks",
  alias: ["tq"],
  description: "Send a random picture from the assets folder",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix }) => {
    try {
      await doReact("🥰");

      const assetsFolder = "./Assets"; // Path to the assets folder
      const files = fs.readdirSync(assetsFolder); // Read the files in the folder
       let txt2 = `No need dear afterall i'm **${botName}** ! I'm here to help you anytime.\n\nIf you have any further questions or need assistance, feel free to ask.\n\nHave a great day! 😊\n\n *BE MIRACULOUS*`;

      // Select a random file
      const randomIndex = Math.floor(Math.random() * files.length);
      const randomFile = files[randomIndex];

      // Send the random picture
      const imagePath = `${assetsFolder}/${randomFile}`;
      await Atlas.sendMessage(m.from, { image: fs.readFileSync(imagePath),caption:txt2 }, { quoted: m });
    } catch (error) {
      console.error("Error occurred while executing 'tq' command:", error);
      return "An error occurred while sending the random picture.";
    }
  },
};



 