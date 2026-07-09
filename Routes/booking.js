const express = require("express");
const router = express.Router();

const Booking = require("../models/booking");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware");

// ================= MY BOOKINGS =================

router.get("/mybookings", isLoggedIn, async (req, res) => {

    const bookings = await Booking.find({
        user: req.user._id
    })
    .populate("listing")
    .populate("user");

    res.render("bookings/mybookings", { bookings });

});

// ================= CANCEL BOOKING =================

router.post("/cancel/:id", isLoggedIn, async (req, res) => {

    await Booking.findByIdAndDelete(req.params.id);

    req.flash("success", "Booking Cancelled");

    res.redirect("/book/mybookings");

});

// ================= BOOKING FORM =================

router.get("/:id", isLoggedIn, async (req, res) => {

    const listing = await Listing.findById(req.params.id);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    res.render("bookings/booking", { listing });

});

// ================= SAVE BOOKING =================

router.post("/:id", isLoggedIn, async (req, res) => {

    const listing = await Listing.findById(req.params.id);

    const { checkIn, checkOut, guests } = req.body;

    const days = Math.ceil(
        (new Date(checkOut) - new Date(checkIn)) /
        (1000 * 60 * 60 * 24)
    ) || 1;

    const totalPrice = days * listing.price;

    const booking = new Booking({
        user: req.user._id,
        listing: listing._id,
        checkIn,
        checkOut,
        guests,
        totalPrice,
    });

    await booking.save();

    req.flash("success", "Booking Confirmed");

    res.redirect("/book/mybookings");

});

module.exports = router;