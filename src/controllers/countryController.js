// backend/src/controllers/countryController.js
const axios = require('axios');

const NAGER_API_URL = process.env.NAGER_API_URL;
const COUNTRIES_API_URL = process.env.COUNTRIES_API_URL;

// Get available countries
const getAvailableCountries = async (req, res) => {
  try {
    const response = await axios.get(`${NAGER_API_URL}/AvailableCountries`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch available countries' });
  }
};

// Get country info by country code
const getCountryInfo = async (req, res) => {
  const countryCode = req.params.code;
  console.log(req.params)
  
  try {
    // Get border countries from Nager API
    const countryResponse = await axios.get(`${NAGER_API_URL}/CountryInfo/${countryCode}`);
    console.log(countryResponse)
    const borderCountries = countryResponse.data.borders;

    // Get population data from Countries Now API
    const populationResponse = await axios.post(`${COUNTRIES_API_URL}/countries/population`, {
      country: countryResponse.data.commonName
    });
    const populationData = populationResponse.data.data.populationCounts;

    // Get flag URL
    const flagResponse = await axios.post(`${COUNTRIES_API_URL}/countries/flag/images`, {
      country: countryResponse.data.commonName
    });
    const flagUrl = flagResponse.data.data.flag;

    // Respond with combined data
    res.json({
      name: countryResponse.data.name,
      borders: borderCountries,
      populationData: populationData,
      flagUrl: flagUrl,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country info' });
  }
};

module.exports = {
  getAvailableCountries,
  getCountryInfo
};
