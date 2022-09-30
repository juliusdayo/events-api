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
