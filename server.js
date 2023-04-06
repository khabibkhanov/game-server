const express = require('express')
const path = require('path')
const app = express()
const port = 2233

// Use the built-in Express middleware for parsing JSON data
app.use(express.json());

// Set CORS headers to allow cross-origin requests from any origin and any headers
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', '*')
	next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Load external modules for handling various routes and functionality
const modules = require(path.join(__dirname, 'src', 'modules'))
app.use(modules)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})