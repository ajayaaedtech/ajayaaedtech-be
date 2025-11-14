const mongoose = require("mongoose");

const customerSupportSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    courseType: { type: String, default: "" },
    message: { type: String, default: "" },

    status: {
      type: String,
      enum: ["pending", "processing", "resolved"],
      default: "pending"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CustomerSupport", customerSupportSchema);
