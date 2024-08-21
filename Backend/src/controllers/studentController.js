const Student = require('../models/student');
const Room = require('../models/room');

exports.getStudentByAdmissionID = async (req, res) => {
  try {
    const student = await Student.findOne({ admissionID: req.params.admissionID }).populate('room');
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.createStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ admissionID: req.params.admissionID });
    if (!student) return res.status(404).send('Student not found');
    res.status(200).send('Student deleted');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { admissionID: req.body.admissionID },
      req.body,
      { new: true }
    );
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.assignRoom = async (req, res) => {
  try {
    const { roomID, admissionIDs } = req.body;
    const room = await Room.findOne({ roomID });

    if (!room) return res.status(404).send('Room not found');
    if (room.students.length + admissionIDs.length > room.capacity) {
      return res.status(400).send('Room capacity exceeded');
    }

    const students = await Student.find({ admissionID: { $in: admissionIDs } });
    students.forEach(student => {
      student.room = room._id;
      room.students.push(student._id);
    });

    await Promise.all(students.map(student => student.save()));
    await room.save();

    res.status(200).json(room);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getRoomByAdmissionID = async (req, res) => {
  try {
    const student = await Student.findOne({ admissionID: req.params.admissionID }).populate('room');
    if (!student || !student.room) return res.status(404).send('Room not found');
    res.json(student.room);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.getAllStudentsByRoomID = async (req, res) => {
  try {
    const room = await Room.findOne({ roomID: req.params.roomID }).populate('students');
    if (!room) return res.status(404).send('Room not found');
    res.json(room.students);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

exports.bulkUploadStudents = async (req, res) => {
  try {
    const studentsData = req.body; // Expecting an array of { admissionID, name }

    if (!Array.isArray(studentsData)) {
      return res
        .status(400)
        .send("Invalid data format. Expecting an array of students.");
    }

    const students = studentsData.map((student) => ({
      admissionID: student.admissionID,
      name: student.name,
      room: null, // Assign room as null by default
    }));

    const result = await Student.insertMany(students, { ordered: false });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
