const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());

// Endpoint to create a new room
app.post('/rooms', (req, res) => {
    const { block, floor, roomName, capacity } = req.body;

    fs.readFile('./data/rooms.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read rooms data.' });

        let rooms = JSON.parse(data);

        // Check if the room already exists
        if (rooms.some(room => room.roomName === roomName)) {
            return res.status(400).json({ error: 'Room already exists.' });
        }

        const newRoom = {
            block,
            floor,
            roomName,
            capacity,
            students: []
        };

        rooms.push(newRoom);

        fs.writeFile('./data/rooms.json', JSON.stringify(rooms, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Failed to save room data.' });

            res.status(201).json(newRoom);
        });
    });
});

// Endpoint to get all rooms
app.get('/rooms', (req, res) => {
    fs.readFile('./data/rooms.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read rooms data.' });

        const rooms = JSON.parse(data);
        res.status(200).json(rooms);
    });
});

// Endpoint to update a room
app.put('/rooms/:roomName', (req, res) => {
    const { roomName } = req.params;
    const { block, floor, capacity } = req.body;

    fs.readFile('./data/rooms.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read rooms data.' });

        let rooms = JSON.parse(data);
        const roomIndex = rooms.findIndex(r => r.roomName === roomName);

        if (roomIndex === -1) return res.status(404).json({ error: 'Room not found.' });

        rooms[roomIndex] = {
            ...rooms[roomIndex],
            block: block || rooms[roomIndex].block,
            floor: floor || rooms[roomIndex].floor,
            capacity: capacity || rooms[roomIndex].capacity
        };

        fs.writeFile('./data/rooms.json', JSON.stringify(rooms, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Failed to update room data.' });

            res.status(200).json(rooms[roomIndex]);
        });
    });
});

// Endpoint to delete a room
app.delete('/rooms/:roomName', (req, res) => {
    const { roomName } = req.params;

    fs.readFile('./data/rooms.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to read rooms data.' });

        let rooms = JSON.parse(data);
        const roomIndex = rooms.findIndex(r => r.roomName === roomName);

        if (roomIndex === -1) return res.status(404).json({ error: 'Room not found.' });

        const deletedRoom = rooms.splice(roomIndex, 1)[0];

        fs.writeFile('./data/rooms.json', JSON.stringify(rooms, null, 2), err => {
            if (err) return res.status(500).json({ error: 'Failed to delete room data.' });

            res.status(200).json({
                message: 'Room deleted successfully'
            });
        });
    });
});

// Endpoint to assign students to a room
app.post('/students/assign', (req, res) => {
    const { roomName, admissionIds } = req.body;
    const studentIdsArray = admissionIds.split(',').map(id => id.trim());

    fs.readFile('./data/rooms.json', 'utf8', (err, roomData) => {
        if (err) return res.status(500).json({ error: 'Failed to read rooms data.' });

        let rooms = JSON.parse(roomData);
        const room = rooms.find(r => r.roomName === roomName);

        if (!room) return res.status(404).json({ error: 'Room not found.' });

        // Check if adding these students would exceed the room's capacity
        if (room.students.length + studentIdsArray.length > room.capacity) {
            return res.status(400).json({
                error: `Cannot assign students. The room capacity is ${room.capacity} and would be exceeded by this assignment.`
            });
        }

        fs.readFile('./data/students.json', 'utf8', (err, studentData) => {
            if (err) return res.status(500).json({ error: 'Failed to read students data.' });

            let students = JSON.parse(studentData);

            studentIdsArray.forEach(admissionId => {
                let student = students.find(s => s.admissionId === admissionId);
                if (student) {
                    student.assignedRoom = roomName;
                    student.assignedFloor = room.floor;
                    student.assignedBlock = room.block;
                    room.students.push(admissionId);
                }
            });

            fs.writeFile('./data/students.json', JSON.stringify(students, null, 2), err => {
                if (err) return res.status(500).json({ error: 'Failed to update students data.' });

                fs.writeFile('./data/rooms.json', JSON.stringify(rooms, null, 2), err => {
                    if (err) return res.status(500).json({ error: 'Failed to update room data.' });

                    res.status(200).json(room);
                });
            });
        });
    });
});

module.exports = app;
