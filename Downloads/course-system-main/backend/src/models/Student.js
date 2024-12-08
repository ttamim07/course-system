const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for password hashing

// Define the schema for the student
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  // Add any other fields you may need, such as courses enrolled, etc.
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
    },
  ],
});

// Hash the password before saving the student
studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords (for login)
studentSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Create the model based on the schema
const Student = mongoose.model('student', studentSchema);

module.exports = Student;
