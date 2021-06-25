const goodbyeMessage = require("../../models/goodbye-message");

module.exports = (client, member) => {
  const { guild } = member;
  goodbyeMessage.findOne({ Guild: guild.id }, async (err, data) => {
    if (!data) return;
    let channel = guild.channels.cache.get(data.Channel);
    let msg = data.Message;
    if (msg.includes("{member}")) {
      msg = msg.replace(/{member}/g, `<@${member.id}>`);
    }
    if (msg.includes("{member.name}")) {
      msg = msg.replace(/{member.name}/g, `${member.user.username}`);
    }
    if (msg.includes("{member.tag}")) {
      msg = msg.replace(/{member.tag}/g, `${member.user.tag}`);
    }
    if (msg.includes("{member.id}")) {
      msg = msg.replace(/{member.id}/g, `${member.id}`);
    }
    if (msg.includes("{server}")) {
      msg = msg.replace(/{server}/g, guild.name);
    }
    if (msg.includes("{server.id}")) {
      msg = msg.replace(/{server.id}/g, guild.id);
    }
    if (msg.includes("{membercount}")) {
      msg = msg.replace(/{membercount}/g, guild.memberCount);
    }

    channel.send(msg);
  });
};
