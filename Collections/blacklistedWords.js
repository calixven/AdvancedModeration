const { Collection } = require("discord.js");
const blacklistWord = require("../models/blacklist-word");

const blacklisted = new Collection();

function loadBlacklists(client) {
  client.guilds.cache.forEach((guild) => {
    blacklistWord.findOne({ Guild: guild.id }, async (err, data) => {
      if (!data) return;
      blacklisted.set(guild.id, data.Words);
    });
  });
}

module.exports.loadBlacklists = loadBlacklists;
module.exports.blacklistedWords = blacklisted;
