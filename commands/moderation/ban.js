const createEmbed = require("../../functions/createEmbed");

module.exports = {
  name: "ban",
  permissions: ["BAN_MEMBERS"],
  category: "moderation",
  usage: "<member>",
  description: "Ban a member from the server",
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
    message.guild.members
      .ban(member.id)
      .then(() => {
        message.channel.send(
          message.channel.send(
            createEmbed("success", "The member has been banned")
          )
        );
      })
      .catch(() => {
        message.channel.send(createEmbed("fail", "Failed to ban the member"));
      });
  },
};
