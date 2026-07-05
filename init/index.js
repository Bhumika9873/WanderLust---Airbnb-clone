require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connected to DB");
    return initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

// owner username = bhumika and gmail = abc@gmail.com
const initDB = async () => {
  await Listing.deleteMany({});

  const listings = [];

  for (let obj of initData.data) {
    const response = await geocodingClient
      .forwardGeocode({
        query: obj.location,
        limit: 1,
      })
      .send();
        console.log(obj.location, response.body.features);

    listings.push({
      ...obj,
      owner: new mongoose.Types.ObjectId("68fe64450653066a81d94291"),
      geometry: response.body.features[0].geometry,
    });
  }

  await Listing.insertMany(listings);

  console.log("Data was initialized");
  mongoose.connection.close();
};