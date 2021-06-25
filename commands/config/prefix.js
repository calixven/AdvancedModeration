const prefixSchema = require("../../models/prefix");
const mongoose = require("mongoose");
const { MessageEmbed } = require("discord.js");
const createEmbed = require("../../functions/createEmbed");

module.exports = {
  permissions: ["MANAGE_GUILD"],
  name: "prefix",
  cooldown: 5,
  description: "Change the prefix for the server",
  usage: "[prefix]",
  category: "config",
  run: async (client, message, args) => {
    let newPrefix = args.join(" ");
    if (!newPrefix)
      return message.channel.send(
        createEmbed("fail", "No new prefix was given")
      );
    message.channel.send(createEmbed("success", "Prefix has been set"));
    if (newPrefix === "reset" || newPrefix === "default") {
      prefixSchema.deleteOne({ Guild: message.guild.id }).exec();
    } else {
      prefixSchema
        .findOneAndUpdate(
          { Guild: message.guild.id },
          { Guild: message.guild.id, Prefix: newPrefix },
          { upsert: true }
        )
        .exec();
    }
  },
};
