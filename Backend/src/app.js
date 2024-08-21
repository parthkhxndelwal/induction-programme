const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package
const roomRoutes = require("./routes/roomRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Use CORS middleware
app.use(cors());

app.use(express.json());

app.use("/rooms", roomRoutes);
app.use("/students", studentRoutes);

mongoose.connect(
  "mongodb+srv://parthkhandelwal:parth341$@roommanagement.r71zw69.mongodb.net/?retryWrites=true&w=majority&appName=RoomManagement",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
