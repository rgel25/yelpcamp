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

  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "62d11bc539e5d327f9c7c77c",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dlygwhauo/image/upload/v1658041000/YelpCamp/an3xyvujweyzys4qfl4q.jpg",
          filename: "YelpCamp/an3xyvujweyzys4qfl4q",
        },
        {
          url: "https://res.cloudinary.com/dlygwhauo/image/upload/v1658041014/YelpCamp/lepkejj13hxepu08blhr.jpg",
          filename: "YelpCamp/lepkejj13hxepu08blhr",
        },
      ],
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
