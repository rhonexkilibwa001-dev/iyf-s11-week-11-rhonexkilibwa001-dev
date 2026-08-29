const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const validate = require('../middleware/validate');

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', validate.validatePost, postsController.createPost);
router.put('/:id', validate.validatePostPartial, postsController.updatePost);
router.delete('/:id', postsController.deletePost);
router.patch('/:id/like', postsController.likePost);

module.exports = router;
