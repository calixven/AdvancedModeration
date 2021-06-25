const { blacklistedWords } = require("../Collections/blacklistedWords");
module.exports = (client, message) => {
  const args = message.content.trim().split(/ +/g);
  let wordsArray = blacklistedWords.get(message.guild.id);
  if (!wordsArray) return;
  if (args[0].includes("blacklist-word")) return;
  wordsArray.some((word) => {
    if (args.includes(word)) {
      if (!message.deleted) {
        message.delete().then(() => {
          message.reply("You cannot say that word");
        });
      }
    }
  });
};
