const { createPost, getUserPosts, likePost, commentPost, getPostLikes, getPostComments } = require('../models/post');
const path = require('path');

const createPostController = async (req, res) => {
    try {
        const { text } = req.body;
        const imageUrl = req.file ? path.join('/uploads/images', req.file.filename) : null;
        const userId = req.user.username;

        await createPost({ username: userId, text, image_url: imageUrl });
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getUserPostsController = async (req, res) => {
    try {
        const username = req.params.username;

        const posts = await getUserPosts(username);
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const likePostController = async (req, res) => {
    try {
        const username = req.user.username;
        const { postId } = req.body;

        const newLike = await likePost({ post_id: postId, username });
        res.status(201).json({ message: 'Post liked successfully', likeId: newLike });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const commentPostController = async (req, res) => {
    try {
        const username = req.user.username;
        const { postId, comment } = req.body;

        const newComment = await commentPost({ post_id: postId, username, comment });
        res.status(201).json({ message: 'Comment added successfully', commentId: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPostLikesController = async (req, res) => {
    try {
        const postId = req.params.postId;

        const likes = await getPostLikes(postId);
        res.status(200).json(likes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPostCommentsController = async (req, res) => {
    try {
        const postId = req.params.postId;

        const comments = await getPostComments(postId);
        res.status(200).json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {createPostController, getUserPostsController, likePostController, commentPostController, getPostLikesController, getPostCommentsController };