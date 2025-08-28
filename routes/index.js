const express = require('express');
const { validateUser } = require('../middlewares/userValidateor');
const { signpUser, login, logoutUser } = require('../controller/usersController');

const { auth } = require('../middlewares/auth');
const { validateCreateEvent } = require('../middlewares/eventValidator');
const { createApiEvent, getApiEvents, updateApiEvent, deleteApiEvent, getApiEventById} =require('../controller/eventController');
const router = express.Router();

router.get('', (req, res) => {
    res.send("api are running")
})

// user routes
router.post('/user/signup', signpUser)
router.post('/user/login', validateUser, login)
router.post('/logout', logoutUser)

//events api route
router.get('/events',auth, getApiEvents)
router.get('/event/:id',auth,getApiEventById)
router.post('/event', auth,validateCreateEvent, createApiEvent)
router.put('/event/:id', auth,validateCreateEvent, updateApiEvent)
router.delete('/event/:id', auth, deleteApiEvent)



module.exports = { router }