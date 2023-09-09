 

const mongoose = require("mongoose");
const config = require("../../Configurations.js");
const options = {
  socketTimeoutMS: 30000,
};

const db1 = mongoose.createConnection(config.mongodb, options); // Connection for userData and groupData
const db2 = mongoose.createConnection(config.mongodb, options); // Connection for systemData and pluginData
const db3 = mongoose.createConnection(config.mongodb, options);
// Connection for afkData
const db4 = mongoose.createConnection(config.mongodb, options); // Connection for afkData
 
const GroupSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  antilink: { type: Boolean, default: false },
  antiword: { type: Boolean, default: false },
  nsfw: { type: Boolean, default: false },
  autoreact: { type: Boolean, default: false },
  bangroup: { type: Boolean, default: false },
  chatBot: { type: Boolean, default: false },
  botSwitch: { type: Boolean, default: true },
  switchNSFW: { type: Boolean, default: true },
  switchWelcome: { type: Boolean, default: false },
  language: { type: String, default: 'en' } // Default to English
});

const UserSchema = new mongoose.Schema({
 id: { type: String, unique: true, required: true },
  ban: { type: Boolean, default: false },
  afk: { type: Boolean, default: false },
  afkReason: { type: String, default: "null" }, 
  name: { type: String },
  addedMods: { type: Boolean, default: false },
});

const CoreSchema = new mongoose.Schema({
    id: { type: String, unique: false, required: true, default: "1" },
  seletedCharacter: { type: String, default: "0" },
  PMchatBot: { type: Boolean, default: false },
  botMode: { type: String, default: "public" },
});

const PluginSchema = new mongoose.Schema({
   plugin: { type: String },
    url: { type: String },
});

const AFKSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  afk: { type: Boolean, default: false },
  afkReason: { type: String, default: "null" },
});


 
const playerSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  name: { type: String },
  inventory: {
    wood: { type: Number, required: true },
    stone: { type: Number, required: true },
    iron: { type: Number, required: true },
    diamonds: { type: Number, required: true },
    goldenApple: { type: Number, required: true },
    diamondpickaxe: { type: Number, required: true },
    ironpickaxe: { type: Number, required: true },
    stonepickaxe: { type: Number, required: true },
    woodenaxe: { type: Number, required: true },
  },
});




const TicTacToeSchema = new mongoose.Schema({
  playerX: { type: String, required: true },
  playerO: { type: String, required: true },
  state: { type: Number, default: 0 },
});


const OtherBotStatusSchema = new mongoose.Schema({
  botName: { type: String, required: true },
  status: { type: String, required: true },
});

 


  const ResponseSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  responseContent: { type: String, required: true },
});

const ResponseData = mongoose.model("ResponseData", ResponseSchema);
const botchema = db4.model("OtherBotStatusData", OtherBotStatusSchema);
const TicTacToeGame = db2.model("TicTacToeGame", TicTacToeSchema);
const userData = db1.model("UserData", UserSchema);
const groupData = db1.model("GroupData", GroupSchema);
const systemData = db2.model("SystemData", CoreSchema);
const pluginData = db2.model("PluginData", PluginSchema);

    
module.exports = { userData, groupData, systemData, pluginData, TicTacToeGame,botchema, ResponseData  };
