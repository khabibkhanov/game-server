const { getGames } = require("./model");

// Define the POST request handler function
const GET = async (req, res) => {	
  try {
    const model = await getGames('smtha')

  // If an error occurs, send a 200 status code and the error message to the user
  } catch (error) {
    res.status(200).send(error || 'something went wrong');
  }
}

const POST = async (req, res) => {	
  try {
    const model = await getGames('smtha')
    res.send(model)
  // If an error occurs, send a 200 status code and the error message to the user
  } catch (error) {
    res.status(200).send(error || 'something went wrong');
  }
}

// Export the POST request handler function
module.exports = {
  GET,
  POST
}