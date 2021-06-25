let messages = require("../models/messages");

module.exports = (client, message, args) => {
  messages.findOne(
    { Guild: message.guild.id, User: message.author.id },
    async (err, data) => {
      if (!data) {
        new messages({
          Guild: message.guild.id,
          User: message.author.id,
          Messages: 1,
          Username: message.author.tag,
        }).save();
      } else {
        messages
          .findOneAndUpdate(
            { Guild: message.guild.id, User: message.author.id },
            { Messages: data.Messages + 1 }
          )
          .exec();
      }
    }
  );
};
