const express = require('express');
const router = express.Router();
const { getFriendsPostsController } = require('../controllers/feedController');
const { extractUserId } = require('../middlewares/authMiddleware');

router.get('/user-feed', extractUserId, getFriendsPostsController);

module.exports = router;