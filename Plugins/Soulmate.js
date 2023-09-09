const axios = require("axios");

module.exports = {
  name: "mysoulmate",
  alias: ["randomsoulmate", "rs"],
  desc: "Select a random soulmate from the group chat",
  start: async (Atlas, m, { doReact, participants, pushName }) => {
    await doReact("💑");

    if (participants.length < 2) {
      return m.reply("There must be at least 2 participants to select a soulmate.");
    }

    const randomIndex = Math.floor(Math.random() * participants.length);
    const user = participants[randomIndex];
    participants.splice(randomIndex, 1);

    const randomSoulmateIndex = Math.floor(Math.random() * participants.length);
    const soulmate = participants[randomSoulmateIndex];

    const lovingComments = [
      "You two make a perfect match! ❤️",
      "Love is in the air! 💞",
      "May your souls be forever intertwined! 💖",
      "Wishing you a lifetime of love and happiness together! 🌹",
    ];
    const randomCommentIndex = Math.floor(Math.random() * lovingComments.length);
    const randomComment = lovingComments[randomCommentIndex];

    const message = `💖 *Soulmate Match* 💖\n\n` +
      `User: @${pushName}\n` +
      `Soulmate: @${soulmate.id.split("@")[0]}\n\n` +
      `Comment: ${randomComment}`;

    await Atlas.sendMessage(
      m.from,
      {
        image: {
          url: "https://wallpapercave.com/dwp1x/wp2007987.png",
        },
        caption: message,
        mentions: [m.sender, soulmate.id],
      },
      { quoted: m }
    ).catch((err) => {
      return "Error!";
    });
  },
};
