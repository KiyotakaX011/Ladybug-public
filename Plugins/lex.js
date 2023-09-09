const axios = require("axios");

const activePokemonGames = {};

module.exports = {
  name: "pokemon-game",
  alias: ["ask", "answer"],
  uniquecommands: ["ask", "answer"],
  description: "Guess the Pokémon name game",
  start: async (Atlas, m, { inputCMD, text, doReact }) => {
    const groupId = m.from;

    switch (inputCMD) {
      case "ask":
        try {
          await doReact("🕵️");

          const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100");
          const pokemonList = response.data.results.map((pokemon) => pokemon.name);
          const randomIndex = Math.floor(Math.random() * pokemonList.length);
          const randomPokemonName = pokemonList[randomIndex];

          const questionText = `Guess the Pokémon name:\nType "${randomPokemonName}" to answer.`;
          Atlas.sendMessage(groupId, { text: questionText }, { quoted: m });

          activePokemonGames[groupId] = {
            pokemonName: randomPokemonName,
          };
        } catch (error) {
          console.error("Error starting Pokémon game:", error);
        }
        break;

      case "answer":
        try {
          await doReact("⌚");

          const userGuess = text.toLowerCase();
          const activeGame = activePokemonGames[groupId];

          if (!activeGame) {
            Atlas.sendMessage(groupId, "No active game. Use the 'ask' command to start a new game.", {});
            return;
          }

          if (userGuess === activeGame.pokemonName) {
            Atlas.sendMessage(groupId, "Correct! You guessed the Pokémon name!", {});
          } else {
            Atlas.sendMessage(groupId, "Incorrect. Try again!", {});
          }

          delete activePokemonGames[groupId];
        } catch (error) {
          console.error("Error processing answer:", error);
        }
        break;

      default:
        break;
    }
  },
};
