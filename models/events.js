const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const eventModel = mongoose.model("Event", eventSchema);

module.exports = { eventModel };
