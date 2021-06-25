const { MessageEmbed } = require("discord.js");
const createEmbed = require("../../functions/createEmbed");
let goodbyeModel = require("../../models/goodbye-message");

module.exports = {
  name: "goodbye-message",
  permissions: ["MANAGE_GUILD"],
  category: "config",
  usage: "<channel> <message>",
  cooldown: 5,
  description: "Create a message for when a user leaved the server",
  run(client, message, args) {
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        createEmbed("fail", "No channel was mentioned")
      );
    let msg = args.slice(1).join(" ");
    if (!msg)
      return message.channel.send(createEmbed("fail", "No message was given"));
    if (msg === "default") msg = "{member.tag} has left the server";
    goodbyeModel
      .findOneAndUpdate(
        { Guild: message.guild.id },
        { Guild: message.guild.id, Channel: channel.id, Message: msg },
        { upsert: true }
      )
      .exec();

    message.channel.send(
      createEmbed("success", "Goodbye channel has been set")
    );
  },
};
