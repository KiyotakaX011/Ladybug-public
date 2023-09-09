// const mumaker = require("mumaker");
// //const botName = "YourBotName"; // Replace with your bot's name

// module.exports = {
//   name: "logo",
//   alias: ["logo"], // Assuming mergedCommands is defined somewhere
//   uniquecommands: ["logo"],
//   description: "All Logo maker Commands",
//   start: async (
//     Atlas,
//     m,
//     {
//       inputCMD,
//       text,
//       pushName,
//       prefix,
//       doReact,
//       args,
//       mentionByTag,
//       mime,
//       isMedia,
//       quoted,
//       botName
//     }
//   ) => {
//     try {
//       // Use the mumaker.textpro function to create the logo
//       const textProResult = await mumaker.textpro(
//         "https://textpro.me/create-blackpink-logo-style-online-1001.html",
//         ["teks"]
//       );

//       // Extract the image URL from the response
//       const textProImage = textProResult.image;

//       // Use the extracted image URL to send the message

//       console.log(textProImage);
      
//       Atlas.sendMessage(
//         m.from,
//         { image: { url: textProImage }, caption: `Made by ${botName}` },
//         { quoted: m }
//       );
//     } catch (error) {
//       console.error("An Error occurred:", error);
//       m.reply("An Error occurred!");
//     }
//   },
// };


const axios = require("axios");
const cheerio = require("cheerio");

module.exports = {
  name: "extra",
  alias: ["textdesign", "td",'listonline'],
  uniquecommands: ["textdesign", "td",'listonline'],
  description: "All Audio Editing Commands",
  start: async (
    Atlas,
    m,
    {
      inputCMD,
      text,
      args,
      doReact,
      isCreator,
      store
    }
  ) => {
    switch (inputCMD) {
      case "td":
      case "textdesign":
        await doReact("〽");
        function styletext(teks) {
          return new Promise((resolve, reject) => {
            axios.get('http://qaz.wtf/u/convert.cgi?text=' + teks)
              .then(({ data }) => {
                let $ = cheerio.load(data);
                let fetchedresult = [];
                $('table > tbody > tr').each(function (a, b) {
                  fetchedresult.push({
                    name: $(b).find('td:nth-child(1) > span').text(),
                    result: $(b).find('td:nth-child(2)').text().trim()
                  });
                });
                resolve(fetchedresult);
              })
              .catch(error => {
                reject(error);
              });
          });
        }

        if (!args[0]) {
          return Atlas.sendMessage(
            m.from,
            { text: `Please provide a Text !` },
            { quoted: m }
          );
        }

        try {
          let anu = await styletext(text);
          let teks = "";
          for (let i of anu) {
            teks += `✾   ${i.result}\n\n`;
          }
          Atlas.sendMessage(m.from, { text: teks }, { quoted: m });
        } catch (error) {
          console.error(error);
          Atlas.sendMessage(
            m.from,
            { text: `An error occurred while processing the text.` },
            { quoted: m }
          );
        }
    
    break;
        case 'listonline':
case 'memonline':
  try {
    if (!isCreator) {
      await m.reply('OWNER ONLY')
      return;
    }

    let chatId = args && /\d+\-\d+@g.us/.test(args[0]) ? args[0] : m.from;

    // if (!store || !store.presences || !store.presences[chatId]) {
    //   await Atlas.sendMessage(m.from, {text : "Online presence data not available for this chat."});
    //   return;
    // }

    let onlineMembers = Object.keys(store.presences[chatId]);
    let listIndex = 1;
    let onlineList = onlineMembers.map(member => `${listIndex++}. @${member.replace(/@.+/, '')}`).join('\n');

    await Atlas.sendMessage(m.from, {
      text: `  「 *Online Members* 」\n\n${onlineList}`,
      mentions: onlineMembers.map(member => ({ tag: member }))
    }, { quoted: m });

  } catch (error) {
    console.error(error);
    await Atlas.sendMessage(m.from, "An error occurred.");
  }
        
  break;

 
      default:
        break;
    }
  }
};