const path = require("path")
const { fetchAll, fetch } = require('../../libs/postgres')
const { GET_GAMES } = require("./query")

const getGames = async (message) => {	
    try {
        let users = await fetchAll(GET_GAMES)
        return users
    } catch (error) {
        res.status(200).send(error || 'something went wrong');
    }
}

module.exports = {
    getGames
}