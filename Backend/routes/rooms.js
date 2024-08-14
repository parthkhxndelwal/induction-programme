const express = require('express');
const fs = require('fs');
const router = express.Router();
const roomsFilePath = './data/rooms.json';

// Helper function to read JSON file
const readRooms = () => {
    const data = fs.readFileSync(roomsFilePath);
    return JSON.parse(data);
};

// Helper function to write JSON file
const writeRooms = (rooms) => {
    fs.writeFileSync(roomsFilePath, JSON.stringify(rooms, null, 2));
};

// Create a new room
router.post('/', (req, res) => {
    const { block, floor, roomName, capacity } = req.body;
    const rooms = readRooms();
    const newRoom = { block, floor, roomName, capacity, students: [] };
    rooms.push(newRoom);
    writeRooms(rooms);
    res.status(201).json(newRoom);
});

// Get all rooms
router.get('/', (req, res) => {
    const rooms = readRooms();
    res.json(rooms);
});

// Update a room
router.put('/:roomName', (req, res) => {
    const { roomName } = req.params;
    const { block, floor, capacity } = req.body;
    const rooms = readRooms();
    const roomIndex = rooms.findIndex(room => room.roomName === roomName);

    if (roomIndex !== -1) {
        rooms[roomIndex] = { ...rooms[roomIndex], block, floor, capacity };
        writeRooms(rooms);
        res.json(rooms[roomIndex]);
    } else {
        res.status(404).json({ error: 'Room not found' });
    }
});

// Delete a room
router.delete('/:roomName', (req, res) => {
    const { roomName } = req.params;
    const rooms = readRooms();
    const newRooms = rooms.filter(room => room.roomName !== roomName);

    if (rooms.length === newRooms.length) {
        return res.status(404).json({ error: 'Room not found' });
    }

    writeRooms(newRooms);
    res.json({ message: 'Room deleted successfully' });
});

module.exports = router;
