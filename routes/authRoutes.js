const express = require('express');
const router = express.Router();
const { signup, verifyEmail, login, completeProfile, logout } = require('../controllers/authController');
const { upload, authorize } = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.get('/verify-email', verifyEmail);
router.post('/login', login);
router.post('/complete-profile', authorize, upload.single('profile_pic'), completeProfile);
router.post('/logout', authorize, logout);
 
module.exports = router;