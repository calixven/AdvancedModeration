const createEmbed = require("../../functions/createEmbed");
const muterole = require("../../models/muterole");

module.exports = {
  name: "setmuterole",
  category: "config",
  description: "Set the mute role for the server",
  usage: "<role>",
  aliases: ["set-mute-role", "setmrole"],
  permissions: ["MANAGE_GUILD"],
  run: (client, message, args) => {
    let role = message.mentions.roles.first();
    if (!role)
      return message.channel.send(createEmbed("fail", "No role was mentioned"));
    message.channel.send(createEmbed("success", "Set the new mute role"));

    muterole
      .findOneAndUpdate(
        { Guild: message.guild.id },
        { Role: role.id },
        { upsert: true }
      )
      .exec();
  },
};
