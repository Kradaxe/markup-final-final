const mongoose = require("mongoose");

const workspaceSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    editors: {
      type: [String],
    },
    images: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workspace", workspaceSchema);
