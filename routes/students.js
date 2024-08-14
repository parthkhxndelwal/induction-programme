const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// Endpoint to add a new student
app.post('/students', (req, res) => {
    const { admissionId, name } = req.body;

    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read students data.' });

        let students = JSON.parse(data);

        // Check if the student already exists
        if (students.some(student => student.admissionId === admissionId)) {
            return res.status(400).json({ error: 'Student already exists.' });
        }

        const newStudent = {
            admissionId,
            name,
            assignedRoom: null,
            assignedFloor: null,
            assignedBlock: null
        };

        students.push(newStudent);

        fs.writeFile('./data/students.json', JSON.stringify(students, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Failed to save student data.' });

            res.status(201).json(newStudent);
        });
    });
});

// Endpoint to get all students or a specific student by ID
app.get('/students/:admissionId?', (req, res) => {
    const { admissionId } = req.params;

    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read students data.' });

        let students = JSON.parse(data);

        if (admissionId) {
            const student = students.find(s => s.admissionId === admissionId);
            if (!student) return res.status(404).json({ error: 'Student not found.' });

            return res.status(200).json(student);
        }

        res.status(200).json(students);
    });
});

// Endpoint to update a student's information
app.put('/students/:admissionId', (req, res) => {
    const { admissionId } = req.params;
    const { name } = req.body;

    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read students data.' });

        let students = JSON.parse(data);
        const studentIndex = students.findIndex(s => s.admissionId === admissionId);

        if (studentIndex === -1) return res.status(404).json({ error: 'Student not found.' });

        students[studentIndex] = {
            ...students[studentIndex],
            name: name || students[studentIndex].name
        };

        fs.writeFile('./data/students.json', JSON.stringify(students, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Failed to update student data.' });

            res.status(200).json(students[studentIndex]);
        });
    });
});

// Endpoint to delete a student
app.delete('/students/:admissionId', (req, res) => {
    const { admissionId } = req.params;

    fs.readFile('./data/students.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read students data.' });

        let students = JSON.parse(data);
        const studentIndex = students.findIndex(s => s.admissionId === admissionId);

        if (studentIndex === -1) return res.status(404).json({ error: 'Student not found.' });

        const deletedStudent = students.splice(studentIndex, 1)[0];

        fs.writeFile('./data/students.json', JSON.stringify(students, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Failed to delete student data.' });

            res.status(200).json({
                message: 'Student deleted successfully',
                student: deletedStudent
            });
        });
    });
});

module.exports = app;
