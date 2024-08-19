const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomID: { type: String, unique: true, required: true },
  capacity: { type: Number, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

module.exports = mongoose.model('Room', roomSchema);
