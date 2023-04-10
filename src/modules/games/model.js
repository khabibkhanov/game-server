const path = require("path")
const { CREATE_REQS, UPDATE_REQS } = require("./query")
const { fetchAll, fetch } = require(path.join(__dirname, "..", "..", "libs", "postgres"))
const { GET_GAMES, CREATE_GAME, CATEGORIES, AGE_RATING, UPDATE_GAME, DELETE_GAME } = require(path.join(__dirname, "query"))
    
const getGames = async () => {	
    try {
        let games = await fetchAll(GET_GAMES)
        console.log(games);
        return games
    } catch (error) {
        console.error(error);
        return error || 'something went wrong'
    }
}

const postNewGame = async ({
    game_title, 
    game_slug, 
    game_info, 
    game_release, 
    purchase_info, 
    game_picture_url, 
    cat_id, 
    rating_id, 
    requirements
}) => {
    try {
        const categories = await fetch(CATEGORIES, cat_id)
        const age_rating = await fetch(AGE_RATING, rating_id)

        const {
            type,
            system,
            title,
            processor,
            ram,
            graphic_card,
            storage,
            sound_card,
            directx,
            internet,
            additional_notes
        } = requirements || {};

        if (categories && age_rating) {
            const set = await fetch( CREATE_GAME, 
                game_title, 
                game_slug, 
                game_info, 
                game_release, 
                purchase_info, 
                game_picture_url, 
                rating_id, 
                cat_id 
            )

            if (set.game_id) {
                const reqs = await fetch( CREATE_REQS,
                    set.game_id,
                    type || null,
                    title || null,
                    system || null,
                    processor || null,
                    ram || null,
                    graphic_card || null,
                    storage || null,
                    sound_card || null,
                    directx || null,
                    internet || null,
                    additional_notes || null
                );
                if (reqs) {
                    throw reqs
                }
            } else {
                throw "This slug exists already, changing it!"
            }
            
        } else {
            throw "category or age rating is not defined!"
        }
    } catch (error) {
        return error
    }
}

const updateGame = async ({
    game_title, 
    game_slug, 
    game_info, 
    game_release, 
    purchase_info,
    game_picture_url, 
    cat_id, 
    rating_id, 
    requirements},
    id 
) => {
    try {
        const {
            type,
            system,
            title,
            processor,
            ram,
            graphic_card,
            storage,
            sound_card,
            directx,
            internet,
            additional_notes,
            req_id
        } = requirements || {};

        const update = await fetch( UPDATE_GAME, 
            game_title,
            game_slug,
            game_info,
            game_release,
            purchase_info,
            game_picture_url,
            rating_id,
            cat_id,
            id
        )

        if (!update) {
            const reqs = await fetch( UPDATE_REQS,
                id || null,
                type || null,
                title || null,
                system || null,
                processor || null,
                ram || null,
                graphic_card || null,
                storage || null,
                sound_card || null,
                directx || null,
                internet || null,
                additional_notes || null,
                req_id || null
            );
            if (reqs) {
                throw reqs
            }
            return update
        } else {
            throw update
        }
    } catch (error) {
        return error
    }
}

const deleteGame = async (game_id) => {
    try {
        const deleted = await fetch(
            DELETE_GAME,
            game_id
        )
        return deleted
    } catch (error) {
        console.log(error);
        return error || 'something went wrong'
    }
}

module.exports = {
    getGames,
    postNewGame,
    updateGame,
    deleteGame
}