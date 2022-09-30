const express = require("express");
const {
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const router = express.Router();

router.get("/", getEvent);
router.post("/", addEvent);
router.put("/:id", updateEvent);
router.delete("/:id", deleteEvent);

module.exports = router;
