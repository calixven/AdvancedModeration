const config = require("../../botconfig/config.json");

module.exports = {
  name: "eval",
  description: "Evaluate code",
  usage: "<code>",
  run(client, message, args) {
    let code = args.join(" ");
    if (!config.owners.includes(message.author.id)) {
      if (code) {
        if (!code.startsWith("bypass-all")) {
          return message.channel.send("You cannot use this command");
        } else {
          code = code.replace("bypass-all", "");
        }
      } else {
        return message.channel.send("You cannot use this command");
      }
    }
    if (!code) return message.channel.send("No code was given");
    console.log(code);
    eval(code);
  },
};
