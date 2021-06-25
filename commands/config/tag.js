const createEmbed = require("../../functions/createEmbed");
const tags = require("../../models/tags");
const { MessageEmbed } = require("discord.js");

module.exports = {
  permissions: ["MANAGE_GUILD"],
  name: "tag",
  description: "Create custom tags for your server",
  usage: "<operation> <tagName>",
  category: "config",
  run(client, message, args) {
    let func = args[0];
    if (!func)
      return message.channel.send(
        createEmbed("fail", "No operation was given")
      );
    if (func === "create" || func === "add") {
      let tagName = args[1];
      let response = args.slice(2).join(" ");
      if (!tagName)
        return message.channel.send(
          createEmbed("fail", "No tag name was given")
        );
      if (!response)
        return message.channel.send(
          createEmbed("fail", "No response was given")
        );
      tags.find({ Guild: message.guild.id }, async (err, data) => {
        let names = [];
        data.forEach((d) => {
          names.push(d.Name);
        });
        if (names.includes(tagName))
          return message.channel.send(
            createEmbed("fail", "That tag already exists")
          );
        new tags({
          Guild: message.guild.id,
          Response: response,
          Name: tagName,
          createdBy: message.author.username,
          authorAvatar: message.author.displayAvatarURL({ dynamic: true }),
        })
          .save()
          .then(() => {
            message.channel.send(
              createEmbed("success", `Created tag **${tagName}**`)
            );
          });
      });
    }
    if (func === "delete" || func === "remove") {
      let name = args[1];
      if (!name)
        return message.channel.send(
          createEmbed("fail", "No tag name was given")
        );
      tags.findOne(
        { Guild: message.guild.id, Name: name },
        async (err, data) => {
          if (!data)
            return message.channel.send(
              createEmbed("fail", "That tag does not exist")
            );
          tags
            .deleteOne({ Guild: message.guild.id, Name: name })
            .exec()
            .then(() => {
              message.channel.send(
                createEmbed("success", "The tag has been deleted")
              );
            });
        }
      );
    }
    if (func === "list") {
      tags.find({ Guild: message.guild.id }, async (err, data) => {
        if (!data)
          return message.channel.send(
            createEmbed("fail", "There are no tags for this server")
          );
        let names = [];
        if (!data.length)
          return message.channel.send(
            createEmbed("fail", "Data found but there are `0` tags")
          );
        data.map((obj) => {
          names.push(`\`${obj.Name}\``);
        });

        message.channel.send(
          createEmbed("main", names.join(", "), message.author)
        );
      });
    }
    if (func === "info") {
      let tagName = args[1];
      if (!tagName)
        return message.channel.send(
          createEmbed("fail", "No tag name was given")
        );
      tags.findOne(
        { Guild: message.guild.id, Name: tagName },
        async (err, data) => {
          if (!data)
            return message.channel.send(
              createEmbed("fail", "That tag does not exist")
            );
          message.channel.send(
            new MessageEmbed()
              .setColor("RED")
              .addField("Name", tagName)
              .addField("Guild", message.guild.name)
              .addField("Uses", data.Uses || 0)
              .addField("Created by", data.createdBy || "Data not found")
              .setThumbnail(data.authorAvatar)
          );
        }
      );
    }
  },
};
