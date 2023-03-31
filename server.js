const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Load external modules for handling various routes and functionality
const modules = require(path.join(__dirname, 'src', 'modules'));
app.use(modules);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})