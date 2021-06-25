const warns = require("../../models/warn");
const createEmbed = require("../../functions/createEmbed");

module.exports = {
  name: "warn",
  category: "moderation",
  cooldown: 5,
  usage: "<user>",
  description: "Add a warning to a user",
  permissions: ["MANAGE_GUILD"],
  run: async (client, message, args) => {
    let user = message.mentions.users.last();
    if (!user)
      return message.channel.send(createEmbed("fail", "No user was mentioned"));
    if (user.id === client.user.id)
      return message.channel.send(createEmbed("fail", "No user was mentioned"));
    let msg = await message.channel.send(
      createEmbed("success", `Adding warn to ${user.username}`)
    );
    warns.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (data) {
          warns
            .findOneAndUpdate(
              { Guild: message.guild.id, User: user.id },
              { Amount: data.Amount + 1 }
            )
            .exec()
            .then(() => {
              let amt;
              if (data.Amount + 1 === 1) amt = "1st";
              if (data.Amount + 1 === 2) amt = "2nd";
              if (data.Amount + 1 === 3) amt = "3rd";
              if (data.Amount + 1 > 3) amt = `${data.Amount + 1}th`;
              msg.edit(
                createEmbed(
                  "success",
                  `Added warn to ${user.username} | This is their ${amt} warning`
                )
              );
            });
        } else {
          new warns({
            Guild: message.guild.id,
            User: user.id,
            Amount: 1,
          })
            .save()
            .then(() => {
              msg.edit(
                createEmbed(
                  "success",
                  `Added warn to ${user.username} | This is their first warning`
                )
              );
            });
        }
      }
    );
  },
};
