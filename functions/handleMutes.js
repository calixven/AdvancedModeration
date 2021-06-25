const mutes = require("../models/mute");
const muterole = require("../models/muterole");

module.exports = (client) => {
  setInterval(() => {
    client.guilds.cache.forEach((guild) => {
      mutes.find({ Guild: guild.id }, async (err, data) => {
        if (data) {
          muterole.findOne({ Guild: guild.id }, async (err, mRoleData) => {
            if (!mRoleData) return;
            data.forEach(async (obj) => {
              let member = await guild.members.fetch(obj.User);
              if (Date.now() >= obj.End) {
                mutes.deleteOne({ Guild: guild.id });
                member.roles
                  .remove(mRoleData.Role)
                  .then(() => {
                    mutes
                      .deleteOne({ Guild: guild.id, User: member.id })
                      .exec();
                  })
                  .catch(() => {});
              }
            });
          });
        }
      });
    });
  }, 10 * 1000);
};
