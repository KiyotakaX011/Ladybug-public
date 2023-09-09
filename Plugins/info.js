const formatTime = (seconds) => {
  const pad = (s) => (s < 10 ? "0" : "") + s;
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};

module.exports = {
  name: "info",
  alias: ["bot", "infobot"],
  description: "Check bot's status and statistics",
  start: async (Atlas, m, { prefix, doReact }) => {
    try {
      await doReact("💛");

      const uptimeInSeconds = process.uptime();
      const uptimeFormatted = formatTime(uptimeInSeconds);

      let FetchGC = await Atlas.groupFetchAllParticipating();
      let group = Object.values(FetchGC);
      let anu = group.map((v) => v.id);
      
      let totalUsers = await Atlas.userFetchAlluserID();
      let user = Object.values(totalUsers);
      let anu2 = user.map((v) => v.id);

      // Replace these with actual functions to get total users, groups, and bots
       
      const uaers = anu2.length;
      const totalGroups = anu.length;
      //const totalBots = await Atlas.getBotsCount(); // Assuming this is the correct function

     // const botName = "YourBotName"; // Replace with your bot's name

      const message = `✨💝 _*${botName}*_ 💝✨\n\n`
        + `_*ᴜᴘᴛɪᴍᴇ:*_ ${uptimeFormatted}\n`
        + `_*ᴛᴏᴛᴀʟ ᴜꜱᴇʀꜱ:*_  ${uaers}\n`
        + `_*ᴛᴏᴛᴀʟ ɢʀᴏᴜᴘꜱ:*_  ${totalGroups}\n`
        + `_*ᴛᴏᴛᴀʟ ʙᴏᴛꜱ:*_   $ {totalBots}\n`
        + `_*ᴄᴜʀʀᴇɴᴛ ᴄʜᴀʀᴀᴄᴛᴇʀꜱ ɪɴ ᴍᴇꜱꜱᴀɢᴇ: ${m.body.length}*_`;
       

      await Atlas.sendMessage(m.from, {
        text: message,
        quoted: m,
      });
    } catch (error) {
      console.error("Error occurred while executing 'info' command:", error);
      return m.reply("An error occurred while retrieving bot information.");
    }
  },
};
