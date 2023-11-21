const User = require("../models/user");
const Credential = require("../models/credential");
const bcrypt = require("bcrypt");
const { response } = require("express");
const saltRounds = 10;

class SignupController {
  static async Execute(req, res) {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        message: `Invalid Request`,
      });
    } else {
      console.log(req.body);
      const user = new User({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        // role: role.trim(),
      });

      const existingUser = await User.find({
        email: email,
      });

      if (existingUser.length > 0) {
        res.status(400).json({
          message: `This Email is already registered`,
        });
      } else {
        user
          .save()
          .then((response) => {
            if (password) {
              bcrypt.hash(password, saltRounds).then(async function (hash) {
                // Store hash in your password DB.
                const credential = new Credential({
                  user: response._id,
                  email: response.email.trim(),
                  password: hash,
                  role: "Customer",
                  OTP: password,
                });

                credential
                  .save()
                  .then(() => {
                    res.status(200).json({
                      message: `Account Created Sucessfully`,
                    });
                  })
                  .catch((err) => {
                    return res.status(400).send(err);
                  });
              });
            } else {
              res.status(400).json({
                message: `Password does not match`,
              });
            }
          })
          .catch((err) => {
            return res.status(400).send(err, response);
          });
      }
    }
  }
}

module.exports = SignupController;
