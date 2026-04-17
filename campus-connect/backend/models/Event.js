const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    date: { type: String, required: true },
    category: { type: String, required: true },
    organizer: { type: String, required: true },
    seats: { type: Number, required: true },
    registered: { type: Number, default: 0 },
    status: { type: String, default: "upcoming" },
    desc: { type: String, default: "" },
    image: { type: String, default: "📌" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);