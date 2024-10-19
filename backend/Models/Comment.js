const mongoose = require("mongoose");


const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
},    
  creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    postedDate: {type: Date, default: Date.now},
    reply:{
      type: [{type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
      autopopulate: true}]
},
},
{
    timestamps: true,
  },
)
CommentSchema.plugin(require('mongoose-autopopulate'));

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
