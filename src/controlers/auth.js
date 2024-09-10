const bcrypt = require("bcryptjs");
const { Usuario } = require("../db");

const login = (req, res) => {
  Usuario.findOne({
    where: {
      userName: req.body.userName,
      deleted: false,
    },
  })
    .then((dbUser) => {
      if (!dbUser) {
        return res.status(404).json({ message: "User not found" });
      } else {
        // password hash
        bcrypt.compare(
          req.body.password,
          dbUser.password,
          (err, compareRes) => {
            if (err) {
              // error while comparing
              res
                .status(502)
                .json({ message: "error while checking user password" });
            } else if (compareRes) {
              // password match
              res.status(200).json({
                message: "user logged in",
                name: dbUser.name,
                userName: dbUser.userName,
                userId: dbUser.userId,
              });
            } else {
              // password doesnt match
              res.status(401).json({ message: "Password Incorrect" });
            }
          }
        );
      }
    })
    .catch((err) => {
      console.log("Error in login controllers: " + err);
    });
};

module.exports = {
  login,
};
