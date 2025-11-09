const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
.get(wrapAsync(listingController.index))//index route
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.addNewListing));//create route

// Search Route 
router.get("/search", wrapAsync(listingController.searchListings));

//New Route
router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.ShowListings))//show route
.put(isLoggedIn,isOwner, upload.single('listing[image]'),validateListing, wrapAsync(listingController.updateListing))//update route
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));//detete route

//Edit Route 
router.get("/:id/edit", isLoggedIn,isOwner, listingController.editListing);

router.get("/filter", async (req, res) => {
    const category = req.query.category;
    const listings = await Listing.find({ category: category });
    res.render("listings/index.ejs", { listings });
});
module.exports=router;