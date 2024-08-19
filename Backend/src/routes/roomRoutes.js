const express = require('express');
const { getRoomByRoomID, createRoom, deleteRoom, updateRoom, getAllRooms } = require('../controllers/roomController');

const router = express.Router();

router.get('/:roomID', getRoomByRoomID);
router.post('/', createRoom);
router.delete('/:roomID', deleteRoom);
router.put('/', updateRoom);
router.get('/', getAllRooms);  

module.exports = router;
