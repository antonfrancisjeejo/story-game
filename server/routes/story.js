const router = require("express").Router();
const authenticate = require("../middlewares/authenticate");
const Story = require("../models/Story");
const User = require("../models/User");

router.post("/create", authenticate, async (req, res) => {
  try {
    const story = await Story.create({
      storyId: req.body.id,
      user: req.userId,
    });
    await User.findByIdAndUpdate(
      { _id: req.userId },
      { $push: { storiesCreated: story._id } }
    );
    return res.json({ story });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

router.put("/update/:storyId", authenticate, async (req, res) => {
  try {
    const story = await Story.findOneAndUpdate(
      {
        storyId: req.params.storyId,
      },
      req.body,
      { new: true }
    );
    return res.json({ story });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

router.get("/get/:id", authenticate, async (req, res) => {
  try {
    const story = await Story.findOne({ storyId: req.params.id });
    res.json({ story });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

router.put("/play/:id", authenticate, async (req, res) => {
  try {
    const story = await Story.findOne({ storyId: req.params.id });
    await User.findByIdAndUpdate(
      { _id: req.userId },
      { $push: { storiesPlayed: story._id } }
    );
    console.log("hitting");
    res.json({ story });
  } catch (error) {
    res.json({ msg: error.message });
  }
});

module.exports = router;
