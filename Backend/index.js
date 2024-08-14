const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const roomsRouter = require('./routes/rooms');
const studentsRouter = require('./routes/students');

app.use('/rooms', roomsRouter);
app.use('/students', studentsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
