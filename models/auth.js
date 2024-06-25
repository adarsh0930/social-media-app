const sqlite3 = require("sqlite3").verbose();
const db = require("../db/schema");

const createUser = (userData) => {
  const { user_id, username, email, password, jwt_token } = userData;
  const query = `INSERT INTO users (user_id, username, email, password, jwt_token) VALUES (?, ?, ?, ?, ?)`;
  console.log(userData);
  return new Promise((resolve, reject) => {
    db.run(
      query,
      [user_id, username, email, password, jwt_token],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve(this.lastID);
      }
    );
  });
};

const updateUserDetails = (userData) => {
  const { user_id, phone, profile_pic, bio, name, dob } = userData;
  console.log(profile_pic);
  const query = `UPDATE users SET phone = ?, profile_pic = ?, bio = ?, name = ?, dob = ? WHERE username = ?`;
  return new Promise((resolve, reject) => {
    db.run(
      query,
      [phone, profile_pic, bio, name, dob, user_id],
      function (err) {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      }
    );
  });
};

const getUser = (identifier) => {
  const query = `SELECT * FROM users WHERE user_id = ? OR username = ? OR email = ? OR phone = ?`;
  return new Promise((resolve, reject) => {
    db.get(
      query,
      [identifier, identifier, identifier, identifier],
      (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(row);
      }
    );
  });
};

const updateUserJwt = (user_id, jwt_token) => {
  const query = `UPDATE users SET jwt_token = ? WHERE user_id = ?`;
  return new Promise((resolve, reject) => {
    db.run(query, [jwt_token, user_id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const verifyUserEmail = (user_id) => {
  const query = `UPDATE users SET verify_email = 1 WHERE user_id = ?`;
  return new Promise((resolve, reject) => {
    db.run(query, [user_id], function (err) {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
};

const getAllUsers = () => {
  const query = `SELECT * FROM users`;
  return new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(rows);
    });
  });
};

module.exports = {
  createUser,
  updateUserDetails,
  getUser,
  updateUserJwt,
  verifyUserEmail,
  getAllUsers,
};
