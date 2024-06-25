const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/newDB.sqlite');

function generateUniqueId() {
    return new Promise(async (resolve, reject) => {
        let id;
        let exists = true;
        while (exists) {
            const max = 999999999;
            const min = 100000000;
            id = Math.floor(Math.random() * (max - min + 1)) + min;
            exists = await checkIdExists(id);
        }
        resolve(id);
    });
}

function checkIdExists(id) {
    const query = 'SELECT COUNT(*) AS count FROM users WHERE user_id = ?';
    return new Promise((resolve, reject) => {
        db.get(query, [id], (err, row) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(row.count > 0);
        });
    });
}

module.exports = { generateUniqueId };