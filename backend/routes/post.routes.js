const express = require('express');
const router = express.Router();
const postCtrl = require ('../controllers/post.controller');


router.post('/', postCtrl.createPost);
router.get('/', postCtrl.readPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);
router.post('/:id/like', postCtrl.likePost)


module.exports = router;