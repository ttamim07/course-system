const express = require('express');
const Student = require('../models/Student');  // Correct path to your Student model
const router = express.Router();

// POST route to register a student
router.post('/student', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the student already exists
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student already exists' });
    }

    // Create a new student
    const student = new Student({ name, email, password });
    await student.save();

    res.status(201).json({ message: 'Student registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

