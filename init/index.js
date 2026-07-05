require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

main()
.then(() => {
    console.log("Connected to DB");
    initDB();
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

    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner: new mongoose.Types.ObjectId("68fe64450653066a81d94291"),
    }));

    await Listing.insertMany(initData.data);
    console.log("Data was initialized");
    mongoose.connection.close();
};