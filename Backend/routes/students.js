const express = require('express');
const fs = require('fs');
const router = express.Router();
const roomsFilePath = './data/rooms.json';
const studentsFilePath = './data/students.json';

// Helper function to read JSON files
const readRooms = () => {
    const data = fs.readFileSync(roomsFilePath);
    return JSON.parse(data);
};

const readStudents = () => {
    const data = fs.readFileSync(studentsFilePath);
    return JSON.parse(data);
};

// Helper function to write JSON files
const writeRooms = (rooms) => {
    fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));
};

const writeStudents = (students) => {
    fs.writeFileSync(studentsFilePath, JSON.stringify(students, null, 2));
};

// Add a new student
router.post('/', (req, res) => {
    const { admissionId, name } = req.body;
    const students = readStudents();

    // Check if the student already exists
    const existingStudent = students.find(student => student.admissionId === admissionId);
    if (existingStudent) {
        return res.status(400).json({ error: 'Student already exists' });
    }

    const newStudent = {
        admissionId,
        name,
        assignedRoom: null,
        assignedFloor: null,
        assignedBlock: null
    };

    students.push(newStudent);
    writeStudents(students);
    res.status(201).json(newStudent);
});

// Get all students or a particular student by ID
router.get('/:admissionId?', (req, res) => {
    const students = readStudents();
    const { admissionId } = req.params;

    if (admissionId) {
        const student = students.find(student => student.admissionId === admissionId);
        if (student) {
            res.json(student);
        } else {
            res.status(404).json({ error: 'Student not found' });
        }
    } else {
        res.json(students);
    }
});

// Update a student's information
router.put('/:admissionId', (req, res) => {
    const { admissionId } = req.params;
    const { name } = req.body;
    const students = readStudents();
    const studentIndex = students.findIndex(student => student.admissionId === admissionId);

    if (studentIndex !== -1) {
        students[studentIndex].name = name || students[studentIndex].name;
        writeStudents(students);
        res.json(students[studentIndex]);
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// Delete a student
router.delete('/:admissionId', (req, res) => {
    const { admissionId } = req.params;
    const students = readStudents();
    const studentIndex = students.findIndex(student => student.admissionId === admissionId);

    if (studentIndex !== -1) {
        const student = students.splice(studentIndex, 1)[0];

        // Also remove student from any room assignment
        const rooms = readRooms();
        rooms.forEach(room => {
            room.students = room.students.filter(id => id !== admissionId);
        });

        writeRooms(rooms);
        writeStudents(students);
        res.json({ message: 'Student deleted successfully', student });
    } else {
        res.status(404).json({ error: 'Student not found' });
    }
});

// Assign students to a room
router.post('/assign', (req, res) => {
    const { roomName, admissionIds } = req.body;
    const rooms = readRooms();
    const room = rooms.find(room => room.roomName === roomName);

    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    }

    const students = readStudents();
    const admissionIdArray = admissionIds.split(',').map(id => id.trim());

    admissionIdArray.forEach(id => {
        const studentIndex = students.findIndex(student => student.admissionId === id);
        if (studentIndex !== -1) {
            students[studentIndex].assignedRoom = roomName;
            students[studentIndex].assignedFloor = room.floor;
            students[studentIndex].assignedBlock = room.block;
            room.students.push(id);
        }
    });

    writeRooms(rooms);
    writeStudents(students);
    res.json(room);
});

// Edit assigned students
router.put('/edit/:roomName', (req, res) => {
    const { roomName } = req.params;
    const { admissionIds } = req.body;
    const rooms = readRooms();
    const room = rooms.find(room => room.roomName === roomName);

    if (!room) {
        return res.status(404).json({ error: 'Room not found' });
    }

    const students = readStudents();
    const admissionIdArray = admissionIds.split(',').map(id => id.trim());

    // Clear previous assignments
    room.students.forEach(id => {
        const studentIndex = students.findIndex(student => student.admissionId === id);
        if (studentIndex !== -1) {
            students[studentIndex].assignedRoom = null;
            students[studentIndex].assignedFloor = null;
            students[studentIndex].assignedBlock = null;
        }
    });

    // Assign new students
    room.students = admissionIdArray;

    admissionIdArray.forEach(id => {
        const studentIndex = students.findIndex(student => student.admissionId === id);
        if (studentIndex !== -1) {
            students[studentIndex].assignedRoom = roomName;
            students[studentIndex].assignedFloor = room.floor;
            students[studentIndex].assignedBlock = room.block;
        }
    });

    writeRooms(rooms);
    writeStudents(students);
    res.json(room);
});

module.exports = router;
