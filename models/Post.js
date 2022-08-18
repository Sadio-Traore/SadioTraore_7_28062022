const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true
    },
    message: {
      type: String,
      maxlength: 1000,
    },
    picture: {
      type: String,
    },
    comments: {
      type: [
        {
          commenterId:String,
          commenterName: String,
          text: String,
          timestamp: Number,
        }
      ],
      required: true,
    },
    likers: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('post', PostSchema);