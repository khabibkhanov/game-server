const path = require('path')

const gamesModules = require(path.join(__dirname, 'games'))
const newsModules = require(path.join(__dirname, 'news'))
const guidesModules = require(path.join(__dirname, 'guides'))
module.exports = [
    gamesModules,
    newsModules,
    guidesModules
]