const { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getAllFriends, checkExistingRequest } = require('../models/friend');
const { getUser } = require('../models/auth');

const sendFriendRequestController = async (req, res) => {
    try {
        const userUsername = req.user.username;
        const { friendUsername } = req.body;

        if (userUsername === friendUsername) {
            return res.status(400).json({ error: 'You cannot send a friend request to yourself' });
        }

        const friend = await getUser(friendUsername);
        if (!friend) {
            return res.status(404).json({ error: 'Friend not found' });
        }

        const existingRequest = await checkExistingRequest(userUsername, friendUsername);
        if (existingRequest) {
            return res.status(400).json({ error: 'Friend request already exists or you are already friends' });
        }

        await sendFriendRequest(userUsername, friendUsername);
        res.json({ message: 'Friend request sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const acceptFriendRequestController = async (req, res) => {
    try {
        const { requestId } = req.body;
        await acceptFriendRequest(requestId);
        res.json({ message: 'Friend request accepted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const rejectFriendRequestController = async (req, res) => {
    try {
        const { requestId } = req.body;
        await rejectFriendRequest(requestId);
        res.json({ message: 'Friend request rejected successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllFriendsController = async (req, res) => {
    try {
        const userUsername = req.user.username;
        const friends = await getAllFriends(userUsername);
        res.json(friends);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { sendFriendRequestController, acceptFriendRequestController, rejectFriendRequestController, getAllFriendsController };