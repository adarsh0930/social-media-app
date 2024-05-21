const express = require('express');
const router = express.Router();
const profileController = require('../controllers/userProfileController');
const { extractUserId } = require('../middlewares/authmiddleware');

router.post('/update-profile-pic', extractUserId, profileController.updateProfilePic);

router.post('/update-bio', extractUserId, profileController.updateBio);

module.exports = router;