require("dotenv").config();

let gg = process.env.MODS;
if (!gg) {
  gg = "917820953034";   // You can replace this number with yours //
}


global.owner = gg.split(",");
global.mongodb = process.env.MONGODB || "mongodb+srv://raoneyt2006:6rPh5vJ8uMnfXmZ9@brook.97vom5d.mongodb.net/?retryWrites=true&w=majority";
global.sessionId = process.env.SESSION_ID || "gfgghfhgfhgfgh";
global.prefa = process.env.PREFIX || "-";
global.tenorApiKey = process.env.TENOR_API_KEY || "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c";
global.packname = process.env.PACKNAME || `Ladybug`;
global.author = process.env.AUTHOR || "by: RA-1";
global.port = process.env.PORT || "10000";
global.openAiAPI = process.env.OPENAI_API || "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";
global.owner = gg.split(",");
global.fgmodskey = process.env.FGMODS || "563fffb8"


module.exports = {
  mongodb: global.mongodb,
};

