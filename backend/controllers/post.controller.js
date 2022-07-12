const Post = require('../models/Post');
const User = require('../models/User');
const ObjectID = require('mongoose').Types.ObjectId;

exports.createPost = async (req, res,) => {
    const newPost = new Post({
        userId: req.body.userId,
    message: req.body.message,
    //picture: req.file !== null ? "./images" + fileName : "",
    video: req.body.video,
    likers: [],
    comments: [],
    })

    try {
        const post = await newPost.save();
        return res.status(201).json(post);
        
    } catch (error) {return res.status(400).send(err)
    }    
    
    
 };


exports.readPost = (req, res,next) => {
    Post.find((err,docs) => {
        if(!err) res.send(docs);
        else console.log("Impossible de récupérer les posts" + err);
    }).sort({ createdAt: -1 });

  };
        
    
exports.updatePost = (req, res,next) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Id non reconnu");

  const updatedRecord = {
    message: req.body.message,
  };

  Post.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Impossible de mofifier le post " + err);
    }
  );

}
exports.deletePost = (req, res,next) => {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error : " + err);
  });

}