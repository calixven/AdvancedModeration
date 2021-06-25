const createEmbed = require("../../functions/createEmbed");

module.exports = {
  permissions: ["KICK_MEMBERS"],
  name: "kick",
  category: "moderation",
  description: "Kick a member from the server",
  usage: "<member>",
  cooldown: 5,
  run: (client, message, args) => {
    let member = message.mentions.members.last();

    if (!member)
      return message.channel.send(
        createEmbed("fail", "No member was mentioned")
      );
    if (member.id === client.user.id)
      return message.channel.send(
        createEmbed("fail", "No member was mentioned")
      );
    if (
      member.roles.highest.position >= message.member.roles.highest.position &&
      message.author.id !== message.guild.ownerID
    )
      return message.channel.send(
        createEmbed(
          "fail",
          "The members roles is higher than yours",
          message.author
        )
      );
    member
      .kick()
      .then(() => {
        message.channel.send(
          message.channel.send(
            createEmbed("success", "The member has been kicked")
          )
        );
      })
      .catch(() => {
        message.channel.send(createEmbed("fail", "Failed to kick the member"));
      });
  },
};
