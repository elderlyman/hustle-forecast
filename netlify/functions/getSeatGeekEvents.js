// seatgeekFunction.js
import axios from 'axios';

//get client id from .
//note that this had to also be manually changed in netlify env variable settings because it was not updating automatically
const client_id = process.env.REACT_APP_SEATGEEK_CLIENT_ID || 'default_seatgeek_client_id';

//log client id anywhere
console.log('client_id: ', client_id);

exports.handler = async (event, context) => {
    const eventLocation = event.queryStringParameters['venue.city'];
    const daysFromNow = event.queryStringParameters['datetime_local.lte'];

    if (!eventLocation || !daysFromNow) {
        throw new Error(
            'Missing required parameters.'
            // Show missing parameters in the error message
            + ' eventLocation: ' + eventLocation
            + ' daysFromNow: ' + daysFromNow
        );
    }

    try {
        const response = await axios.get(
            `https://api.seatgeek.com/2/events`,
            {
                params: {
                    'venue.city': eventLocation,
                    'datetime_local.lte': daysFromNow,
                    client_id: client_id,
                    per_page: 1000,
                },
            }
        );

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
