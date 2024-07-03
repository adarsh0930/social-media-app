const express = require('express');
const { createPostController, getUserPostsController, likePostController, commentPostController, getPostLikesController, getPostCommentsController } = require('../controllers/postController');
const { upload, extractUserId } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/create', extractUserId, upload.single('image'), createPostController);
router.get('/user/:username', extractUserId, getUserPostsController);
router.post('/like/:postId', extractUserId, likePostController);
router.post('/comment/:postId', extractUserId, commentPostController);
router.get('/likes/:postId', extractUserId, getPostLikesController);
router.get('/comments/:postId', extractUserId, getPostCommentsController);

module.exports = router;