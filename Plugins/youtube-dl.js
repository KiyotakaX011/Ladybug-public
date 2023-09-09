/*const YT = require("../System/Ytdl-Core.js");
const fs = require("fs");
const yts = require("youtube-yts");
const ffmpeg = require("fluent-ffmpeg");
const {
  fetchJson,
  getBuffer,
  GIFBufferToVideoBuffer,
} = require("../System/Function2.js");

let mergedCommands = [
  "play",
  "song",
  "ytmp3",
  "mp3",
  "ytaudio",
  "yta",
  "ytmp4",
  "mp4",
  "ytvideo",
  "ytv",
  "video",
];

module.exports = {
  name: "mediaDownloader",
  alias: [...mergedCommands],
  uniquecommands: ["song", "video", "ytmp3", "ytmp4"],
  description: "All file dowloader commands",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix, pushName }) => {
    switch (inputCMD) {
      case "play":
      case "song":
        if (!text) {
          await doReact("❌");
          return m.reply(
            `Please provide a song name !\n\nExample: *${prefix}song despacito*`
          );
        }
        await doReact("📥");
        thumbAtlas = "https://graph.org/file/d0a287fa875c809f234ce.jpg";
        songInfo = await yts(text);
        song = songInfo.videos[0];
        videoUrl = song.url;
        videoId = videoUrl.split("v=")[1];

        await Atlas.sendMessage(
          m.from,
          {
            image: { url: song.thumbnail },
            caption: `\nDownloading: *${song.title}*
            
_🕛 Duration:_ *${song.timestamp}*

_🎀 Channel Name:_ *${song.author.name}*

_🏮 Video Uploaded:_ *${song.ago}*\n`,
          },
          { quoted: m }
        );

        YT.mp3(videoId).then((file) => {
          const inputPath = file.path;
          const outputPath = inputPath + ".opus";

          ffmpeg(inputPath)
            .format("opus")
            .on("error", (err) => {
              console.error("Error converting to opus:", err);
            })
            .on("end", async () => {
              //const thumbnailBuffer = await getBuffer(song.thumbnail);
              const thumbnailBuffer = await getBuffer(thumbAtlas);

              await Atlas.sendPresenceUpdate("recording", m.from);

              Atlas.sendMessage(
                m.from,
                {
                  audio: fs.readFileSync(outputPath),
                  mimetype: "audio/mpeg",
                  ptt: true,
                  contextInfo: {
                    externalAdReply: {
                      title: song.title.substr(0, 50),
                      body: `Downloaded by: ${botName}`,
                      thumbnail: thumbnailBuffer,
                      mediaType: 1,
                      mediaUrl: thumbAtlas,
                      sourceUrl: song.url,
                    },
                  },
                },
                { quoted: m }
              );

              fs.unlinkSync(inputPath);
              fs.unlinkSync(outputPath);
            })

            .save(outputPath);
        });

        break;

      case "ytmp3":
      case "mp3":
      case "ytaudio":
        if (
          !text ||
          (!text.includes("youtube.com/watch?v=") &&
            !text.includes("youtu.be/"))
        ) {
          await doReact("❌");
          return m.reply(
            `Please provide a valid YouTube Video link to download as audio!\n\nExample: *${prefix}mp3 put_link*`
          );
        }
        await doReact("📥");
        songInfo = await yts(text);
        song = songInfo.videos[0];
        videoUrl = song.url;
        videoId = videoUrl.split("v=")[1];
        thumbAtlas = "https://graph.org/file/d0a287fa875c809f234ce.jpg";

        await Atlas.sendMessage(
          m.from,
          {
            image: { url: song.thumbnail },
            caption: `\nDownloading: *${song.title}*
            
_🕛 Duration:_ *${song.timestamp}*

_🎀 Channel Name:_ *${song.author.name}*

_🏮 Video Uploaded:_ *${song.ago}*\n`,
          },
          { quoted: m }
        );

        YT.mp3(videoId).then((file) => {
          const inputPath = file.path;
          const outputPath = inputPath + ".opus";

          ffmpeg(inputPath)
            .format("opus")
            .on("error", (err) => {
              console.error("Error converting to opus:", err);
            })
            .on("end", async () => {
              const thumbnailBuffer = await getBuffer(thumbAtlas);

              await Atlas.sendPresenceUpdate("recording", m.from);

              Atlas.sendMessage(
                m.from,
                {
                  audio: fs.readFileSync(outputPath),
                  mimetype: "audio/mpeg",
                  ptt: true,
                  contextInfo: {
                    externalAdReply: {
                      title: song.title.substr(0, 50),
                      body: `Downloaded by: ${botName}`,
                      thumbnail: thumbnailBuffer,
                      mediaType: 1,
                      mediaUrl: thumbAtlas,
                      sourceUrl: song.url,
                    },
                  },
                },
                { quoted: m }
              );

              fs.unlinkSync(inputPath);
              fs.unlinkSync(outputPath);
            })

            .save(outputPath);
        });

        break;

      case "ytmp4":
      case "mp4":
      case "ytvideo":
        if (
          !text ||
          (!text.includes("youtube.com/watch?v=") &&
            !text.includes("youtu.be/"))
        ) {
          await doReact("❌");
          return m.reply(
            `Please provide a valid YouTube Video link to download as audio!\n\nExample: *${prefix}mp4 put_link*`
          );
        }
        await doReact("📥");
        songInfo = await yts(text);
        song = songInfo.videos[0];
        videoUrl = song.url;
        videoId = videoUrl.split("v=")[1];
        result = await yts(videoId);

        await Atlas.sendMessage(
          m.from,
          {
            image: { url: song.thumbnail },
            caption: `\nDownloading: *${song.title}*
            
_🕛 Duration:_ *${song.timestamp}*

_🎀 Channel Name:_ *${song.author.name}*

_🏮 Video Uploaded:_ *${song.ago}*\n`,
          },
          { quoted: m }
        );

        const ytaud3 = await YT.mp4(videoUrl);
        Atlas.sendMessage(
          m.from,
          {
            video: { url: ytaud3.videoUrl },
            caption: `${song.title} By: *${botName}*`,
          },
          { quoted: m }
        );

        break;

      case "video":
        if (!text) {
          await doReact("❌");
          return m.reply(
            `Please provide an YouTube video name !\n\nExample: *${prefix}video dandilions*`
          );
        }
        await doReact("📥");

        songInfo = await yts(text);
        song = songInfo.videos[0];
        videoUrl = song.url;
        videoId = videoUrl.split("v=")[1];

        await Atlas.sendMessage(
          m.from,
          {
            image: { url: song.thumbnail },
            caption: `\nDownloading: *${song.title}*
            
_🕛 Duration:_ *${song.timestamp}*

_🎀 Channel Name:_ *${song.author.name}*

_🏮 Video Uploaded:_ *${song.ago}*\n`,
          },
          { quoted: m }
        );

        const ytaud2 = await YT.mp4(videoUrl);
        Atlas.sendMessage(
          m.from,
          {
            video: { url: ytaud2.videoUrl },
            caption: `${song.title} By: *${botName}*`,
          },
          { quoted: m }
        );

        break;

      case "yts":
      case "ytsearch":
        if (!args[0]) {
          await doReact("❌");
          return m.reply(`Please provide a search term!`);
        }
        await doReact("📥");
        let search = await yts(text);
        let thumbnail = search.all[0].thumbnail;
        let num = 1;

        var txt = `*🏮 YouTube Search Engine 🏮*\n\n_🧩 Search Term:_ *${args.join(
          " "
        )}*\n\n*📌 Total Results:* *${search.all.length}*\n`;

        for (let i of search.all) {
          txt += `\n_Result:_ *${num++}*\n_🎀 Title:_ *${
            i.title
          }*\n_🔶 Duration:_ *${i.timestamp}*\n_🔷 Link:_ ${i.url}\n\n`;
        }

        let buttonMessage = {
          image: { url: thumbnail },
          caption: txt,
        };

        Atlas.sendMessage(m.from, buttonMessage, { quoted: m });
        break;

      default:
        break;
    }
  },
};
*/
/*const YT = require("../System/Ytdl-Core.js");
const fs = require("fs");
const yts = require("youtube-yts");
const ffmpeg = require("fluent-ffmpeg");
const {
  fetchJson,
  getBuffer,
  GIFBufferToVideoBuffer,
} = require("../System/Function2.js");

let mergedCommands = [
  "play",
  "song",
  "ytmp3",
  "mp3",
  "ytaudio",
  "yta",
  "ytmp4",
  "mp4",
  "ytvideo",
  "ytv",
  "video",
];

const cooldownMap = new Map(); // Map to track command cooldowns
const cooldownTime = 7 * 60 * 1000; // 7 minutes in milliseconds

module.exports = {
  name: "mediaDownloader",
  alias: [...mergedCommands],
  uniquecommands: ["song", "video", "ytmp3", "ytmp4"],
  description: "All file downloader commands",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix, pushName }) => {
    try {
      const userId = m.sender;
      
      // Check if the user is on cooldown
      if (cooldownMap.has(userId)) {
        const lastTime = cooldownMap.get(userId);
        const timeDiff = Date.now() - lastTime;

        if (timeDiff < cooldownTime) {
          const remainingTime = cooldownTime - timeDiff;
          const remainingMinutes = Math.ceil(remainingTime / (1000 * 60));

          return Atlas.sendMessage(
            m.from,
            {
              text: `Please wait ${remainingMinutes} minutes before using the command again.`,
            },
            { quoted: m }
          );
        }
      }
      
      // Set the user's last command time
      cooldownMap.set(userId, Date.now());

      switch (inputCMD) {
        case "play":
        case "song":
          if (!text) {
            await doReact("❌");
            return m.reply(
              `Please provide a song name!\n\nExample: *${prefix}song despacito*`
            );
          }
          await doReact("📥");
          const thumbAtlas = "https://graph.org/file/d8dafec7f86a15e050fc5.jpg";
          const songInfo = await yts(text);
          const song = songInfo.videos[0];
          const videoUrl = song.url;
          const videoId = videoUrl.split("v=")[1];

          await Atlas.sendMessage(
            m.from,
            {
              image: { url: song.thumbnail },
              caption: `\nDownloading: *${song.title}*
              
_🕛 Duration:_ *${song.timestamp}*

_🎀 Channel Name:_ *${song.author.name}*

_🏮 Video Uploaded:_ *${song.ago}*\n`,
            },
            { quoted: m }
          );

          YT.mp3(videoId)
            .then((file) => {
              const inputPath = file.path;
              const outputPath = inputPath + ".opus";

              ffmpeg(inputPath)
                .format("opus")
                .on("error", (err) => {
                  console.error("Error converting to opus:", err);
                })
                .on("end", async () => {
                  const thumbnailBuffer = await getBuffer(thumbAtlas);

                  await Atlas.sendPresenceUpdate("recording", m.from);

                  Atlas.sendMessage(
                    m.from,
                    {
                      audio: fs.readFileSync(outputPath),
                      mimetype: "audio/mpeg",
                      ptt: true,
                      contextInfo: {
                        externalAdReply: {
                          title: song.title.substr(0, 50),
                          body: `Downloaded by: ${botName}`,
                          thumbnail: thumbnailBuffer,
                          mediaType: 1,
                          mediaUrl: thumbAtlas,
                          sourceUrl: song.url,
                        },
                      },
                    },
                    { quoted: m }
                  );

                  fs.unlinkSync(inputPath);
                  fs.unlinkSync(outputPath);
                })
                .save(outputPath);
            })
            .catch((error) => {
              console.error("Error downloading song:", error);
              doReact("❌");
              m.reply("Failed to download the song. Please try again later.");
            });

          break;
        // Handle other commands...


        case "ytmp3":
        case "mp3":
        case "ytaudio":
          if (
            !text ||
            (!text.includes("youtube.com/watch?v=") &&
              !text.includes("youtu.be/"))
          ) {
            await doReact("❌");
            return m.reply(
              `Please provide a valid YouTube Video link to download as audio!\n\nExample: *${prefix}mp3 put_link*`
            );
          }
          await doReact("📥");
          songInfo = await yts(text);
          song = songInfo.videos[0];
           videoUrl = song.url;
           videoId = videoUrl.split("v=")[1];
           thumbAtlas = "https://graph.org/file/7724b3d78dc16e267a14a.jpg";

          await Atlas.sendMessage(
            m.from,
            {
              image: { url: song.thumbnail },
              caption: `\nDownloading: *${song.title}*
              
_🕛 Duration:_ *${song.timestamp}*

_🎀 Channel Name:_ *${song.author.name}*

_🏮 Video Uploaded:_ *${song.ago}*\n`,
            },
            { quoted: m }
          );

          YT.mp3(videoId)
            .then((file) => {
              const inputPath = file.path;
              const outputPath = inputPath + ".opus";

              ffmpeg(inputPath)
                .format("opus")
                .on("error", (err) => {
                  console.error("Error converting to opus:", err);
                })
                .on("end", async () => {
                  const thumbnailBuffer = await getBuffer(thumbAtlas);

                  await Atlas.sendPresenceUpdate("recording", m.from);

                  Atlas.sendMessage(
                    m.from,
                    {
                      audio: fs.readFileSync(outputPath),
                      mimetype: "audio/mpeg",
                      ptt: true,
                      contextInfo: {
                        externalAdReply: {
                          title: song.title.substr(0, 50),
                          body: `Downloaded by: ${botName}`,
                          thumbnail: thumbnailBuffer,
                          mediaType: 1,
                          mediaUrl: thumbAtlas,
                          sourceUrl: song.url,
                        },
                      },
                    },
                    { quoted: m }
                  );

                  fs.unlinkSync(inputPath);
                  fs.unlinkSync(outputPath);
                })
                .save(outputPath);
            })
            .catch((error) => {
              console.error("Error downloading audio:", error);
              doReact("❌");
              m.reply("Failed to download the audio. Please try again later.");
            });

          break;

        case "ytmp4":
        case "mp4":
        case "ytvideo":
          if (
            !text ||
            (!text.includes("youtube.com/watch?v=") &&
              !text.includes("youtu.be/"))
          ) {
            await doReact("❌");
            return m.reply(
              `Please provide a valid YouTube Video link to download as audio!\n\nExample: *${prefix}mp4 put_link*`
            );
          }
          await doReact("📥");
           songInfo = await yts(text);
          song = songInfo.videos[0];
           videoUrl = song.url;
           videoId = videoUrl.split("v=")[1];
           result = await yts(videoId);

          await Atlas.sendMessage(
            m.from,
            {
              image: { url: song.thumbnail },
              caption: `\nDownloading: *${song.title}*
              
_🕛 Duration:_ *${song.timestamp}*

_🎀 Channel Name:_ *${song.author.name}*

_🏮 Video Uploaded:_ *${song.ago}*\n`,
            },
            { quoted: m }
          );

          const ytaud3 = await YT.mp4(videoUrl);
          Atlas.sendMessage(
            m.from,
            {
              video: { url: ytaud3.videoUrl },
              caption: `${song.title} By: *${botName}*`,
            },
            { quoted: m }
          );

          break;

        case "video":
          if (!text) {
            await doReact("❌");
            return m.reply(
              `Please provide an YouTube video name !\n\nExample: *${prefix}video dandilions*`
            );
          }
          await doReact("📥");

           songInfo = await yts(text);
           song = songInfo.videos[0];
           videoUrl = song.url;
           videoId = videoUrl.split("v=")[1];

          await Atlas.sendMessage(
            m.from,
            {
              image: { url: song.thumbnail },
              caption: `\nDownloading: *${song.title}*
              
_🕛 Duration:_ *${song.timestamp}*

_🎀 Channel Name:_ *${song.author.name}*

_🏮 Video Uploaded:_ *${song.ago}*\n`,
            },
            { quoted: m }
          );

          const ytaud2 = await YT.mp4(videoUrl);
          Atlas.sendMessage(
            m.from,
            {
              video: { url: ytaud2.videoUrl },
              caption: `${song.title} By: *${botName}*`,
            },
            { quoted: m }
          );

          break;

        case "yts":
        case "ytsearch":
          if (!args[0]) {
            await doReact("❌");
            return m.reply(`Please provide a search term!`);
          }
          await doReact("📥");
          search = await yts(text);
           thumbnail = search.all[0].thumbnail;
          let num = 1;

          let txt = `*🏮 YouTube Search Engine 🏮*\n\n_🧩 Search Term:_ *${args.join(
            " "
          )}*\n\n*📌 Total Results:* *${search.all.length}*\n`;

          for (let i of search.all) {
            txt += `\n_Result:_ *${num++}*\n_🎀 Title:_ *${
              i.title
            }*\n_🔶 Duration:_ *${i.timestamp}*\n_🔷 Link:_ ${i.url}\n\n`;
          }

          let buttonMessage = {
            image: { url: thumbnail },
            caption: txt,
          };

          Atlas.sendMessage(m.from, buttonMessage, { quoted: m });
          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Error in mediaDownloader module:", error);
      doReact("❌");
      m.reply("An error occurred while processing your request.");
    }
  },
};
*/

 
const YT = require("../System/Ytdl-Core.js");
const fs = require("fs");
const yts = require("youtube-yts");
const ffmpeg = require("fluent-ffmpeg");
const {
  fetchJson,
  getBuffer,
  GIFBufferToVideoBuffer,
} = require("../System/Function2.js");

