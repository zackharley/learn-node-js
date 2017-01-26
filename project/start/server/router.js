const path = require('path');
const express = require('express');

// Get routes
const apiWeatherGet = require('./controllers/api-weather-get');
const apiCitiesPost = require('./controllers/api-cities-post');
const apiCitiesDelete = require('./controllers/api-cities-delete');

const router = express.Router();

router.get('/api/weather', apiWeatherGet);
router.post('/api/cities', apiCitiesPost);
router.delete('/api/cities', apiCitiesDelete);

module.exports = router;
