const path = require("path")
const { fetchAll, fetch } = require(path.join(__dirname, "..", "..", "libs", "postgres"))
const { GETGUIDESBYGAME, GETALLGUIDES, CHECKGAMES, CREATEGUIDE } = require(path.join(__dirname, "query"))
    
const getGuidesByGame = async ({id}) => {	
    try {
        if (id) {
            let guides = await fetchAll(GETGUIDESBYGAME, id)
            return guides
        } else {
            const guides = await fetchAll(GETALLGUIDES)
            return guides
        }
    } catch (error) {
        return error || 'something went wrong'
    }
}

const createGuide = async ({guide_title, guide_slug, guide_text, game_id}) => {
    try {
        const games = await fetch(CHECKGAMES, game_id)

        if (games) {
            const created = await fetch(CREATEGUIDE, guide_title, guide_slug, guide_text, game_id)
            return created
        } else {
            throw "Game not found"
        }
    } catch (error) {
        console.log(error);
        return error || "something went wrong"
    }
}

const updateGuide = async () => {
    
}

const deleteGuide = async () => {
    
}

module.exports = {
    getGuidesByGame,
    createGuide,
    updateGuide,
    deleteGuide
}