const express = require('express');
const router = express.Router();
const { getAvailableCountries, getCountryInfo } = require('../controllers/countryController');

// GET /api/countries
router.get('/', getAvailableCountries);

// GET /api/countries/:code
router.get('/:code', getCountryInfo);

module.exports = router;
