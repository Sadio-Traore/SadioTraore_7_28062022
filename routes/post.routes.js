const router = require('express').Router();
const postCtrl = require('../controllers/post.controller');
const multer = require("multer");
const upload = multer();

router.get('/', postCtrl.readPost);
router.post('/', upload.single("file"), postCtrl.createPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);

// comments
router.patch('/comment-post/:id', postCtrl.commentPost);
router.patch('/edit-comment-post/:id', postCtrl.editCommentPost);
router.patch('/delete-comment-post/:id', postCtrl.deleteCommentPost);


//Route like/dislike
router.patch('/like-post/:id', postCtrl.likePost);
router.patch('/dislike-post/:id', postCtrl.dislikePost);
module.exports = router;