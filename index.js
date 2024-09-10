const server = require("./src/app.js");
const { sequelize } = require("./src/db");

sequelize.sync({ force: false }).then(() => {
  server.listen(8080, async () => {
    try {
      console.log("Server on: Listening at 8080");
    } catch (e) {
      console.log("Error in sequelize.sinc, index.js: " + e);
    }
  });
});
