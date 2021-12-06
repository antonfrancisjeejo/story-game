const mongoose = require("mongoose");

const storySchema = new mongoose.Schema(
  {
    storyId: {
      required: true,
      type: String,
    },
    title: {
      type: String,
    },
    story: {
      type: [],
    },
    user: { type: mongoose.Types.ObjectId, ref: "users", required: true },
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model("stories", storySchema);

module.exports = Story;
