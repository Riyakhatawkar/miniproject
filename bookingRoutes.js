const express = require("express");
const Booking = require("../models/Booking");
const router = express.Router();

// Add a new booking
router.post("/", async (req, res) => {
    try {
        const { destination, guests, arrivalDate, leavingDate } = req.body;
        const booking = new Booking({ destination, guests, arrivalDate, leavingDate });
        await booking.save();
        res.status(201).json({ message: "Booking created successfully", booking });
    } catch (error) {
        res.status(500).json({ message: "Error creating booking", error });
    }
});

// Get all bookings
router.get("/", async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }
});

module.exports = router;

