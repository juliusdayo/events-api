const dayjs = require("dayjs");
const isSameOrBefore = require("dayjs/plugin/isSameOrBefore");

const { eventModel } = require("../models/events");

const validate = async (s, e, d) => {
  const startTime = dayjs(s);
  const endTime = dayjs(e);
  const currentTime = dayjs();

  const existing = await eventModel
    .find({
      start: { $lte: e },
      end: { $gte: s },
      date: { $gte: d, $lte: dayjs(d).add(1, "day") },
    })
    .count();
  //return false if hour set is less than 8am or greater that 8pm which is multiplied by 60 to get minutes
  if (
    startTime.hour() < 8 ||
    endTime.hour() * 60 + endTime.minute() > 60 * 20
  ) {
    return { valid: false, message: "Event must be between 8am and 8pm" };
  }
  if (
    (currentTime.isAfter(dayjs(d)) && startTime.isBefore(currentTime)) ||
    dayjs(d).isBefore(currentTime)
  ) {
    return { valid: false, message: "Event cannot be in the past" };
  }
  if (startTime.isAfter(endTime)) {
    return { valid: false, message: "Event cannot end before it starts" };
  }
  if (existing > 0) {
    return { valid: false, message: "Event already exists" };
  } else {
    return { valid: true, message: "Event added" };
  }
};

const getEvent = async (req, res) => {
  try {
    const events = await eventModel.find().populate("users");
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addEvent = async (req, res, next) => {
  const { title, description, start, end, date, users } = req.body;

  const event = new eventModel({
    title,
    description,
    start,
    end,
    date,
    users,
  });

  try {
    const { valid, message } = await validate(start, end, date);

    if (!valid) {
      res.status(400).send({ message: message });
    } else {
      const newEvent = await event.save();
      res.status(201).json(newEvent);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateEvent = async (req, res) => {
  const { title, description, start, end, date } = req.body;
  const { id } = req.params;

  const event = {
    ...req.body,
  };

  try {
    const { valid, message } = await validate(start, end, date);
    if (!valid) {
      res.status(400).send({ message: message });
    } else {
      const updatedEvent = await eventModel.findByIdAndUpdate(id, event, {
        new: true,
      });
      res.status(200).json(updatedEvent);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await eventModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  getEvent,
  addEvent,
  updateEvent,
  deleteEvent,
};
