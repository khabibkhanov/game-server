const path = require("path")
const { fetchAll, fetch } = require('../../libs/postgres')
const { GET_GAMES, CREATE_GAME, CATEGORIES, AGE_RATING } = require("./query")

const getGames = async () => {	
    try {
        let users = await fetchAll(GET_GAMES)
        console.log(users);
        return users
    } catch (error) {
        console.error(error);
        return error || 'something went wrong'
    }
}

const postNewGame = async ({game_title, game_slug, game_info, game_release, purchase_info, game_picture_url, cat_id, rating_id}) => {
    try {
        const categories = await fetch(CATEGORIES, cat_id)
        const age_rating = await fetch(AGE_RATING, rating_id)
        if (categories && age_rating) {
            const set = await fetch( CREATE_GAME, game_title, game_slug, game_info, game_release, purchase_info, game_picture_url, rating_id, cat_id )
            return set
        } else {
            throw "category or age rating is not defined"
        }
    } catch (error) {
        return error
    }
}

const updateGame = async ({game_title, game_slug, game_info, game_release, purchase_info, game_picture_url, cat_id, rating_id, game_id}) => {
    try {
        
    } catch (error) {
        
    }
}

module.exports = {
    getGames,
    postNewGame
}