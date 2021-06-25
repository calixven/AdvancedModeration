const modlogsModel = require("../../models/modlogs");
const { MessageEmbed } = require("discord.js");

module.exports = (client, message) => {
  const { guild, content } = message;
  if (!guild) return;
  if (!message.author) return;
  if (message.author.bot) return;
  modlogsModel.findOne({ Guild: guild.id }, async (err, data) => {
    if (!data) return;
    let channel = guild.channels.cache.get(data.Channel);
    if (channel) {
      channel.send(
        new MessageEmbed()
          .setColor("RED")
          .setAuthor(
            message.author.username,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setDescription(
            `A message has been deleted in ${channel}\n\`${content}\``
          )
      );
    }
  });
};
