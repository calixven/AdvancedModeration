const modlogsModel = require("../../models/modlogs");
const { MessageEmbed } = require("discord.js");
const handler = require("../../handlers/handler");

module.exports = (client, oldMessage, newMessage) => {
  handler(client, newMessage);
  const { guild } = newMessage;

  modlogsModel.findOne({ Guild: guild.id }, async (err, data) => {
    if (!data) return;
    let channel = guild.channels.cache.get(data.Channel);
    if (channel) {
      channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(
            newMessage.author.username,
            newMessage.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `A message has been updated in ${channel}\n\`${oldMessage}\`\n\n\`${newMessage}\``
          )
      );
    }
  });
};
