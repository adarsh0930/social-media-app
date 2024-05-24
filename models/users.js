const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/db.sqlite');

const updateBioInDatabase = (userId, bio) => {
    const query = `UPDATE users SET bio = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.run(query, [bio, userId], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

const updateProfilePicInDatabase = (userId, profilePic) => {
    const query = `UPDATE users SET profile_pic = ? WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.run(query, [profilePic, userId], function (err) {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
};

module.exports = { updateBioInDatabase, updateProfilePicInDatabase };
