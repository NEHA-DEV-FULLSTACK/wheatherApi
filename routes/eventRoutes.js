const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { validateCreateEvent } = require("../middlewares/eventValidator");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.get("/", auth, getEvents);
router.get("/:id", auth, getEventById);
router.post("/", auth, validateCreateEvent, createEvent);
router.put("/:id", auth, validateCreateEvent, updateEvent);
router.delete("/:id", auth, deleteEvent);

module.exports = router;
