// Require dependencies and custom modules (if any)
const TicTacToe = require('../System/tictactoe');
const { parseMention } = require('../System/Function2.js');

// Create an object to store Tic Tac Toe game rooms
let game = {};

module.exports = {
  name: "ttt",
  alias: ["ttt"],
  desc: "Play Tic Tac Toe game.",
  category: "General",

  start: async (Atlas, m, { text }) => {
    try {
      // Check if game exists and initialize it if it doesn't
      game = game ? game : {};

      // Check if there is an ongoing game involving the player
      if (Object.values(game).find((room) =>
        room.id.startsWith("tictactoe") &&
        [room.game.playerX, room.game.playerO].includes(m.sender) &&
        room.state === "PLAYING"
      )) {
        return Atlas.sendMessage(m.from, { text: "_A game is already in progress_" }, { quoted: m });
      }

      // Find an available game room or create a new one
      let room = Object.values(game).find((room) =>
        room.state === "WAITING" && (text ? room.name === text : true)
      );

      if (room) {
        // Existing game room found
        room.o = m.chat;
        room.game.playerO = m.sender || m.mentionedJid[0];
        room.state = "PLAYING";

        let arr = room.game.render().map((v) => {
          return {
            X: "❌",
            O: "⭕",
            1: "1️⃣",
            2: "2️⃣",
            3: "3️⃣",
            4: "4️⃣",
            5: "5️⃣",
            6: "6️⃣",
            7: "7️⃣",
            8: "8️⃣",
            9: "9️⃣",
          }[v];
        });

        let str = `
Current turn: @${room.game.currentTurn.split("@")[0]}
Room ID: ${room.id}
${arr.slice(0, 3).join("")}
${arr.slice(3, 6).join("")}
${arr.slice(6).join("")}
`;

        return await Atlas.sendMessage(m.from, { text: str, mentions: [room.game.currentTurn] }, { quoted: m });
      } else {
        // Create a new game room
        room = {
          id: "tictactoe-" + +new Date(),
          x: Atlas.chat,
          o: "",
          game: new TicTacToe(m.sender, "o"),
          state: "WAITING",
        };
        if (text) room.name = text;
        m.reply("_Waiting for a player to join the game. Use .ttt to join._");
        game[room.id] = room;
      }
    } catch (error) {
      // Handle errors
      console.error("Error in ttt command:", error.message);
      Atlas.sendMessage(m.from, { text: "An error occurred while processing the ttt command." }, { quoted: m });
    }
  },

  onText: async (Atlas, m) => {
    try {
      // Check if game exists and initialize it if it doesn't
      game = game ? game : {};

      let room = Object.values(game).find((room) =>
        room.id &&
        room.game &&
        room.state &&
        room.id.startsWith("tictactoe") &&
        [room.game.playerX, room.game.playerO].includes(m.sender) &&
        room.state === "PLAYING"
      );

      if (room) {
        let isWin = false;
        let isTie = false;
        let isSurrender = false;

        if (!/^([1-9]|(me)?give\s?up|surr?ender|off|skip)$/i.test(m.text)) {
          return;
        }

        isSurrender = !/^[1-9]$/.test(m.text);

        if (m.sender !== room.game.currentTurn) {
          if (!isSurrender) {
            return false;
          }
        }

        let ok;
        if (!isSurrender) {
          ok = room.game.turn(m.sender === room.game.playerO, parseInt(m.text) - 1);
          if (ok <= 0) {
            await Atlas.sendMessage(m.from, { text: {
              "-3": "_The game is over._",
              "-2": "_Invalid position._",
              "-1": "_Invalid position._",
              0: "_Invalid position._",
            }[ok] }, { quoted: m });
            return false;
          }
        }

        if (m.sender === room.game.winner) {
          isWin = true;
        } else if (room.game.board === 511) {
          isTie = true;
        }

        let arr = room.game.render().map((v) => {
          return {
            X: "❌",
            O: "⭕",
            1: "1️⃣",
            2: "2️⃣",
            3: "3️⃣",
            4: "4️⃣",
            5: "5️⃣",
            6: "6️⃣",
            7: "7️⃣",
            8: "8️⃣",
            9: "9️⃣",
          }[v];
        });

        if (isSurrender) {
          room.game._currentTurn = m.sender === room.game.playerX;
          isWin = true;
        }

        let winner = isSurrender ? room.game.currentTurn : room.game.winner;

        let str = `Room ID: ${room.id}

${arr.slice(0, 3).join("")}
${arr.slice(3, 6).join("")}
${arr.slice(6).join("")}
${
  isWin
    ? `@${winner.split("@")[0]} Win!`
    : isTie
    ? "Game over"
    : `Turn ${["❌", "⭕"][1 * room.game._currentTurn]} (@${room.game.currentTurn.split("@")[0]})`
}
❌: @${room.game.playerX.split("@")[0]}
⭕: @${room.game.playerO.split("@")[0]}

Type *give up* to surrender and admit defeat`;

        if ((room.game._currentTurn ^ isSurrender ? room.x : room.o) !== m.chat) {
          room[room.game._currentTurn ^ isSurrender ? "x" : "o"] = m.chat;
        }

        if (room.x !== room.o) {
          await Atlas.sendMessage({ text: room.x, str }, { mentions: parseMention(str) }, m);
        }

        await Atlas.sendMessage({ text: room.o, str }, { mentions: parseMention(str) }, m);

        if (isTie || isWin) {
          delete game[room.id];
        }
      }
    } catch (err) {
      console.error(err);
    }
  },
};
