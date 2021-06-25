const { Collection } = require("discord.js");

const activeCommands = new Collection();
const activeCmds = require("../models/active-commands");

function loadActiveCommands(client) {
  client.guilds.cache.forEach((guild) => {
    activeCmds.find({ Guild: guild.id }, async (err, data) => {
      let arr = [];
      data.forEach((x) => {
        arr.push(x.Command);
      });
      activeCommands.set(guild.id, arr);
    });
  });
}

module.exports.activeCommands = activeCommands;
module.exports.loadActiveCommands = loadActiveCommands;
