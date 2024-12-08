// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  duration: { type: String },
  instructor: { type: String },
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
