const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/newDB.sqlite');
exports.db = db;

const createPost = (postData) => {
    const { username, text, image_url } = postData;
    const query = `INSERT INTO posts (username, text, image_url) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.run(query, [username, text, image_url], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

const getUserPosts = (username) => {
    const query = `SELECT * FROM posts WHERE username = ? ORDER BY created_at DESC`;
    return new Promise((resolve, reject) => {
        db.all(query, [username], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

const likePost = (likeData) => {
    const { post_id, username } = likeData;
    const query = `INSERT INTO likes (post_id, username) VALUES (?, ?)`;
    return new Promise((resolve, reject) => {
        db.run(query, [post_id, username], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

const commentPost = (commentData) => {
    const { post_id, username, comment } = commentData;
    const query = `INSERT INTO comments (post_id, username, comment) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.run(query, [post_id, username, comment], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

const getPostLikes = (post_id) => {
    const query = `SELECT * FROM likes WHERE post_id = ? ORDER BY created_at DESC`;
    return new Promise((resolve, reject) => {
        db.all(query, [post_id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

const getPostComments = (post_id) => {
    const query = `SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC`;
    return new Promise((resolve, reject) => {
        db.all(query, [post_id], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

module.exports = { createPost, getUserPosts, likePost, commentPost, getPostLikes, getPostComments };