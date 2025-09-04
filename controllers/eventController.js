const Event = require("../models/event");
//const fetch = require("node-fetch"); // npm install node-fetch
const API_KEY = process.env.API_KEY;

// Create Event + Fetch Weather
const createEvent = async (req, res) => {
  try {
    const { title, description, eventDateTime, location, latitude, longitude } =
      req.body;

    // Fetch weather data
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    const weatherData = await fetch(url).then((r) => r.json());

    const event = new Event({
      title,
      description,
      eventDateTime,
      location,
      latitude,
      longitude,
      eventData: weatherData,
      isDeleted: false,
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ isDeleted: false });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single event by ID
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || event.isDeleted)
      return res.status(404).json({ message: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Event
const updateEvent = async (req, res) => {
  try {
    const { title, description, eventDateTime, location, latitude, longitude } =
      req.body;

    // Fetch updated weather data if latitude/longitude changed
    let weatherData = {};
    if (latitude && longitude) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      weatherData = await fetch(url).then((r) => r.json());
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        eventDateTime,
        location,
        latitude,
        longitude,
        ...(Object.keys(weatherData).length && { eventData: weatherData }),
      },
      { new: true, runValidators: true }
    );

    if (!updatedEvent)
      return res.status(404).json({ message: "Event not found" });
    res
      .status(200)
      .json({ message: "Event updated successfully", updatedEvent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Soft Delete Event
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );
    if (!deletedEvent)
      return res.status(404).json({ message: "Event not found" });
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};
