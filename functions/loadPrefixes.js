const prefixModel = require("../models/prefix");
let guildPrefixes = {};

module.exports = {
  loadPrefixes: (client) => {
    client.guilds.cache.forEach(async (guild) => {
      let prefixToReturn = require("../botconfig/config.json").prefix;
      const data = await prefixModel.findOne({ Guild: guild.id });
      if (data) {
        prefixToReturn = data.Prefix;
        guildPrefixes[guild.id] = prefixToReturn;
      } else {
        guildPrefixes[guild.id] = prefixToReturn;
      }
    });
  },
  guildPrefixes,
};
