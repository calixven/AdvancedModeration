const createEmbed = require("../../functions/createEmbed");
const warn = require("../../models/warn");

module.exports = {
  name: "delete-warn",
  category: "moderation",
  permissions: ["MANAGE_GUILD"],
  usage: "<user> [amount]",
  description: "Delete a warning from a member",
  run: (client, message, args) => {
    let user = message.mentions.users.last();
    if (!user)
      return message.channel.send(createEmbed("fail", "No user was mentioned"));
    if (user.id === client.user.id)
      return message.channel.send(createEmbed("fail", "No user was mentioned"));
    let amount = args[1] ? Number(args[1]) : 1;

    warn.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (!data)
          return message.channel.send(
            createEmbed("fail", "The user has no warnings")
          );
        if (amount > data.Amount)
          return message.channel.send(
            createEmbed("fail", `The user doesn't have ${amount} warnings`)
          );
        warn
          .findOneAndUpdate(
            {
              Guild: message.guild.id,
              User: user.id,
            },
            {
              Amount: data.Amount - amount,
            },
            { upsert: true }
          )
          .exec()
          .then(() => {
            message.channel.send(createEmbed("success", "Deleted warning"));
          });
      }
    );
  },
};
