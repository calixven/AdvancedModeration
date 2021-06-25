const createEmbed = require("../../functions/createEmbed");
const blacklistWord = require("../../models/blacklist-word");
const { blacklistedWords } = require("../../Collections/blacklistedWords");

module.exports = {
  name: "blacklist-word",
  category: "config",
  description: "Manage blacklist word system",
  usage: "<operation> <word>",
  permissions: ["MANAGE_GUILD"],
  run: (client, message, args) => {
    let func = args[0];
    if (!func)
      return message.channel.send(
        createEmbed("fail", "No operation was given")
      );
    if (func === "add") {
      let word = args[1];
      if (!word)
        return message.channel.send(createEmbed("fail", "No word was given"));
      let prevWords = blacklistedWords.get(message.guild.id)
        ? blacklistedWords.get(message.guild.id)
        : [];
      prevWords.push(word);
      blacklistedWords.set(message.guild.id, prevWords);

      blacklistWord.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data) {
          new blacklistWord({
            Guild: message.guild.id,
            Words: [word],
          })
            .save()
            .then(() => {
              message.channel.send(
                createEmbed("success", "Added word to blacklists")
              );
            });
        } else {
          let Words = data.Words;
          Words.push(word);
          blacklistWord
            .findOneAndUpdate(
              { Guild: message.guild.id },
              {
                Words,
              },
              {
                upsert: true,
              }
            )
            .exec()
            .then(() => {
              message.channel.send(
                createEmbed("success", "Added word to blacklists")
              );
            });
        }
      });
    }
    if (func === "remove") {
      let word = args[1];
      if (!word)
        return message.channel.send(createEmbed("fail", "No word was given"));
      let curWords = blacklistedWords.get(message.guild.id);
      if (curWords) {
        let index = curWords.indexOf(word);
        curWords.splice(index);
        blacklistedWords.set(message.guild.id, curWords);
      }
      blacklistWord.findOne({ Guild: message.guild.id }, async (err, data) => {
        if (!data)
          return message.channel.send(
            createEmbed("fail", "There are no blacklisted words")
          );
        let words = data.Words;
        if (!words.includes(word)) {
          return message.channel.send(
            createEmbed(
              "fail",
              "None of the blacklisted words include that word"
            )
          );
        }
        let index = words.indexOf(word);
        words.splice(index);
        blacklistWord
          .findOneAndUpdate({ Guild: message.guild.id }, { Words: words })
          .exec()
          .then(() => {
            message.channel.send(
              createEmbed("success", "Removed blacklisted word")
            );
          });
      });
    }
  },
};
