// Import the necessary modules
const router = require('express').Router()
const { GET, POST } = require('./controller.js')

// Define the route and method for handling POST requests to '/api/login'
router.route('/api/games')
	.get( GET )
	.post( POST )

// Export the router to be used by other modules
module.exports = router