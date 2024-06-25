const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const redisClient = require("../db/redis");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images");
  },
  filename: (req, file, cb) => {
    const randomName = crypto.randomBytes(16).toString("hex");
    cb(null, `${randomName}.jpeg`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: Images Only!");
    }
  },
});

const authorize = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(403).send("Token is required");
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const isTokenActive = await redisClient.get(token);
    if (!isTokenActive) {
      console.log("Token is invalid or user logged out");
      return res.status(403).send("Invalid token");
    }

    req.user = { user_id: decoded.user_id };
    next();
  } catch (error) {
    console.error("Error in Authorize Middleware: ", error);
    return res.status(403).send("Invalid token");
  }
};

module.exports = { extractUserId, upload, authorize };
