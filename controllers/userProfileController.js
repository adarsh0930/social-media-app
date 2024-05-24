const { updateBioInDatabase, updateProfilePicInDatabase } = require('../models/users');

const updateProfilePic = async (req, res) => {
    try {
        const userId = req.user.id;
        const profilePic = req.body.profilePic;

        await updateProfilePicInDatabase(userId, profilePic);
        res.json({ message: 'Profile picture updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateBio = async (req, res) => {
    try {
        const userId = req.user.id;
        const { bio } = req.body;

        await updateBioInDatabase(userId, bio);
        res.json({ message: 'Bio updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { updateProfilePic, updateBio };