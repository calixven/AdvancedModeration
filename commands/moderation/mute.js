const mutes = require("../../models/mute");
const ms = require("ms");
const createEmbed = require("../../functions/createEmbed");
const muterole = require("../../models/muterole");

module.exports = {
  name: "mute",
  category: "moderation",
  cooldown: 5,
  usage: "<@user> <time>",
  permissions: ["MANAGE_MESSAGES"],
  run: (client, message, args) => {
    let user = message.mentions.users.last();
    if (!user)
      return message.channel.send(createEmbed("fail", "No user was mentioned"));
    if (user.id === client.user.id)
      return message.channel.send(createEmbed("fail", "No user was mentioned"));
    let time = args[1];
    if (!time)
      return message.channel.send(createEmbed("fail", "No time was given"));
    time = ms(time);
    mutes.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (data)
          return message.channel.send(
            createEmbed("fail", "The user is already muted")
          );
        muterole.findOne({ Guild: message.guild.id }, async (err, data) => {
          if (!data)
            return message.channel.send(
              createEmbed("fail", "There is no saved mute role")
            );
          new mutes({
            Guild: message.guild.id,
            User: user.id,
            End: Date.now() + time,
          })
            .save()
            .then(() => {
              message.channel.send(
                createEmbed("success", `Successfully muted ${user.username}`)
              );
            });
          let member = await message.guild.members.fetch(user.id);
          member.roles.add(data.Role);
          setTimeout(() => {
            member.roles.remove(data.Role);
          }, time);
        });

        // mutes.find({Guild: message.guild.id}, async(err, data) => {
        //   if (data) {
        //     data.map((obj) => {
        //       if (obj.User === user.id) return message.channel.send(createEmbed("fail", 'The user is already muted'))
        //     })
        //   }
        // })
      }
    );
  },
};
