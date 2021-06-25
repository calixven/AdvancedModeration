const createEmbed = require("../../functions/createEmbed");
const messages = require("../../models/messages");

module.exports = {
  name: "messages",
  usage: "[user]",
  description: "Check how many messages a user has",
  category: "utils",
  cooldown: 5,
  run: (client, message, args) => {
    let user = message.mentions.users.last()
      ? message.mentions.users.last()
      : message.author;
    if (user.id === client.user.id) user = message.author;
    let msgs = 0;
    messages.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (data) msgs = data.Messages;
        message.channel.send(
          createEmbed("main", `${user.username} has ${msgs} messages`)
        );
      }
    );
  },
};
