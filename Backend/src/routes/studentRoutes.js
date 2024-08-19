const express = require('express');
const 
{
    getStudentByAdmissionID,
    createStudent,
    deleteStudent,
    updateStudent,
    assignRoom,
    getRoomByAdmissionID,
    getAllStudentsByRoomID
} = require('../controllers/studentController');

const router = express.Router();

router.get('/:admissionID', getStudentByAdmissionID);
router.get('/room/:roomID', getAllStudentsByRoomID); 
router.post('/', createStudent);
router.delete('/:admissionID', deleteStudent);
router.put('/', updateStudent);
router.post('/assignRoom', assignRoom);
router.get('/room/:admissionID', getRoomByAdmissionID);

module.exports = router;
