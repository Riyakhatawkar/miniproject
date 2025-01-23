const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
    destination: { type: String, required: true },
    guests: { type: Number, required: true },
    arrivalDate: { type: Date, required: true },
    leavingDate: { type: Date, required: true },
});

module.exports = mongoose.model("Booking", bookingSchema);

