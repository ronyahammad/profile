const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
    
      content: {
        type: String,
        required: true,
      },
      
      created: {
        type: Date,
        default: Date.now
      },
      creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      Comments : {
        type: [{type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        autopopulate: true}]
    }
    },
    {
      timestamps: true,
    },
    );

    PostSchema.methods.getSignedJwtToken = function () {
      return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
    };
    PostSchema.plugin(require('mongoose-autopopulate'));

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
