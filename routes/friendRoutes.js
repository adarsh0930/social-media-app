const express = require('express');
const router = express.Router();
const { sendFriendRequestController, acceptFriendRequestController, rejectFriendRequestController, getAllFriendsController } = require('../controllers/friendController');
const { extractUserId } = require('../middlewares/authMiddleware');

router.post('/send-request', extractUserId, sendFriendRequestController);
router.post('/accept-request', extractUserId, acceptFriendRequestController);
router.post('/reject-request', extractUserId, rejectFriendRequestController);
router.get('/all-friends', extractUserId, getAllFriendsController);

module.exports = router;