const createEmbed = require("../../functions/createEmbed");
const activeCommands = require("../../models/active-commands");
const {
  activeCommands: activeCmds,
} = require("../../Collections/active-commands");

module.exports = {
  name: "disable-command",
  category: "config",
  usage: "<command>",
  cooldown: 5,
  description: "Disable a enabled command",
  run(client, message, args) {
    if (!args[0])
      return message.channel.send(createEmbed("fail", "No command name given"));
    let cmd = client.commands.get(args[0]);
    if (!cmd)
      return message.channel.send(createEmbed("fail", "Unknown command"));
    activeCommands.findOne(
      { Guild: message.guild.id, Command: args[0] },
      async (err, data) => {
        if (data)
          return message.channel.send(
            createEmbed("fail", "That command is already disabled")
          );
        let array = activeCmds.has(message.guild.id)
          ? activeCmds.get(message.guild.id)
          : [];
        array.push(args[0]);
        activeCmds.set(message.guild.id, array);
        new activeCommands({
          Guild: message.guild.id,
          Command: args[0],
        })
          .save()
          .then(() => {
            message.channel.send(
              createEmbed("success", "The command has been disabled")
            );
          });
      }
    );
  },
};
