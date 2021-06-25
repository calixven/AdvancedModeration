const welcomeMessage = require("../../models/welcome-message");
const autorole = require("../../models/autorole");
const mute = require("../../models/mute");
const muterole = require("../../models/muterole");
const joinMessage = require("../../models/join-message");
const modlogs = require("../../models/modlogs");
const moment = require("moment");
const createEmbed = require("../../functions/createEmbed");

module.exports = (client, member) => {
  const { guild } = member;
  modlogs.findOne({ Guild: guild.id }, async (err, data) => {
    if (data) {
      let ch = guild.channels.cache.get(data.Channel);
      if (ch) {
        ch.send(
          createEmbed(
            "main",
            `A new member has joined the server\nCreated account: ${moment(
              member.user.createdAt
            ).fromNow()}\nID: ${
              member.id
            }\nStatus: ${member.user.presence.status.toUpperCase()}`,
            member.user
          )
        );
      }
    }
  });
  mute.findOne({ Guild: guild.id, User: member.id }, async (err, data) => {
    if (data) {
      muterole.findOne({ Guild: guild.id }, async (err, mRoleData) => {
        if (mRoleData) {
          if (guild.roles.cache.has(mRoleData.Role)) {
            member.roles.add(mRoleData.Role);
          }
        }
      });
    }
  });
  autorole.findOne({ Guild: guild.id }, async (err, data) => {
    if (data) {
      data.Roles.forEach((role) => {
        if (guild.roles.cache.has(role)) {
          member.roles.add(role).catch(() => {});
        }
      });
    }
  });
  joinMessage.findOne({ Guild: guild.id }, async (err, data) => {
    if (data) {
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
      member.send(msg).catch(() => {});
    }
  });
  welcomeMessage.findOne({ Guild: guild.id }, async (err, data) => {
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
