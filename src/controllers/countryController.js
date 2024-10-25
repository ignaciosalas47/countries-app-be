import axios from 'axios';
import 'dotenv/config';
import process from 'process';
const { get, post } = axios;

const NAGER_API_URL = process.env.NAGER_API_URL;
const COUNTRIES_API_URL = process.env.COUNTRIES_API_URL;

const getAvailableCountries = async (req, res) => {
  try {
    const response = await get(`${NAGER_API_URL}/AvailableCountries`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch available countries' });
    console.log(error);
  }
};

const getCountryInfo = async (req, res) => {
  const countryCode = req.params.code;

  try {
    const countryResponse = await get(
      `${NAGER_API_URL}/CountryInfo/${countryCode}`
    );
    const { borders, ...rest } = countryResponse.data;

    const populationResponse = await post(
      `${COUNTRIES_API_URL}/countries/population`,
      {
        country: countryResponse.data.commonName,
      }
    );
    const populationData =
      populationResponse?.data?.data?.populationCounts || [];

    let flagUrl;
    try {
      const flagResponse = await post(
        `${COUNTRIES_API_URL}/countries/flag/images`,
        {
          country: countryResponse.data.commonName,
        }
      );
      flagUrl = flagResponse?.data?.data?.flag;
    } catch (error) {
      console.log(
        `Flag of country ${countryResponse.data.commonName} not found`
      );
      console.log(error);
    }

    // Respond with combined data
    res.json({
      countryInfo: rest,
      borders,
      populationData: populationData,
      flagUrl,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch country info' });
    console.log(error);
  }
};

export { getAvailableCountries, getCountryInfo };
