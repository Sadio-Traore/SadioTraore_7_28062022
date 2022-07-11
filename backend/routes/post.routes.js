const express = require('express');
const router = express.Router();
const postCtrl = require ('../controllers/post.controller');


router.get('/', postCtrl.readPost);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.updatePost);
router.delete('/:id', postCtrl.deletePost);


module.exports = router;