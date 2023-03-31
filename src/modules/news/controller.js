// Define the POST request handler function
const POST = async (req, res) => {	
    try {
        res.send('gekki')
    // If an error occurs, send a 200 status code and the error message to the user
    } catch (error) {
        res.status(200).send(error || 'something went wrong');
    }
}

// Export the POST request handler function
module.exports = {
    POST
}