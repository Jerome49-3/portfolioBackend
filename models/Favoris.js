const mongoose = require("mongoose");

const Favoris = mongoose.model("Favoris", {
  email: {
    type: String,
    required: true,
  },
  account: {
    username: {
      type: String,
      required: true,
    },
    avatar: {
      type: Object,
      default:
        "https://asset.cloudinary.com/djk45mwhr/16e96edde6d78396188a2000bb61738e",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = Favoris;
