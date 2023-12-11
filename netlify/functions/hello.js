// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2

exports.handler = async (event) => {
  try {
    // const subject = event.queryStringParameters.name || 'World'
    //get message from .env file
    const message = process.env.REACT_APP_TEST_FUNCTION_MESSAGE || 'no special message';
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: `Hello ${message}` }),
      // // more keys you can return:
      // headers: { "headerName": "headerValue", ... },
      // isBase64Encoded: true,
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

