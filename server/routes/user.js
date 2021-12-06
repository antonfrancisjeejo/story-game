const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const authenticate = require("../middlewares/authenticate");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require("dotenv").config();

router.post("/signup", async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    res.json({ token });
  } catch (error) {
    res.json({ msg: "Email already exists" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.type === "email") {
        if (user.password === req.body.password) {
          const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
          return res.json({ token });
        } else {
          return res.status(400).json({ msg: "Wrong password" });
        }
      } else {
        return res.status(400).json({
          msg: "This email is associated with a gmail account.",
        });
      }
    } else {
      return res.status(400).json({
        msg: "No account found.",
      });
    }
  } catch (error) {
    res.json({ msg: "Email already exists" });
  }
});

router.post("/v1/auth/google/:type", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    const user = {
      email,
      name,
      type: "gmail",
    };

    if (req.params.type === "signup") {
      const dbUser = await User.create(user);
      const jwtToken = jwt.sign({ id: dbUser._id }, process.env.SECRET_KEY);
      return res.json({ token: jwtToken });
    }
    const dbUser = await User.findOne({ email: user.email });
    const jwtToken = jwt.sign({ id: dbUser._id }, process.env.SECRET_KEY);
    return res.json({ token: jwtToken });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

router.get("/get/user/data", authenticate, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.userId }).select(
      "-createdAt -updatedAt -password -__v"
    );
    res.status(200).send({ success: true, user: user });
  } catch (err) {
    console.log(err);
    res.status(401).send({ success: false, message: err.message });
  }
});

router.get("/stories", authenticate, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.userId }).populate(
      "storiesCreated storiesPlayed",
      ["title"]
    );
    res.status(200).send({ success: true, user: user });
  } catch (error) {
    console.log(error);
    res.status(401).send({ success: false, message: err.message });
  }
});

module.exports = router;
