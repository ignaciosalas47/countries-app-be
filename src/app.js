require("dotenv").config();
const express = require("express");
const countryRoutes = require("./routes/countries");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());
app.use("/api/countries", countryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
