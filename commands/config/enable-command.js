const createEmbed = require("../../functions/createEmbed");
const activeCommands = require("../../models/active-commands");
const {
  activeCommands: activeCmds,
} = require("../../Collections/active-commands");

module.exports = {
  name: "enable-command",
  category: "config",
  usage: "<command>",
  cooldown: 5,
  description: "Enable a disabled command",
  run(client, message, args) {
    if (!args[0])
      return message.channel.send(createEmbed("fail", "No command name given"));
    let cmd = client.commands.get(args[0]);
    if (!cmd)
      return message.channel.send(createEmbed("fail", "Unknown command"));
    activeCommands.findOne(
      { Guild: message.guild.id, Command: args[0] },
      async (err, data) => {
        if (!data)
          return message.channel.send(
            createEmbed("fail", "There are no disabled commands")
          );

        let guildArr = activeCmds.get(message.guild.id);
        if (guildArr) {
          let index = guildArr.indexOf(args[0]);
          guildArr.splice(index, 1);
          activeCmds.set(message.guild.id, guildArr);
        }
        activeCommands
          .deleteOne({ Guild: message.guild.id, Command: args[0] })
          .exec()
          .then(() => {
            message.channel.send(
              createEmbed("success", "The command has been enabled")
            );
          });
      }
    );
  },
};
