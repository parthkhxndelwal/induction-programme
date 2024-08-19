const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  admissionID: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  room: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', default: null }
});

module.exports = mongoose.model('Student', studentSchema);
