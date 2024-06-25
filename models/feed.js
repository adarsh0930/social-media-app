const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/newDB.sqlite');

const getFriendsPosts = (userId, since) => {
    const query = `
        SELECT posts.*
        FROM posts
        JOIN friends ON friends.friend_id = posts.user_id
        WHERE friends.user_id = ? AND posts.created_at >= ?
        UNION
        SELECT posts.*
        FROM posts
        JOIN friends ON friends.user_id = posts.user_id
        WHERE friends.friend_id = ? AND posts.created_at >= ?
        ORDER BY created_at DESC
    `;
    return new Promise((resolve, reject) => {
        db.all(query, [userId, since, userId, since], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

module.exports = { getFriendsPosts };