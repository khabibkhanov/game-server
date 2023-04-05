// Import the necessary modules
const router = require('express').Router()
const { GET, POST, UPDATE, DELETE } = require('./controller.js')

// Define the route and method for handling POST requests to '/api/login'
router.route('/api/news')
	.get( GET )

router.route('/api/news')
	.post( POST )

router.route('/api/news')
	.put( UPDATE )

router.route('/api/news')
	.delete( DELETE )

// Export the router to be used by other modules
module.exports = router