const express = require("express");
const { addUser, getUsers } = require("../controllers/users");
const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);

module.exports = router;
