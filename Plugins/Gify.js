 // I HAVE FORGOT TO ADD SOME GIF U CAN ADD THEM 😅😅


const axios = require('axios');

let mergedCommands = [
  "eating",
  "fly",
  "laugh",
  "miss",
  "love",
  "walk",
  "care",
  "angry",
  "beat",
  
];

let commandCountMap = new Map();

module.exports = {
  name: "GIF r [under dev]",
  alias: [...mergedCommands],
  uniquecommands: [
    "eating",
    "fly",
    "laugh",
    "miss",
    "love",
    "walk",
    "care",
    "angry",
    "beat",
    
  ],
  description: "All reaction commands",

  start: async (Atlas, m, { prefix, mentionByTag, inputCMD,doReact }) => {
    try {
      const users = mentionByTag;
      if (m.quoted && !users.includes(m.quoted.sender))
        users.push(m.quoted.sender);
      while (users.length < 1) users.push(m.sender);
      const reactant = users[0];
      const single = reactant === m.sender;


      

      // Check if the user has exceeded the command usage limit
      if (commandCountMap.has(m.sender)) {
        const count = commandCountMap.get(m.sender);
        if (count >= 6) {
          await Atlas.sendMessage(
            m.from,
            "You have exceeded the usage limit for this command (6 times).",
            { quoted: m }
          );
          return;
        }
        commandCountMap.set(m.sender, count + 1);
      } else {
        commandCountMap.set(m.sender, 1);
      }

      // Implement the logic for each reaction command
      switch (inputCMD) {
        case "eating":
          await doReact("❤️");
          await Atlas.sendMessage(
            m.from,
            {
              video: {
                url:
                  "https://media.tenor.com/3aaAzbTrTMwAAAPo/google-technology-company.mp4",
              },
              gifPlayback: true,
              caption: `*@${m.sender.split("@")[0]} is eating${
                single ? "" : ` with @${reactant.split("@")[0]}`
              }*`,
              mentions: [m.sender, reactant],
            },
            { quoted: m }
          );
          break;
          
        case "fly":
          await doReact("❤️");
          const flyLinks = [
            "https://graph.org/file/66c6207b5921bf6e24f97.mp4",
            "https://graph.org/file/896f8770f43fa18f5ad09.mp4",
            "https://graph.org/file/7322f35bb7b846611138a.mp4",
            "https://graph.org/file/00a9a96c87ca3a1e097f7.mp4",
            "https://graph.org/file/68af3811836b734b6d71a.mp4",
          ];

          const randomFlyLink = flyLinks[Math.floor(Math.random() * flyLinks.length)];

          await Atlas.sendMessage(
            m.from,
            {
              video: {
                url: randomFlyLink,
              },
              gifPlayback: true,
              caption: `*@${m.sender.split("@")[0]} is flying${
                single ? "" : ` with @${reactant.split("@")[0]}`
              }*`,
              mentions: [m.sender, reactant],
            },
            { quoted: m }
          );
          break;

        case "laugh":
          await doReact("❤️");

          const laughLinks = [
            "",
          ];

          const randomlaughLink = laughLinks[Math.floor(Math.random() * laughLinks.length)];
          await Atlas.sendMessage(
            m.from,
            {
              video: {
                url: randomlaughLink
              },
              gifPlayback: true,
              caption: `*@${m.sender.split("@")[0]} is laughing${
                single ? "" : ` with @${reactant.split("@")[0]}`
              }*`,
              mentions: [m.sender, reactant],
            },
            { quoted: m }
          );
          break;

        case "miss":
          await doReact("❤️");
          const missLinks = [
            "https://graph.org/file/9f7141aca8374b5a704b6.mp4",
            "https://graph.org/file/e85d8ab06185e12eb5cdb.mp4",
            "https://graph.org/file/2ed3ceeec6cd678bea2a7.mp4",
            "https://graph.org/file/c5fd2ad5706d85fef498c.mp4",
            "https://graph.org/file/ab8dda7d8129c51765d60.mp4",
            "https://graph.org/file/82dd14e6c4635a467575a.mp4",
          ];

          const randommissLink = missLinks[Math.floor(Math.random() * missLinks.length)];
          
          await Atlas.sendMessage(
            m.from,
            {
              video: {
                url:randommissLink,
                
              },
              gifPlayback: true,
              caption: `*@${m.sender.split("@")[0]} is missing${
                single ? "" : `@${reactant.split("@")[0]}`
              }*`,
              mentions: [m.sender, reactant],
            },
            { quoted: m }
          );
          
          break;

        case "love":
          await doReact("❤️");
          const loveLinks = [
            "https://graph.org/file/a460aa27e820b6bd86813.mp4",
            "https://graph.org/file/d44175b97b572d929d0ec.mp4",
            "https://graph.org/file/0ff491a72b5b0faf71791.mp4",
            "https://graph.org/file/bf85b971db7bc9144b06e.mp4",
          ];

          const randomLoveLink = loveLinks[Math.floor(Math.random() * loveLinks.length)];

          await Atlas.sendMessage(
            m.from,
            {
              video: {
                url: randomLoveLink,
              },
              gifPlayback: true,
              caption: `*@${m.sender.split("@")[0]} is in love${
                single ? "" : ` with @${reactant.split("@")[0]}`
              }*`,
              mentions: [m.sender, reactant],
            },
            { quoted: m }
          );
          break;

        case "walk":
          await doReact("❤️");
          const walkLinks = [
            "https://media.tenor.com/3aaAzbTrTMwAAAPo/google-technology-company.mp4",
             
          ];

          const randomwalkLink = walkLinks[Math.floor(Math.random() * walkLinks.length)];

          await Atlas.sendMessage(
            m.from,
            {
              video: {
                url: randomwalkLink,
              },
              gifPlayback: true,
              caption: `*@${m.sender.split("@")[0]} is walking${
                single ? "" : ` with @${reactant.split("@")[0]}`
              }*`,
              mentions: [m.sender, reactant],
            },
            { quoted: m }
          );
          break;

        case "care":
          await doReact("❤️");
          await Atlas.sendMessage(
            m.from,
            {
              video: {
                url:
                  "https://media.tenor.com/3aaAzbTrTMwAAAPo/google-technology-company.mp4",
              },
              gifPlayback: true,
              caption: `*@${m.sender.split("@")[0]} is caring${
                single ? "" : ` for @${reactant.split("@")[0]}`
              }*`,
              mentions: [m.sender, reactant],
            },
            { quoted: m }
          );
          break;

        case "angry":
          await doReact("❤️");
           const angryLinks = [
             "https://graph.org/file/a2134cd0764da3cd46816.mp4",
             "https://graph.org/file/c783f800e693958fa2ff5.mp4",
             "https://graph.org/file/88ce508daccf171e885fb.mp4",
             "https://graph.org/file/65ec9d3a1f1b9b3bffa90.mp4",
             "https://graph.org/file/bc661b7f2b07820d77b1f.mp4",
          ];

          const randomangryLink = angryLinks[Math.floor(Math.random() * angryLinks.length)];

          await Atlas.sendMessage(
            m.from,
            {
              video: {
                url: randomangryLink,
              },
              gifPlayback: true,
              caption: `*@${m.sender.split("@")[0]} is angry ${
                single ? "" : ` at @${reactant.split("@")[0]}`
              }*`,
              mentions: [m.sender, reactant],
            },
            { quoted: m }
          );
          break;

        case "beat":
          await doReact("❤️");
          const beatLinks = [
            "https://graph.org/file/147f7e4637b0a173a213b.mp4",
            "https://graph.org/file/dabc0937deb1f369c5814.mp4",
            "https://graph.org/file/dabc0937deb1f369c5814.mp4",
            "https://graph.org/file/d0c7906802d6663b3fe7b.mp4",
            "https://graph.org/file/ede89bd216a2c2d48d5b5.mp4",
            "https://graph.org/file/82dd14e6c4635a467575a.mp4",    
          ];

          const randombeatLink = beatLinks[Math.floor(Math.random() * beatLinks.length)];

          await Atlas.sendMessage(
            m.from,
            {
              video: {
                url: randombeatLink,
              },
              gifPlayback: true,
              caption: `*@${m.sender.split("@")[0]} is beating${
                single ? "" : ` @${reactant.split("@")[0]}`
              }*`,
              mentions: [m.sender, reactant],
            },
            { quoted: m }
          );
          break;

    

        default:
          await Atlas.sendMessage(
            m.from,
            "Invalid reaction command. Please use one of the available reaction commands.",
            { quoted: m }
          );
          break;
      }
    } catch (error) {
      console.error("Error:", error);
      await m.reply("An error occurred while processing your request.");
    }
  },
};
