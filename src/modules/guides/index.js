// Import the necessary modules
const router = require('express').Router()
const { GET, POST } = require('./controller.js')

// Define the route and method for handling POST requests to '/api/login'
router.route('/api/guides')
	.get( GET )

router.route('/api/guides')
	.post( POST )

// router.route('/api/games')
// 	.put( UPDATE )

// router.route('/api/games')
// 	.delete( DELETE )

// Export the router to be used by other modules
module.exports = router