const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      //unique: true,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: false
    },
  bio: {
    type: String,
    trim: true
  },
    role: {
      type: String,
      default: 'subscriber'
    },
    avatar: {
      type: String,
      default: "https://res.cloudinary.com/dutgtwjbp/image/upload/v1640905288/sample.jpg"
  }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);