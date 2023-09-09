const axios = require("axios");
const fs = require("fs");

module.exports = {
  name: "blackpink",
  alias: ["bp"],
  description: "Blackpink pics",

  start: async (Atlas, m, { text, prefix, mentionByTag, doReact, inputCMD, pushName}) => {
    try {
      await doReact("🥰");

      // Read the file and get the contents as a string
      const fileContent = fs.readFileSync("Blackpink.txt", "utf8");

      // Split the file content into an array of links
      const links = fileContent.split("\n");

      // Filter out empty or invalid links
      const validLinks = links.filter((link) => link.trim().startsWith("http"));

      // Pick a random link from the valid links
      const randomLink = validLinks[Math.floor(Math.random() * validLinks.length)];

    //   let cp2 = `Powered By : *${botName}*  _Thanks to *guru* for images_`;

      if (randomLink) {
        await Atlas.sendMessage(
          m.from,
          {
            image: {
              url: randomLink,
            },
            caption: `Powered By : *${botName}*  _Thanks to *guru* for images_`,
          },
          { quoted: m }
        );
      } else {
        await Atlas.sendMessage(m.from, "No Blackpink images available.");
      }
    } catch (error) {
      console.error(error);
    }
  },
};
