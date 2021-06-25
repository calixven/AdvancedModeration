const tags = require("../models/tags");

module.exports = (client, message, args, cmd) => {
  tags.findOne({ Guild: message.guild.id, Name: cmd }, async (err, data) => {
    if (!data) return;
    message.channel.send(data.Response).then(() => {
      tags
        .findOneAndUpdate(
          { Guild: message.guild.id, Name: cmd },
          { Uses: (data.Uses || 0) + 1 }
          // { upsert: true }
        )
        .exec();
    });
  });
};
