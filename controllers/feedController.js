const { getFriendsPosts } = require('../models/feed');

const getFriendsPostsController = async (req, res) => {
    const now = new Date();
    const since = new Date(now);
    since.setDate(now.getDate() - 7);

    try {
        const username = req.user.username;

        const posts = await getFriendsPosts(username, since.toISOString());
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { getFriendsPostsController };