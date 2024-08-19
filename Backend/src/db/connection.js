const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://parthkhandelwal:parth341$@roommanagement.r71zw69.mongodb.net/?retryWrites=true&w=majority&appName=RoomManagement',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));
