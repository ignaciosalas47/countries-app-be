import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import countryRoutes from './routes/countries.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/countries', countryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
