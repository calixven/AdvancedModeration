const messages = require("../../models/messages");
const createEmbed = require("../../functions/createEmbed");

module.exports = {
  name: "leaderboard",
  category: "utils",
  usage: "<type>",
  description: "View the leaderboard of a certain topic",
  run: (client, message, args) => {
    let type = args[0];
    if (!type)
      return message.channel.send(createEmbed("fail", "No type was given"));
    if (type === "messages") {
      let arrOfObjects = [];
      messages.find({ Guild: message.guild.id }, async (err, data) => {
        if (!data) return;
        data.map((x) => {
          arrOfObjects.push(x);
        });

        let sorted = arrOfObjects.sort((a, b) => b.Messages - a.Messages);

        let arr = [];
        sorted.map(async (x) => {
          arr.push(`${x.Username} - ${x.Messages}`);
        });

        message.channel.send(createEmbed("main", arr.join("\n\n")));
      });
    }
  },
};
