const jwt = require("jsonwebtoken");
const path = require("path");
const bcrypt = require("bcrypt");
const {
  createUser,
  getUser,
  updateUserJwt,
  verifyUserEmail,
  updateUserDetails,
} = require("../models/auth");
const { sendVerificationEmail, sendWelcomeEmail } = require("../utils/mailer");
const validator = require("validator");
const { generateUniqueId } = require("../utils/uniqueId");
const redisClient = require("../db/redis");

const generateJwtToken = async (user_id) => {
  return jwt.sign({ user_id }, process.env.SECRET_KEY, { expiresIn: "10h" });
};

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user_id = await generateUniqueId();

    const existingUser = await getUser(username);
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username taken. Try a different username" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    const existingEmail = await getUser(email);
    if (existingEmail) {
      return res.status(400).json({
        error: "Email is already linked to a different ConnectaLive account.",
      });
    }

    const verificationToken = await generateJwtToken(user_id);
    await sendVerificationEmail(email, verificationToken);

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser({
      user_id,
      username,
      email,
      password: hashedPassword,
      jwt_Token: verificationToken,
    });

    res.status(201).json({
      message: "User created successfully. Please verify your email.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await getUser(decoded.user_id);

    await verifyUserEmail(user.user_id);
    await sendWelcomeEmail(user.email);

    res.json({
      message: "Email verified successfully. Welcome to ConnectaLive!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Invalid or expired token" });
  }
};

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await getUser(identifier);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!user.verify_email) {
      return res.status(401).json({ error: "Please verify your email first" });
    }

    const jwtToken = await generateJwtToken(user.username);
    await updateUserJwt(user.user_id, jwtToken);

    try {
      await redisClient.set(jwtToken, user.username, { EX: 36000 });
    } catch (err) {
      return res.status(500).send("Error storing token");
    }
    if (!user.name || !user.dob || !user.phone) {
      res.json({ message: "Complete your profile", token: jwtToken });
    }
    res.json({ jwtToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const completeProfile = async (req, res) => {
  try {
    const { user_id } = req.user;
    const { phone, bio, name, dob } = req.body;
    const profile_pic = req.file
      ? path.join("/uploads/images", req.file.filename)
      : null;

    if (!validator.isMobilePhone(phone.toString())) {
      return res.status(400).json({ error: "Invalid phone number" });
    }

    if (!validator.isDate(dob)) {
      return res
        .status(400)
        .json({ error: "Invalid date of birth. Use this format YYYY/MM/DD" });
    }

    await updateUserDetails({ user_id, phone, profile_pic, bio, name, dob });
    res.json({ message: "Profile completed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const logout = async (req, res) => {
  try {
    const { username } = req.user;
    await updateUserJwt(username, null);
    res.json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { signup, verifyEmail, login, completeProfile, logout };
