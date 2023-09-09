const mumaker = require("mumaker");

module.exports = {
  name: "logomakers",
  alias: ["logo"],
  uniquecommands: [
    "logo"
  ],
  description: "All Logo maker Commands",
  start: async (
    Atlas,
    m,
    {
      inputCMD,
      text,
      pushName,
      prefix,
      doReact,
      args,
      mentionByTag,
      mime,
      isMedia,
      quoted,
    }
  ) => {
    try {
      const { image } = await mumaker.textpro("https://textpro.me/create-blackpink-logo-style-online-1001.html", [
        "teks",
      ]);

      const botName = "YourBotName"; // Replace with your bot's name

      Atlas.sendMessage(
        m.from,
        { image: { url: image }, caption: `Made by ${botName}` },
        { quoted: m }
      );
    } catch (err) {
      console.log("An Error occurred:", err);
      m.reply("An Error occurred while generating the logo.");
    }
  }
};
