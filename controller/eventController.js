const Event = require('../models/eventModel');
const API_KEY = process.env.API_KEY;

const getApiEvents = async (req, res) => {
    try {
        const data = await Event.find({ isDeleted: false });
        return res.status(200).send(data);
    } catch (error) {
        console.log(error)
        return res.status(500).send('internal server error')
    }

}

const getApiEventById = async (req, res) => {
    try {
        const id = req.params.id;
        console.log("id",id);
        const data = await Event.findById(id);
        return res.status(200).send(data);
    } catch (error) {
        console.log(error)
        return res.status(500).send('internal server error')
    }

}

const createApiEvent = async (req, res) => {
    const lat = req.body.latitude;
    const lon = req.body.longitude;
    console.log("body data",lat ,lon);
   const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`

    try {
        const weatherData = await fetch(url).then((res) => res.json());
        const eventData = {
            ...req.body,
            eventData: weatherData,
            isDeleted: false
        }
        const data = new Event(eventData);
        await data.save();
        return res.status(201).send(data);
    } catch (error) {
        console.log(error)
        return res.status(500).send('internal server error')
    }
}

const updateApiEvent = async (req, res) => {
    const lat = req.body.lat;
    const lon = req.body.lon;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    try {
        const weatherData = await fetch(url).then((res) => res.json());
        const updatedData = {
            ...req.body,
            eventData: weatherData
        }
        await Event.updateOne({
            _id: req.params.id
        }, {
            $set: updatedData
        }
        )
        res.status(200).send("whether event Updated")
    } catch (error) {
        return res.status(500).send('Internal Server error')
    }
    return res.status(201).send('event updated');
}

const deleteApiEvent = async (req, res) => {
    try {
        await Event.updateOne({ _id: req.params.id }, {
            $set: { isDeleted: true }
        });
        return res.status(200).send("event is deleted");
    } catch (error) {
        console.log(error)
        return res.status(500).send('internal server error')
    }
}


module.exports = { createApiEvent, getApiEvents, updateApiEvent, deleteApiEvent, getApiEventById }