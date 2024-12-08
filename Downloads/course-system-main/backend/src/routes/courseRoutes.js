const express = require("express");
const router = express.Router();
const Course = require("../models/Course");  // Import the Course model

// Create a new course
router.post("/api/course", async (req, res) => {
  try {
    const { title, description, duration, instructor } = req.body;
    const newCourse = new Course({
      title,
      description,
      duration,
      instructor,
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all courses
router.get("/api/course", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a course by ID
router.get("/api/course/:id", async (req, res) => {
    try {
      // Convert the id to a valid ObjectId if necessary
      const courseId = mongoose.Types.ObjectId.isValid(req.params.id) 
                        ? req.params.id 
                        : null;
  
      if (!courseId) {
        return res.status(400).json({ message: "Invalid course ID" });
      }
  
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Update a course by ID
router.put("/api/course/:id", async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a course by ID
router.delete("/api/course/:id", async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

