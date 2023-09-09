module.exports = {
  name: "bye",
  alias: ["goodbye", "adios"],
  description: "Send a farewell message",
  start: async (Atlas, m, { doReact, pushName }) => {
    try {
      await doReact("😢");

      const farewellMessage = `Goodbye, ${pushName}! Have a great day!`;

      await Atlas.sendMessage(
        m.from,
        { text: farewellMessage }, // Wrap the farewell message in an object
        { quoted: m }
      );
    } catch (error) {
      console.error("Error occurred while executing 'bye' command:", error);
      return "An error occurred while sending the farewell message.";
    }
  },
};

