const express = require('express');
const router = express.Router();
const {registerUser, authUser, updateUserInfo} = require("../Controller/userController");

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/update/:id").put(updateUserInfo)
module.exports = router;
