const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

const Admin = require("../models/admin");

router.post("/login", (req, res) => {
  // const { errors, isValid } = validateLoginInput(req.body);
  const errors = [];
  const isValid = true;
  // Check Validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find admin by email
  Admin.findOne({ email }).then(admin => {
    // Check for admin
    if (!admin) {
      errors.email = "Admin not found";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, admin.password).then(isMatch => {
      if (isMatch) {
        // Admin Matched
        const payload = { id: admin.id, name: admin.name }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.jwtSecret,
          { expiresIn: 14400 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

// router.post('/register', (req, res) => {
//   // const { errors, isValid } = validateRegisterInput(req.body);
//   const errors = [];
//   const isValid = true;
//   // Check Validation
//   if (!isValid) {
//     return res.status(400).json(errors);
//   }

//   Admin.findOne({ email: req.body.email }).then(admin => {
//     if (admin) {
//       errors.email = 'Email already exists';
//       return res.status(400).json(errors);
//     } else {

//       const newAdmin = new Admin({
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password
//       });

//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newAdmin.password, salt, (err, hash) => {
//           if (err) throw err;
//           newAdmin.password = hash;
//           newAdmin
//             .save()
//             .then(admin => res.json(admin))
//             .catch(err => console.log(err));
//         });
//       });
//     }
//   });
// });

module.exports = router;
