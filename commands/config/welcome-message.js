const { MessageEmbed } = require("discord.js");
const createEmbed = require("../../functions/createEmbed");
let welcomeModel = require("../../models/welcome-message");

module.exports = {
  name: "welcome-message",
  permissions: ["MANAGE_GUILD"],
  category: "config",
  aliases: ["welc-message", "welcome-msg", "welc-msg"],
  usage: "<channel> <message>",
  description: "Create a message for when a member joins the server",
  run(client, message, args) {
    let channel = message.mentions.channels.first();
    if (!channel)
      return message.channel.send(
        createEmbed("fail", "No channel was mentioned")
      );
    let msg = args.slice(1).join(" ");
    if (!msg)
      return message.channel.send(createEmbed("fail", "No message was given"));
    if (msg === "default") msg = "Welcome to the server {member}";
    welcomeModel
      .findOneAndUpdate(
        { Guild: message.guild.id },
        { Guild: message.guild.id, Channel: channel.id, Message: msg },
        { upsert: true }
      )
      .exec();

    message.channel.send(
      createEmbed("success", `Welcome channel has been set`)
    );
  },
};
