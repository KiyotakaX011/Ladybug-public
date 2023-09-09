const gis = require("g-i-s");
const axios = require("axios");
const hxzapi = require("hxz-api");
let mergedCommands = [
  "gig",
  "gimage",
  "googleimage",
  "image",
  "ppcouple",
  "couplepp",
  "gifsearch",
  "gif",
  "pin",
  "pinterest",
];

module.exports = {
  name: "pictures",
  alias: [...mergedCommands],
  uniquecommands: [
    "image",
    "couplepp",
    "gif",
    "pin",
  ],
  description: "All picture related commands",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix }) => {
    try {
      switch (inputCMD) {
        case "ppcouple":
        case "couplepp":
          await doReact("❤️");
          let imgRes = await axios.get("https://zany-teal-alligator-suit.cyclic.app/couple");
          Atlas.sendMessage(
            m.from,
            { image: { url: imgRes.data.male }, caption: `_For Him..._` },
            { quoted: m }
          );
          Atlas.sendMessage(
            m.from,
            { image: { url: imgRes.data.female }, caption: `_For Her..._` },
            { quoted: m }
          );
          break;

        case "gig":
        case "gimage":
        case "googleimage":
        case "image":
          if (!text) {
            await doReact("❔");
            return m.reply(`Please provide an image Search Term !\n\nExample: *${prefix}image cheems*`);
          }
          await doReact("🎴");
          gis(text, async (error, result) => {
            if (error) {
              console.error("Image search error:", error);
              return m.reply("An error occurred while performing the image search.");
            }

            n = result;
            let images = n[Math.floor(Math.random() * n.length)].url;
            let resText = `\n_🎀 Image Search Term:_ *${text}*\n\n_🧩 Powered by_ *${botName}*\n`;

            await Atlas.sendMessage(
              m.from,
              {
                image: { url: images },
                caption: resText,
              },
              { quoted: m }
            );
          });

          break;

        case "gif":
        case "gifsearch":
          if (!text) {
            await doReact("❔");
            return m.reply(`Please provide a Tenor gif Search Term!\n\nExample: *${prefix}gif cheems bonk*`);
          }
          await doReact("🎴");
          let resGif = await axios.get(
            `https://tenor.googleapis.com/v2/search?q=${text}&key=${tenorApiKey}&client_key=my_project&limit=12&media_filter=mp4`
          );
          let resultGif = Math.floor(Math.random() * 12);
          let gifUrl = resGif.data.results[resultGif].media_formats.mp4.url;
          await Atlas.sendMessage(
            m.from,
            {
              video: { url: gifUrl },
              gifPlayback: true,
              caption: `🎀 Gif search result for: *${text}*\n`,
            },
            { quoted: m }
          );
          break;

        case "pin":
        case "pinterest":
          if (!text) {
            await doReact("❔");
            return m.reply(`Please provide a Pinterest image Search Term!\n\nExample: *${prefix}pin cheems*`);
          }
          await doReact("📍");
          hxzapi
            .pinterest(text)
            .then(async (res) => {
              if (res.length === 0) {
                console.error("Pinterest search error: No results found");
                return m.reply("No results found for the Pinterest search term.");
              }

              imgnyee = res[Math.floor(Math.random() * res.length)];
              let txt = `\n_🎀 Pinterest Search Term:_ *${text}*\n\n_🧩 Powered by_ *${botName}*\n`;
              let buttonMessage = {
                image: { url: imgnyee },
                caption: txt,
              };
              Atlas.sendMessage(m.from, buttonMessage, { quoted: m });
            })
            .catch((error) => {
              console.error("Pinterest search error:", error);
              return m.reply("An error occurred while performing the Pinterest search.");
            });

          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Command error:", error);
      return m.reply("An error occurred while executing the command.");
    }
  },
};
