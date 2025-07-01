const mongoose = require("mongoose");
const conn = mongoose.createConnection(process.env.MONGODB_URI_MARV);

const UserMarv = conn.model("UserMarv", {
  email: {
    type: String,
    required: true,
  },
  account: {
    username: {
      type: String,
      required: true,
    },
    // avatar: {
    //   type: Object,
    //   default:
    //     "https://asset.cloudinary.com/djk45mwhr/16e96edde6d78396188a2000bb61738e",
    // },
  },
  token: String,
  hash: String,
  salt: String,
});

module.exports = UserMarv;
