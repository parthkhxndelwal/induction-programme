const Room = require('../models/room');
const Student = require('../models/student');

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().populate('students');
    res.json(rooms);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getRoomByRoomID = async (req, res) => {
  try {
    const room = await Room.findOne({ roomID: req.params.roomID }).populate('students');
    if (!room) return res.status(404).send('Room not found');
    res.json(room);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createRoom = async (req, res) => {
  try {
    const newRoom = new Room(req.body);
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ roomID: req.params.roomID });
    if (!room) return res.status(404).send('Room not found');
    res.status(200).send('Room deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findOneAndUpdate(
      { roomID: req.body.roomID },
      req.body,
      { new: true }
    );
    if (!room) return res.status(404).send('Room not found');
    res.json(room);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
