const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  users: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    validate: [
      (val) => {
        console.log(val.length);
        return val.length > 0 && val.length <= 10;
      },
      "Event must have at least one user and must not exceed 10 users",
    ],
  },
});

const eventModel = mongoose.model("Event", eventSchema);

module.exports = { eventModel };
