const autorole = require("../../models/autorole");
const createEmbed = require("../../functions/createEmbed");

module.exports = {
  permissions: ["MANAGE_GUILD"],
  name: "autorole",
  category: "config",
  description: "Manage auto roles",
  usage: "<operation> <role>",
  run: (client, message, args) => {
    let func = args[0];
    if (!func)
      return message.channel.send(
        createEmbed("fail", "No operation was given")
      );
    if (func === "add") {
      let role = message.mentions.roles.first();
      if (!role)
        return message.channel.send(
          createEmbed("fail", "No role was mentioned")
        );
      autorole.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) {
          new autorole({
            Guild: message.guild.id,
            Roles: [role.id],
          })
            .save()
            .then(() => {
              message.channel.send(createEmbed("success", "Added auto role "));
            });
        } else {
          let roles = data.Roles;
          roles.push(role.id);
          autorole
            .findOneAndUpdate({ Guild: message.guild.id }, { Roles: roles })
            .exec()
            .then(() =>
              message.channel.send(createEmbed("success", "Added auto role "))
            );
        }
      });
    }
    if (func === "remove") {
      let role = message.mentions.roles.first();
      if (!role)
        return message.channel.send(createEmbed("fail", "No role mentioned"));
      autorole.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data)
          return message.channel.send(
            createEmbed("fail", "There are no saved auto roles")
          );
        if (!data.Roles.includes(role.id))
          return message.channel.send(
            createEmbed("fail", "That role is not part of the auto roles")
          );
        let r = data.Roles;
        let index = r.indexOf(role.id);
        r.splice(index, 1);
        autorole
          .findOneAndUpdate({ Guild: message.guild.id }, { Roles: r })
          .exec()
          .then(() => {
            message.channel.send(
              createEmbed("success", "Successfully removed the auto role.")
            );
          });
      });
    }
  },
};