let mergedCommands = [
  "play",
  "song",
  "ytmp3",
  "mp3",
  "ytaudio",
  "yta",
  "ytmp4",
  "mp4",
  "ytvideo",
  "ytv",
  "video",
];

// Updated user usage limit and cooldown duration
const maxUsageCount = 7;
const cooldownDuration = 15 * 60 * 1000; // 15 minutes in milliseconds
const userUsageCount = new Map();
const userCooldowns = new Map();
 
module.exports = {
  name: "mediaDownloader",
  alias: [...mergedCommands],
  uniquecommands: ["song", "video", "ytmp3", "ytmp4"],
  description: "All file dowloader commands",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix, pushName, args }) => {
    try {

        const userId = m.sender; // Get the user's ID

      // Check user's usage count and cooldown status
      if (userUsageCount.get(userId) >= maxUsageCount) {
        const lastUsageTimestamp = userCooldowns.get(userId);
        const currentTime = Date.now();
        const remainingCooldown = lastUsageTimestamp + cooldownDuration - currentTime;

        if (remainingCooldown > 0) {
          await doReact("❌");
          const remainingMinutes = Math.ceil(remainingCooldown / (60 * 1000));
          return m.reply(`Your on coolDown.... wait ${remainingMinutes} minutes before using this command again.`);
        }

        userUsageCount.set(userId, 0); // Reset usage count after cooldown
        userCooldowns.set(userId, Date.now()); // Set new cooldown timestamp
      }

      // Increment user's usage count
      userUsageCount.set(userId, (userUsageCount.get(userId) || 0) + 1);
      
      switch (inputCMD) {
        case "play":
        case "song":
          if (!text) {
            await doReact("❌");
            return m.reply(
              ` provide a song name !\n\nExample: *${prefix}song despacito*`
            );
          }

 
          function convertDurationToSeconds(duration) {
  const [minutes, seconds] = duration.split(":").map(Number);
  return minutes * 60 + seconds;
}


          await doReact("📥");
          thumbAtlas = "https://graph.org/file/d0a287fa875c809f234ce.jpg";
          songInfo = await yts(text);
          song = songInfo.videos[0];
          videoUrl = song.url;
          videoId = videoUrl.split("v=")[1];

          
const songDurationInSeconds = convertDurationToSeconds(song.timestamp);

if (songDurationInSeconds > 300) {
  await doReact("❌");
  return m.reply(`Only less than  10 minutes songs are allowed. BAKA!! `);
}
     

          await Atlas.sendMessage(
            m.from,
            {
              image: { url: song.thumbnail },
              caption: `\nDownloading: *${song.title}*\n\n_🕛 Duration:_ *${song.timestamp}*\n\n_🎀 Channel Name:_ *${song.author.name}*\n\n_🏮 Video Uploaded:_ *${song.ago}*\n`,
            },
            { quoted: m }
          );

          YT.mp3(videoId).then((file) => {
            const inputPath = file.path;
            const outputPath = inputPath + ".opus";

            ffmpeg(inputPath)
              .format("opus")
              .on("error", (err) => {
                console.error("Error converting to opus:", err);
              })
              .on("end", async () => {
                //const thumbnailBuffer = await getBuffer(song.thumbnail);
                const thumbnailBuffer = await getBuffer(thumbAtlas);

                await Atlas.sendPresenceUpdate("recording", m.from);

                Atlas.sendMessage(
                  m.from,
                  {
                    audio: fs.readFileSync(outputPath),
                    mimetype: "audio/mpeg",
                    ptt: true,
                    //  contextInfo: {
                    //   externalAdReply: {
                    //     title: song.title.substr(0, 50),
                    //     body: `Downloaded by: ${botName}`,
                    //     thumbnail: thumbnailBuffer,
                    //     mediaType: 1,
                    //     mediaUrl: thumbAtlas,
                    //     sourceUrl: song.url,
                    //   },
                    // }, 
                  },
                  { quoted: m }
                );

                fs.unlinkSync(inputPath);
                fs.unlinkSync(outputPath);
              })

              .save(outputPath);
          });

          break;

       
        case "mp3":
        case "ytaudio":
          if (
            !text ||
            (!text.includes("youtube.com/watch?v=") &&
              !text.includes("youtu.be/"))
          ) {
            await doReact("❌");
            return m.reply(
              `Please provide a valid YouTube Video link to download as audio!\n\nExample: *${prefix}mp3 put_link*`
            );
          }
          await doReact("📥");
          songInfo = await yts(text);
          song = songInfo.videos[0];
          videoUrl = song.url;
          videoId = videoUrl.split("v=")[1];
          thumbAtlas = "https://graph.org/file/d0a287fa875c809f234ce.jpg";

    const songDurationInSeconds1 = convertDurationToSeconds(song.timestamp);

    if (songDurationInSeconds1 > 600) {
      await doReact("❌");
      return m.reply(`Only less than  10 minutes songs are allowed. BAKA!!.`);
    }
          await Atlas.sendMessage(
            m.from,
            {
              image: { url: song.thumbnail },
              caption: `\nDownloading: *${song.title}*\n\n_🕛 Duration:_ *${song.timestamp}*\n\n_🎀 Channel Name:_ *${song.author.name}*\n\n_🏮 Video Uploaded:_ *${song.ago}*\n`,
            },
            { quoted: m }
          );

          YT.mp3(videoId).then((file) => {
            const inputPath = file.path;
            const outputPath = inputPath + ".opus";

            ffmpeg(inputPath)
              .format("opus")
              .on("error", (err) => {
                console.error("Error converting to opus:", err);
              })
              .on("end", async () => {
                const thumbnailBuffer = await getBuffer(thumbAtlas);

                //await Atlas.sendPresenceUpdate("recording", m.from);

                Atlas.sendMessage(
                  m.from,
                  {
                    audio: fs.readFileSync(outputPath),
                    mimetype: "audio/mpeg",
                    ptt: true,
                    contextInfo: {
                      externalAdReply: {
                        title: song.title.substr(0, 50),
                        body: `Downloaded by: ${botName}`,
                        thumbnail: thumbnailBuffer,
                        mediaType: 1,
                        mediaUrl: thumbAtlas,
                        sourceUrl: song.url,
                      },
                    },
                  },
                  { quoted: m }
                );

                fs.unlinkSync(inputPath);
                fs.unlinkSync(outputPath);
              })

              .save(outputPath);
          });

          break;

        case "ytmp4":
        case "mp4":
        case "ytvideo":
  if (
    !text ||
    (!text.includes("youtube.com/watch?v=") &&
      !text.includes("youtu.be/"))
  ) {
    await doReact("❌");
    return m.reply(
      `Please provide a valid YouTube Video link to download as audio!\n\nExample: *${prefix}mp4 put_link*`
    );
  }
  await doReact("📥");
  songInfo = await yts(text);
  song = songInfo.videos[0];
  videoUrl = song.url;
  videoId = videoUrl.split("v=")[1];
  result = await yts(videoId);

  // Calculate the song duration in seconds before checking if it's less than 10 minutes.
  const viDurationInSeconds = convertDurationToSeconds(song.timestamp);

  if (viDurationInSeconds > 600) {
    await doReact("❌");
    return m.reply(`Only less than 10 minutes videos are allowed. BAKA!!`);
  }

  await Atlas.sendMessage(
    m.from,
    {
      image: { url: song.thumbnail },
      caption: `\nDownloading: *${song.title}*\n\n_🕛 Duration:_ *${song.timestamp}*\n\n_🎀 Channel Name:_ *${song.author.name}*\n\n_🏮 Video Uploaded:_ *${song.ago}*\n`,
    },
    { quoted: m }
  );

  const ytaud3 = await YT.mp4(videoUrl);
  Atlas.sendMessage(
    m.from,
    {
      video: { url: ytaud3.videoUrl },
      caption: `${song.title} By: *${botName}*`,
    },
    { quoted: m }
  );

  break;


        case "video":
          if (!text) {
            await doReact("❌");
            return m.reply(
              `Please provide an YouTube video name !\n\nExample: *${prefix}video dandilions*`
            );
          }
          await doReact("📥");

          songInfo = await yts(text);
          song = songInfo.videos[0];
          videoUrl = song.url;
          videoId = videoUrl.split("v=")[1];

          await Atlas.sendMessage(
            m.from,
            {
              image: { url: song.thumbnail },
              caption: `\nDownloading: *${song.title}*\n\n_🕛 Duration:_ *${song.timestamp}*\n\n_🎀 Channel Name:_ *${song.author.name}*\n\n_🏮 Video Uploaded:_ *${song.ago}*\n`,
            },
            { quoted: m }
          );

          const ytaud2 = await YT.mp4(videoUrl);
          Atlas.sendMessage(
            m.from,
            {
              video: { url: ytaud2.videoUrl },
              caption: `${song.title} By: *${botName}*`,
            },
            { quoted: m }
          );

          break;

        case "yts":
        case "ytsearch":
          if (!args[0]) {
            await doReact("❌");
            return m.reply(`Please provide a search term!`);
          }
          await doReact("📥");
          let search = await yts(text);
          let thumbnail = search.all[0].thumbnail;
          let num = 1;

          var txt = `*🏮 YouTube Search Engine 🏮*\n\n_🧩 Search Term:_ *${args.join(
            " "
          )}*\n\n*📌 Total Results:* *${search.all.length}*\n`;

          for (let i of search.all) {
            txt += `\n_Result:_ *${num++}*\n_🎀 Title:_ *${i.title}*\n_🔶 Duration:_ *${i.timestamp}*\n_🔷 Link:_ ${i.url}\n\n`;
          }

          let buttonMessage = {
            image: { url: thumbnail },
            caption: txt,
          };

          Atlas.sendMessage(m.from, buttonMessage, { quoted: m });
        
          
          break;        
  
    
        default:
          break;
      }
    } catch (error) {
      console.error("Error executing mediaDownloader:", error);
      await doReact("❌");
      return m.reply("An error occurred while executing the command.");
    }
  },
};
