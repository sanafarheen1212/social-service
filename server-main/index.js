const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;
if (!mongoUri) {
  console.error('MongoDB connection string is not defined. Check your .env file.');
  process.exit(1);
}
// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGO_URI, {
 
}).then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define Mongoose schemas and models
const volunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  date: String,
  description: String,
  books: String
});

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);
const Event = mongoose.model('Event', eventSchema);

const supportSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Support = mongoose.model('Support', supportSchema);

const port = 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/support', async (req, res) => {
  try {
    const newSupportMessage = new Support(req.body);
    await newSupportMessage.save();
    res.status(200).send('Message received!');
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Add Event
app.post("/addEvent", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    const result = await newEvent.save();
    res.send(result);
  } catch (error) {
    res.status(500).send("Error adding event");
  }
});

// Get Search Events
app.get("/searchEvent", async (req, res) => {
  try {
    const result = await Event.find({
      title: { $regex: req.query.search, $options: 'i' }
    });
    res.send(result);
  } catch (error) {
    res.status(500).send("Error searching events");
  }
});

// Add Volunteer
app.post("/addVolunteer", async (req, res) => {
  try {
    const newVolunteer = new Volunteer(req.body);
    const result = await newVolunteer.save();
    res.send(result);
  } catch (error) {
    res.status(500).send("Error adding volunteer");
  }
});

// Get All Volunteers
app.get("/allVolunteer", async (req, res) => {
  try {
    const result = await Volunteer.find({});
    res.send(result);
  } catch (error) {
    res.status(500).send("Error fetching volunteers");
  }
});

// Get All Events
app.get("/allEvents", async (req, res) => {
  try {
    const result = await Event.find({});
    res.send(result);
  } catch (error) {
    res.status(500).send("Error fetching events");
  }
});

// Delete Event
app.delete("/deleteEvent/:id", async (req, res) => {
  try {
    const result = await Event.deleteOne({ _id: req.params.id });
    res.send(result);
  } catch (error) {
    res.status(500).send("Error deleting event");
  }
});

// Get My Events
app.get("/myEvents/:email", async (req, res) => {
  try {
    const result = await Event.find({ email: req.params.email });
    res.send(result);
  } catch (error) {
    res.status(500).send("Error fetching my events");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
