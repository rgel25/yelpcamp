const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { descriptors, places } = require("./seedHelpers");

mongoose
  .connect("mongodb://127.0.0.1:27017/yelp-camp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection open");
  })
  .catch((err) => {
    console.error(err);
  });

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Campground.deleteMany({});

  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://source.unsplash.com/collection/483251`,
      price,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quasi ea doloremque perferendis consectetur error ipsum aliquam unde eveniet, sit reiciendis beatae vitae possimus nesciunt exercitationem autem quia? Harum, nesciunt.",
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
