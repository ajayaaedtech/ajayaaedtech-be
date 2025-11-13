const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // This is how course name auto-fetches
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "completed", "blocked"],
      default: "active",
    },
    progress: {
      type: Number,
      default: 0,
    },
    lastAccessedUnit: {
      type: String,
      default: null,
    },
    lastAccessedChapter: {
      type: String,
      default: null,
    },
    enrolledAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false } // no need for separate _id for each enrollment
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
    phone: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "https://www.ajayaaedtech.com/_next/image?url=%2Fb.png&w=128&q=75",
    },
    role: {
      type: String,
      enum: ["student", "instructor", "admin", "organization"],
      default: "student",
    },
    status: {
      type: String,
      enum: ["active", "blocked", "pending"],
      default: "active",
    },
    totalProgress: {
      type: Number,
      default: 0,
    },
    enrollments: [enrollmentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
