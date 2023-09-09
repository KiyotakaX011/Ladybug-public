const axios = require("axios");
const anime = require("z-anime");

module.exports = {
  name: "animeinfo",
  alias: [
    "anime",
    "s-anime",
    "i-anime",
    "a-trending",
    "trending-a",
    "a-latest",
    "mediafire",
  ],
  uniquecommands: ["s-anime", "i-anime", "a-trending", "trending-a", "a-latest", "anime"],
  description: "All file downloader commands",
  start: async (Atlas, m, { inputCMD, text, doReact, prefix, pushName, botName }) => {
    try {
      switch (inputCMD) {
        case "anime":
          await doReact("📃");

          const cmds = [
            "🔎 *s-anime* -- Search for any anime on the site",
            "ℹ️ *i-anime* -- Get information about an anime",
            "🔥 *a-trending* -- Get the top 10 trending animes",
            "📈 *trending-a* -- {alias} ",
            "🆕 *a-latest* -- Get the latest animes on sanji.to",
          ];

          await Atlas.sendMessage(m.from, {
            text: cmds.join("\n"),
          });

          break;
        case "s-anime":
          await doReact("👀");
          if (!text) {
            return m.reply("Please provide a search term.");
          }

          const results = await anime.search(text);
          const limitedResults = results.slice(0, 5); // Limit the results to the first 5 items

          const formattedResults = limitedResults.map((result, index) => {
            const { title, jname, image, url, age, sub, dub, totalepisodes } = result;
            return `🔎 Result ${index + 1}:
🌟 Title: ${title}
🈸 Japanese Name: ${jname}
🔞 Age Rating: ${age}
📺 Subbed: ${sub}
📢 Dubbed: ${dub}
🎬 Total Episodes: ${totalepisodes}
🌐 More Info: ${url}`;
          });

          const response = `🔍 Search Results for "${text}":\n\n${formattedResults.join("\n\n")}`;

          // Append your signature at the bottom of the response
          const signature = "\n\n☈A-ONE"; // Replace "☈A-ONE" with your desired signature
          const finalResponse = response + signature;

          Atlas.sendMessage(
            m.from,
            {
              image: { url: limitedResults[0].image }, // Send the image of the first search result
              caption: finalResponse,
            },
            { quoted: m }
          );

          break;
        case "i-anime":
          await doReact("🧣");

          if (!text) {
            return m.reply("Please provide a search term.");
          }

          try {
            const anime_details = await anime.details(text);

            const result =
              `🔎 *Anime Information* 🎉\n\n` +
              `😃 *Title:* ${anime_details.title}\n` +
              `🔤 *Japanese Title:* ${anime_details.jtitle}\n` +
              `👥 *Group:* ${anime_details.tmag}\n` +
              `🔖 *Genres:* ${anime_details.generes}\n` +
              `🔢 *Producers:* ${anime_details.producers}\n` +
              `🌟 *Rating:* ${anime_details.rating}\n` +
              `🌈 *Status:* ${anime_details.status}\n` +
              `🔠 *Duration:* ${anime_details.duration}\n` +
              `📝 *Premiered:* ${anime_details.premiered}\n` +
              `📅 *Aired:* ${anime_details.aired}\n` +
              `📚 *Synonyms:* ${anime_details.synonyms}\n` +
              `🇯🇵 *Japanese Name:* ${anime_details.jname}\n` +
              `🔗 *URL:* ${anime_details.url}\n` +
              `📝 *Description:* ${anime_details.Description}\n` +
              `📚 *Parts:* ${anime_details.parts}\n` +
              `📚 *Parts List:*`;

            let partsList = "";
            for (const part of anime_details.partsList) {
              partsList += `\n\n*Name:* ${part.name}\n` + `*Image:* ${part.image}\n` + `*URL:* ${part.url}\n`;
            }

            // Append your signature at the bottom of the response
            const signature = "\n\n☈A-ONE"; // Replace "☈A-ONE" with your desired signature
            const finalResult = result + partsList + signature;

            Atlas.sendMessage(
              m.from,
              {
                image: { url: anime_details.tmage },
                caption: finalResult,
              },
              { quoted: m }
            );
          } catch (error) {
            console.error(error);
            await Atlas.sendMessage(
              m.from,
              {
                caption: "An error occurred while fetching anime details.",
              },
              { quoted: m }
            );
          }

          break;
        case "a-trending":
        case "trending-a":
          await doReact("🔥");

          try {
            const trending = await anime.trending();
            const trending1 = trending.slice(0, 10);

            const formattedResults = trending1.map((result, index) => {
              const { title, image, url } = result;
              return `
*Index*: ${index + 1}
*Title*: ${title}
*Image*: ${image}
*URL*: ${url}`;
            });

            const response = `🔥 Trending Anime:\n\n${formattedResults.join("\n\n")}`;

            // Append your signature at the bottom of the response
            const signature = "\n\n☈A-ONE"; // Replace "☈A-ONE" with your desired signature
            const finalResponse = response + signature;

            Atlas.sendMessage(
              m.from,
              {
                image: { url: trending1[0].image },
                caption: finalResponse,
              },
              { quoted: m }
            );
          } catch (error) {
            console.error(error);
            await Atlas.sendMessage(
              m.from,
              {
                caption: "An error occurred while fetching trending anime.",
              },
              { quoted: m }
            );
          }

          break;

        case "a-latest":
          try {
            const results = await anime.latest();
            const limitedResults = results.slice(0, 15); // Limit the results to the first 15 items

            const formattedResults = limitedResults.map((result, index) => {
              const { title, jname, image, url, age, sub, dub, totalepisodes } = result;
              return `🔎 Result ${index + 1}:
🌟 Title: ${title}
🈸 Japanese Name: ${jname}
🔞 Age Rating: ${age}
📺 Subbed: ${sub}
📢 Dubbed: ${dub}
🎬 Total Episodes: ${totalepisodes}
🌐 More Info: ${url}`;
            });

            const response = `🔍 Search Results for "Latest Anime":\n\n${formattedResults.join("\n\n")}`;

            // Append your signature at the bottom of the response
            const signature = "\n\n☈A-ONE"; // Replace "☈A-ONE" with your desired signature
            const finalResponse = response + signature;

            Atlas.sendMessage(
              m.from,
              {
                image: { url: limitedResults[0].image }, // Send the image of the first search result
                caption: finalResponse,
              },
              { quoted: m }
            );
          } catch (error) {
            console.error("Error fetching latest anime:", error);
            await Atlas.sendMessage(
              m.from,
              "An error occurred while fetching the latest anime. Please try again later.",
              { quoted: m }
            );
          }

          break;

        default:
          // Handle other commands if needed
          break;
      }
    } catch (error) {
      console.error(error);
      await Atlas.sendMessage(
        m.from,
        {
          caption: "An error occurred during execution.",
        },
        { quoted: m }
      );
    }
  },
};
