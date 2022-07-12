const Post = require('../models/Post');
const User = require('../models/User');
const ObjectID = require('mongoose').Types.ObjectId;


//CRUD post

exports.createPost = async (req, res,) => {
    const newPost = new Post({
        userId: req.body.userId,
    message: req.body.message,
    //picture: req.file !== null ? "./images" + fileName : "",
    video: req.body.video,
    comments: [],
    likes: 0,
    dislikes: 0,
    usersLiked: [' '],
    usersdisLiked: [' ']
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

 // Système de like/ dislike

 exports.likePost = (req, res, next) => {
    let like = req.body.like
    let userId = req.body.userId
    let postId = req.params.id
    

    switch (like) {
        case 1 :
            Post.updateOne(
                { _id: postId }, 
                { 
                    $push: { usersLiked: userId },
                    $inc: { likes: +1 }
                }
                 )
            .then(() => res.status(200).json({ message: "J'aime" }))
            .catch((error) => res.status(404).json({ error }))
        
        break;
  
        
        case -1 :
            Post.updateOne(

                { _id: postId }, 
                { 
                    $inc: { dislikes: +1 },
                    $push: { usersDisliked: userId }
                }
                 )
            .then(() => { res.status(200).json({ message: "Je n'aime pas" }) })
            .catch((error) => res.status(404).json({error }))
            
            
            break;
            
            case 0 :
                Post.findOne({ _id: postId })
                   .then((post) => {
                    if (post.usersLiked.includes(userId)) { 
                      Post.updateOne(

                        { _id: postId }, 
                        { 
                              $inc: { likes: -1 },
                              $pull: { usersLiked: userId } 
                        }
                            )
                        .then(() => res.status(200).json({ message: "Neutre" }))
                        .catch((error) => res.status(404).json({ error }))
                    }
                    if (post.usersDisliked.includes(userId)) { 
                      Post.updateOne(
                        { _id: postId }, 
                        { 
                              $inc: { dislikes: -1 },
                              $pull: { usersDisliked: userId }
                        }
                            )
                        .then(() => res.status(200).json({ message: "Neutre" }))
                        .catch((error) => res.status(404).json({ error }))
                    }
                  })
                  .catch((error) => res.status(404).json({ error }))
              break;

            default:
                console.log(error);
            }
} 
