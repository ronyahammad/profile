const Comment = require('../Models/Comment');


exports.commentCreate=async(req,res)=>{
    const comment= await new Comment({
        content: req.body.content,
        creator:req.user.id,
        postId:req.params.id,
    })
    
    comment.save()
    .then((newComment) =>{
    res.status(201).json({     
        msg: "Comment added successfully",
        newComment: {
            ...newComment._doc,
            creator:req.user,
        }
    })}
    )
    .catch(err => {
        res.status(500).json({msg: err.message})})
 
}

exports.commentGet=async(req,res) => {
    await Comment.find({postId: req.params.id})
    .populate({path:'creator', select:'name -_id'})
    .then(comment => {
        res.status(200).json({msg:'Comments fetched according to post',comments:comment})    
    }).catch(err => res.status(500).json({msg: "Comment not found!"+ err}))

}

exports.addReply=async(req,res)=>{
    await Comment.findOne({_id : req.params.id})
    .then((comment) => {
        if(!comment){
            res.status(403).json('Comment _id: '+req.params.id+' cannot be found');
        }else{
            creator: req.user.id,
            postId=req.body.postId
            Comment.create(req.body)
            .then((replies) => {
                comment.reply.push(replies);
                comment.save()
                res.status(200).json(comment.reply);
            })
        }
    })
}

exports.commentDelete=async(req,res) => {
    try {
        res.status(200).json(await Comment.findOneAndDelete({ _id: req.params.id }));
      } catch (err) {
        console.log(err)
        res.status(500).json({msg:err.message});
      }
}

exports.commentEdit=async(req,res) => {
      const {content} = req.body;
      //console.log('content from frontend',content)
    await Comment.findByIdAndUpdate({_id: req.params.id},  {content})
    .then(comment => {
        //console.log('comment for frontend',comment)
        res.status(200).json({msg:"Comment has been edited successfully!",comment})
    }).catch(err => {
        console.log(err)
        res.status(500).json({msg:err.message + err});
    })

}