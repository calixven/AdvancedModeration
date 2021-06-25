const { MessageEmbed } = require("discord.js");
const createEmbed = require("../../functions/createEmbed");
const modlogs = require("../../models/modlogs");

module.exports = {
  name: "modlogs",
  permissions: ["MANAGE_GUILD"],
  category: "config",
  description: "Set the logs channel",

  run: (client, message, args) => {
    let channel = message.mentions.channels.first();
    if (!channel) return message.channel.send("No channel was mentioned");
    modlogs
      .findOneAndUpdate(
        { Guild: message.guild.id },
        { Guild: message.guild.id, Channel: channel.id },
        { upsert: true }
      )
      .exec();
    message.channel.send(createEmbed("success", "Set modlogs channel"));
  },
};
