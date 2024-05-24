const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/newDB.sqlite');

db.run(`CREATE TABLE IF NOT EXISTS friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_username TEXT,
    friend_username TEXT,
    status TEXT,
    FOREIGN KEY(user_username) REFERENCES users(username),
    FOREIGN KEY(friend_username) REFERENCES users(username)
)`);

const sendFriendRequest = (userUsername, friendUsername) => {
    const query = `INSERT INTO friends (user_username, friend_username, status) VALUES (?, ?, ?)`;
    return new Promise((resolve, reject) => {
        db.run(query, [userUsername, friendUsername, 'pending'], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve(this.lastID);
        });
    });
};

const acceptFriendRequest = (requestId) => {
    const query = `UPDATE friends SET status = 'accepted' WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.run(query, [requestId], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

const rejectFriendRequest = (requestId) => {
    const query = `UPDATE friends SET status = 'rejected' WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.run(query, [requestId], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

const getAllFriends = (username) => {
    const query = `SELECT friend_username FROM friends WHERE user_username = ? AND status = 'accepted'
                   UNION
                   SELECT user_username FROM friends WHERE friend_username = ? AND status = 'accepted'`;
    return new Promise((resolve, reject) => {
        db.all(query, [username, username], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(rows);
        });
    });
};

const checkExistingRequest = (userUsername, friendUsername) => {
    const query = `SELECT * FROM friends 
                   WHERE ((user_username = ? AND friend_username = ?) 
                          OR (user_username = ? AND friend_username = ?))
                          AND status != 'rejected'`;
    return new Promise((resolve, reject) => {
        db.get(query, [userUsername, friendUsername, friendUsername, userUsername], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row);
        });
    });
};

module.exports = { sendFriendRequest, acceptFriendRequest, rejectFriendRequest, getAllFriends, checkExistingRequest };