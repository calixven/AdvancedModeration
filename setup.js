const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.clear();
rl.question("Enter bot token: ", (token) => {
  rl.question("Enter bot prefix: ", (prefix) => {
    rl.question("Enter mongo connection string: ", (connectionString) => {
      rl.question(
        'Enter your discord ID, If you dont have one or dont know how to get it then put "none": ',
        (ownerID) => {
          let fs = require("fs");
          let file = require("./botconfig/config.json");
          file["token"] = token;
          file.prefix = prefix;
          file.mongo_path = connectionString;
          if (ownerID !== "none") {
            file["owners"] = [ownerID];
          }
          fs.writeFile(
            "./botconfig/config.json",
            JSON.stringify(file, null, 2),
            (err) => {}
          );
          console.log("The setup is done! You can close this now");
        }
      );
    });
  });
});
