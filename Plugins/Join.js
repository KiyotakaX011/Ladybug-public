module.exports = {
  name: "join",
  alias: ["joingc"],
  description: "Ask the bot to join a group",
  category: "Mods",
  usage: "join <link>",
  
  start: async (Atlas, message, { args, text, prefix, isCreator, pushName, doReact,modStatus }) => {
    try {
      const { from, quoted } = message;
      await doReact("🐞");

      if (modStatus === "false" && !isCreator) {
        return Atlas.sendMessage(
          from,
          { text: "Sorry, only my *Owner* and *Mods* can use this command!" },
          { quoted: message }
        );
      }

      if (!text) {
        return Atlas.sendMessage(
          from,
          { text: "Please provide a valid WhatsApp group link!" },
          { quoted: message }
        );
      }

      if (!args[0].includes("whatsapp.com")) {
        return Atlas.sendMessage(
          from,
          { text: "Please provide a valid WhatsApp group link!" },
          { quoted: message }
        );
      }

      const gcJoinCode = args[0].split("https://chat.whatsapp.com/")[1];

      await Atlas.groupAcceptInvite(gcJoinCode)
        .then(async (res) => {
          Atlas.sendMessage(
            from,
            { text: "_Successfully joined!_" },
            { quoted: message }
          ).catch((e) => {
            Atlas.sendMessage(
              from,
              { text: "_Failed to join the group! Maybe the bot was removed from there before!_" },
              { quoted: message }
            );
          });
        })
        .catch((e) => {
          Atlas.sendMessage(
            from,
            { text: "_Failed to join the group! Maybe the bot was removed from there before!_" },
            { quoted: message }
          );
        });
    } catch (error) {
      console.error("Error occurred while executing 'join' command:", error);
      return "An error occurred while joining the group.";
    }
  },
};
