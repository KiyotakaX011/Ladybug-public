module.exports = {
  name: "createcouple",
  alias: ["couple","soulmate"],
  desc: "Create a random couple from two group members",
  start: async (
    Atlas,
    m,
    { text, prefix, isBotAdmin, isAdmin, participants,doReact,inputCMD}
  ) => {

    await doReact("💌")
    /*if (!isAdmin)
      return m.reply("Only admins can use this command.");*/

    if (participants.length < 2)
      return m.reply("There must be at least 2 participants to create a couple.");

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    try {
      const [person1, person2] = shuffleArray([...participants]).slice(0, 2);

      const couple1 = `@${person1.id.split("@")[0]}`;
      const couple2 = `@${person2.id.split("@")[0]}`;

      const message = `🎉 *Congratulations! 🎉\n\n${couple1} and ${couple2} are our new  a couple!* 💖`;

      await Atlas.sendMessage(
        m.from,
        { text: message, mentions: [person1.id, person2.id] },
        { quoted: m }
      );
    } catch (error) {
      console.error("Error creating a couple:", error);
      m.reply("An error occurred while creating a couple. Please try again.");
    }
  },
};