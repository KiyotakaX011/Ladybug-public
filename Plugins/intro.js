module.exports = {
  name: "Introduction",
  alias: ["intro"],
  description: "Introduce the bot",
  start: async (Atlas, m, { doReact }) => {
    try {
      await doReact("✨");

      const introduction = `
        \`\`\`✨ Introducing Myself ✨\`\`\`
        
        Hello, I'm *${botName}* !! 🐞
        
        I'm here to help you type *.help*.
        
        Feel free to ask me anything!
        
        \`\`\`🌟 Be Miraculous ! 🌟\`\`\`
      `;
      await Atlas.sendMessage(m.from, { text: introduction }, { quoted: m });
    } catch (error) {
      console.error(error);
      m.reply("An error occurred while processing the Introduction command.");
    }
  },
};
