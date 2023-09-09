const {
  userData,
  groupData,
  systemData,
  pluginData,
} = require("../System/MongoDB/MongoDB_Schema.js");

const {
  offGroup,
  checkOffGroup,
  switchOnGroup
} = require("../System/MongoDB/MongoDb_Core");

module.exports = {
  name: "cmd",
  alias: ["bot", "mlady", "ladybug"],
  desc: "Enable or disable bot in a group",
  category: "Group",
  usage: "cmd [on/off]",
  react: "🥺",
  start: async (
    Atlas, // Replace Miku with Atlas
    m,
    {
      args,
      isBotAdmin,
      isAdmin,
      isCreator,
      reply,
      prefix,
      pushName,
      participants,
    }
  ) => {
    if (!isAdmin)
      return Atlas.sendMessage(
        m.from,
        {
          text: `*${pushName}* must be *Admin* to turn ON/OFF bot !`,
        },
        { quoted: m }
      );

    let checkdata = await groupData.findOne({ id: m.from });
    var groupe = await Atlas.groupMetadata(m.from);
    var members = groupe["participants"];
    var mems = [];
    members.map(async (adm) => {
      mems.push(adm.id.replace("c.us", "s.whatsapp.net"));
    });

    if (args[0] === "on") {
      if (!checkdata) {
        await new groupData({ id: m.from, botSwitch: "true" }).save();
        Atlas.sendMessage(
          m.from,
          {
            text: `*${botName}* has been Re-Activated in this group!`,
            contextInfo: { mentionedJid: mems },
          },
          { quoted: m }
        );
        return Atlas.sendMessage(
          m.from,
          { text: `*${botName}* has been Re-Activated in this group!` },
          { quoted: m }
        );
      } else {
        if (checkdata.botSwitch == "true")
          return Atlas.sendMessage(
            m.from,
            { text: `*${botName}* is already Activated in this group !` },
            { quoted: m }
          );
        await groupData.updateOne({ id: m.from }, { botSwitch: "true" });
        return Atlas.sendMessage(
          m.from,
          { text: `*${botName}* has been Activated in this group! Now everyone here can use bot.` },
          { quoted: m }
        );
      }
    } else if (args[0] === "off") {
      if (!checkdata) {
        await new groupData({ id: m.from, botSwitch: "false" }).save();
        return Atlas.sendMessage(
          m.from,
          {
            text: `*${botName}* has been De-Activated in this group !\n\nNow only *Admins* can use bot`,
          },
          { quoted: m }
        );
      } else {
        if (checkdata.botSwitch == "false")
          return Atlas.sendMessage(
            m.from,
            { text: `*${botName}* is already De-Activated in this group !\n\nNow only *Admins* can use bot` },
            { quoted: m }
          );
        await groupData.updateOne({ id: m.from }, { botSwitch: "false" });
        return Atlas.sendMessage(
          m.from,
          {
            text: `${botName} has been De-Activated in this group !\n\nNow only *Admins* can use bot`,
          },
          { quoted: m }
        );
      }
    } else {
      await Atlas.sendMessage(m.from, {
        image: { url: botImage2 },
        caption: `\n *「  Admin Only Mode  」*\n\nNote: This feature will only make bot usable for admins only.\n\n*_Usage:_*\n\n*${prefix}bot on*\n*${prefix}bot off*\n\n*Current Status:* ${checkdata.botSwitch == "true" ? "On" : "Off"}`,
      }, { quoted: m });
    }
  },
};
