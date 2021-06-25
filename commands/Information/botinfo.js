const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "botinfo",
  description: "Get information on the bot",
  cooldown: 3,
  category: "Information",
  run: (client, message, args, user, text, prefix) => {
    let totalMembers = 0;
    for (guild of client.guilds.cache) {
      totalMembers += guild[1].memberCount;
    }
    const infoEmbed = new MessageEmbed()
      .setColor(require("../../botconfig/config.json").main_color)

      .setTitle("Discord Advanced Moderation Bot")
      .setDescription(`More info about ${client.user.username}`)
      .addField("🔹__Version__", "1.0.0", true)
      .addField("📚__Libary__", "**Discord.JS**    ", true)
      .addField("__Creators__", "[ApiDev234](https://github.com/apidev234)", true)
      .addField(
        "__Servers & Users__",
        `Total Servers: \`${client.guilds.cache.size}\` \n Total Users: \`${totalMembers}\``,
        true
      )
      .addField(
        "❓__Prefixes__",
        `Default: \`${
          require("../../botconfig/config.json").prefix
        }\`\nServer: \`${prefix}\``,
        true
      )
      //  .addField(" __Creation Date:__", '**24/6/2021**', true)
      .addField(
        "💠 __Shards__",
        `Online: \`${client.options.shardCount}\` \n Total: \`${client.options.shardCount}\``,
        true
      )
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter("Uptime: 24/7");
    if (require("../../botconfig/config.json").show_bot_invite === true)
      infoEmbed.setURL(
        `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`
      );
    // message.channel.send(
    //   new MessageEmbed()
    //     .setColor("RED")
    //     .setAuthor(
    //       message.author.username,
    //       message.author.displayAvatarURL({ dynamic: true })
    //     )
    //     .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    //     .setDescription("")
    //     // .addField("Servers", client.guilds.cache.size)
    //   // .addField("Channels", client.channels.cache.size)
    //   // .addField("Emojis", client.emojis.cache.size)
    //   // .addField("Users", totalMembers)
    // );
    message.channel.send(infoEmbed);
  },
};
