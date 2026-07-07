const express = require("express");
const router = express.Router();

const User = require("../models/user");
const { isLoggedIn } = require("../middleware");

// Add to Wishlist
router.post("/:id", isLoggedIn, async (req, res) => {
    const user = await User.findById(req.user._id);

    if (!user.wishlist.includes(req.params.id)) {
        user.wishlist.push(req.params.id);
        await user.save();
    }

    req.flash("success", "Added to Wishlist");
    res.redirect(`/listings/${req.params.id}`);
});

module.exports = router;