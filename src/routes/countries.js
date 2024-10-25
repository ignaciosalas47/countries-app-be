import express from 'express';
import {
  getAvailableCountries,
  getCountryInfo,
} from '../controllers/countryController.js';

const router = express.Router();

// GET /api/countries
router.get('/', getAvailableCountries);

// GET /api/countries/:code
router.get('/:code', getCountryInfo);

export default router;
