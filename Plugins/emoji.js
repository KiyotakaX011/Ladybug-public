const fetch = require("node-fetch");

module.exports = {
  name: "einfo",
  alias: ["emoji"],
  description: "emoji info",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix }) => {
    try {
      if (!text) {
        return m.reply("Oops! Seems like you forgot to provide an emoji. Please provide a valid emoji to search.");
      }

      await doReact("👀");
      let emoji = text;

      let res = await fetch(
        `https://api-fgmods.ddns.net/api/info/emoji?emoji=${emoji}&apikey=YOUR_FGMODS_KEY`
      );

      if (!res.ok) {
        return m.reply("oops! The emoji information request failed. Please try again later.");
      }

      let json = await res.json();

      console.log('JSON response:', json);

      if (!json.status) {
        return m.reply("Oops! Something went wrong. The emoji gods are not happy. Please try again later.");
      }

      const emojiData = json.result;

      const result = `🔎 *Emoji Information* 🎉\n\n`
        + `😃 *Emoji:* ${emojiData.emoji}\n`
        + `🔤 *Name:* ${emojiData.name}\n`
        + `👥 *Group:* ${emojiData.group}\n`
        + `🔖 *Sub Group:* ${emojiData.sub_group}\n`
        + `🔢 *Codepoints:* ${emojiData.codepoints}\n`
        + `🌟 *Fancy Name:* ${emojiData.fancyName}\n`
        + `🌈 *Twemoji URL:* ${emojiData.twemoji}\n`
        + `🔠 *Unicode:* ${emojiData.unicode}\n`
        + `📝 *Formatted Name:* ${emojiData.formattedName}`;

      await Atlas.sendMessage(m.from, { text: result }, { quoted: m });
    } catch (error) {
      console.error(error);
      m.reply("Oops! Something went wrong while retrieving emoji information. Please try again later.");
    }
  },
};
