const Post = require('../Models/Post');
const sanitizeHtml = require('sanitize-html'); 

exports.postCreate = async (req, res) => {
  
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ msg: 'Title and content are required.' });
  }

  
  const sanitizedContent = sanitizeHtml(content);

  try {
    const post = new Post({
      title,
      content: sanitizedContent, 
      creator: req.user.id,
    });

    const newPost = await post.save(); 
    res.status(201).json({
      msg: 'Post added successfully',
      newPost: {
        ...newPost._doc,
        creator: req.user,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(501).json({ msg: 'Error adding post: ' + e.message });
  }
};

exports.postDetail=async(req,res)=>{
  try {
    const post = await Post.findById(req.params.id).populate({path:'creator', select:'name'})
    
    if(!post) return res.status(400).json({msg:'This post does not exist'});
    res.json({post})  
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}

/* exports.postEdit=async(req,res)=>{
   const {title,content} = req.body;

     await Post.findOneAndUpdate(
          {_id:req.params.id} ,
          {title,content}
        ).then(result => {
          
          if(result){
            console.log(result);
              res.status(200).json({ msg: "Update successful!" });
          }
          
          else {
              return res.status(500).json({ msg: "Error Updating Post" });
          }
      });
  } */
exports.postEdit = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.findById(req.params.id);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: "Post not found!" });
    }

    // Check if the user is the post creator or an admin
    if (post.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: "You don't have permission to edit this post!" });
    }

    // Update the post
    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();
    res.status(200).json({ msg: "Update successful!", post });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error updating post!" });
  }
};


exports.postByUser=async(req,res)=>{  
  try
  {
     await Post.find({creator:req.user.id})
    .populate({path:'creator',select:'name -_id'}) 
    .then(posts=>{
      res.status(200).json({
        msg: "Post fetched successfully",
        posts
      })    
    }) 
   }catch(err){
    return res.status(500).json({ msg: err.message })
  };
}
//done
exports.postList=async(req,res)=>{
await Post.find()
.populate({path:'creator', select:'name'})
.then((documents) => {
 if (documents) {
   res.status(200).json({
     msg: "Posts fetched successfully!",
     posts: documents,
   });
 } else {
   res.status(404).json({ msg: "Post not found!" });
 }
});
}

exports.postFindById=async(req,res)=>{
  await Post.findOne({_id:req.params.id})
.populate({path:'creator', select:'name -_id'})
.then((documents)=>{
  if (documents) {
    res.status(200).json({
      msg: "Posts fetched successfully!",
      post: documents,
    });
  } else {
    res.status(404).json({ msg: "Post not found!" });
  }
})}


/* exports.postDelete= async(req,res)=>{
 try {
  await Post.findOneAndDelete({ _id: req.params.id })
   res.status(200).json({msg:'Successfully deleted'});
 } catch (err) {
   res.status(500).json(err);
 }
}
 */

exports.postDelete = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: "Post not found!" });
    }

    // Check if the user is the post creator or an admin
    if (post.creator.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ msg: "You don't have permission to delete this post!" });
    }

    await post.remove();
    res.status(200).json({ msg: "Post successfully deleted!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Error deleting post!" });
  }
};
