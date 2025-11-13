const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema(
  {
    chapterId: { type: String, required: true },
    title: { type: String, required: true },
    videoUrl: { type: String },
    order: { type: Number, default: 1 },
    duration: { type: String },
    isFree: { type: Boolean, default: false },
  },
  { _id: false }
);

const unitSchema = new mongoose.Schema(
  {
    unitId: { type: String, required: true },
    title: { type: String, required: true },
    order: { type: Number, default: 1 },
    chapters: [chapterSchema],
  },
  { _id: false }
);

const courseSchema = new mongoose.Schema(
  {
    courseId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    slug: { type: String, required: true },
    duration: { type: String },
    overview: { type: String },
    price: { type: Number, default: 0 },
    language: { type: String, default: "English" },
    tags: [String],
    order: { type: Number },
    units: [unitSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
