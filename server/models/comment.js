const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  movieId: {
    type: String,
    required: true,
  },
  comments: [
    {
      userId: { type: String },
      email: { type: String },
      comment: { type: String },
      date: { type: Date, default: Date.now }, 
    },
  ],
});

module.exports = mongoose.model("comment", commentSchema);
