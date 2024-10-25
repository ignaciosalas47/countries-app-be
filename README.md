# Country Info App - Backend

## Installation

1. Clone the repository
2. Go to the backend directory
3. Install dependencies:
    ```bash
    npm install
    ```
4. Set up environment variables in a `.env` file:
    ```
    NAGER_API_URL=https://date.nager.at/api/v3
    COUNTRIES_API_URL=https://countriesnow.space/api/v0.1
    PORT=5000
    ```
5. Start the server:
    ```bash
    node src/app.js
    ```

## Endpoints

- `GET /api/countries`: Retrieves a list of available countries.
- `GET /api/countries/:code`: Retrieves detailed information about a specific country (border countries, population data, flag).
