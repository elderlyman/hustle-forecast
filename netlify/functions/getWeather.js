import axios from 'axios';

const openWeatherApiKey = process.env.REACT_APP_OPENWEATHER_API_KEY || 'default_open_weather_api_key';

exports.handler = async (event, context) => {
    const lat = event.queryStringParameters.lat;
    const lon = event.queryStringParameters.lon;
    const exclude = event.queryStringParameters.exclude;
    const units = event.queryStringParameters.units;

    if (!lat || !lon || !exclude || !units) {
        throw new Error(
            'Missing required parameters.' +
            ` lat: ${lat}, lon: ${lon}, exclude: ${exclude}, units: ${units}`
        );
    }

    try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/onecall`;
        const params = {
            lat,
            lon,
            exclude,
            units,
            appid: openWeatherApiKey,
        };

        const response = await axios.get(apiUrl, { params });

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(response.data),
        };
    } catch (error) {
        console.error('Error:', error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
