const { AnimeWallpaper } = require("anime-wallpaper");

const wall = new AnimeWallpaper();

module.exports = {
  name: "wallpaper",
  alias: ["animewallpaper"],
  usage: `${prefa}wallpaper <query>`,
  desc: "Gives you the wallpaper...",
  start: async (Atlas, m, { command, prefix, text, args, doReact }) => {
    await doReact("⚡️");

    const im = args.join(" ").split("#");
    const noi = Number(im[1]) || 1;

    if (!im[0]) return m.reply("No wallpaper found...");

    try {
      let wallpapers;

      try {
        // Attempt to get wallpapers using AnimeWall5 API
        wallpapers = await wall.getAnimeWall5(im[0]);

        if (!wallpapers || wallpapers.length === 0) {
          throw new Error("No wallpaper found...");
        }
      } catch (error) {
        // If AnimeWall5 API fails, try AnimeWall3 API
        try {
          wallpapers = await wall.getAnimeWall3(im[0]);

          if (!wallpapers || wallpapers.length === 0) {
            throw new Error("No wallpaper found...");
          }
        } catch (error) {
          // If both APIs fail, handle the error and inform the user
          throw new Error("No wallpaper found...");
        }
      }

      if (!wallpapers || wallpapers.length === 0) {
        throw new Error("No wallpaper found...");
      }

      for (let i = 0; i < Math.min(wallpapers.length, noi); i++) {
        const randomIndex = Math.floor(Math.random() * wallpapers.length);

        Atlas.sendMessage(
          m.from,
          {
            image: {
              url: wallpapers[randomIndex].image,
            },
            caption: `*Search term:* ${im[0]} \nBy ${botName}`,
          },
          {
            quoted: m,
          }
        );
      }
    } catch (error) {
      // Handle the error and inform the user
      return m.reply("Error occurred while fetching wallpapers.");
    }
  },
};
