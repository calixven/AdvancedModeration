const createEmbed = require("../../functions/createEmbed");
const joinMessage = require("../../models/join-message");

module.exports = {
  name: "join-message",
  permissions: ["MANAGE_GUILD"],
  category: "config",
  usgae: "<message>",
  description: "Create a message that users get dmed when they join",
  cooldown: 5,
  run: (client, message, args) => {
    let func = args[0];
    if (!func)
      return message.channel.send(
        createEmbed("fail", "No operation was given")
      );
    if (func === "disable") {
      joinMessage
        .deleteOne({ Guild: message.guild.id })
        .exec()
        .then(() => {
          message.channel.send(
            createEmbed("success", "Join message has been disabled")
          );
        });
    }
    if (func === "enable") {
      let msg = args.slice(1).join(" ");
      if (!msg)
        return message.channel.send(
          createEmbed("fail", "No message was given")
        );
      joinMessage
        .findOneAndUpdate(
          { Guild: message.guild.id },
          { Guild: message.guild.id, Message: msg },
          { upsert: true }
        )
        .exec()
        .then(() => {
          message.channel.send(createEmbed("success", "Enabled join message"));
        });
    }
  },
};
