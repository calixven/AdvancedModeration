const createEmbed = require("../../functions/createEmbed");
const modlogs = require("../../models/modlogs");

module.exports = (client, invite) => {
  let { guild, uses, channel: ch, code, url, inviter } = invite;
  if (!guild) return;
  modlogs.findOne({ Guild: guild.id }, async (err, data) => {
    if (!data) return;
    let channel = guild.channels.cache.get(data.Channel);
    if (!channel) return;
    channel
      .send(
        createEmbed(
          "main",
          `A [Invite](${url} 'Invite to ${guild.name}') has been created\nCreated by: ${inviter.username}\nInvite channel: <#${ch.id}>\nCode: ${code}\nURL: ${url}`,
          inviter
        )
      )
      .catch(() => {});
  });
};
