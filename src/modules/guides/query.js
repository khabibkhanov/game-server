const GETGUIDESBYGAME = `
    SELECT guide_id, guide_title, guide_slug, guide_text
    FROM game_guides
    JOIN games ON game_guides.game_id = games.game_id
    WHERE guide_id = $1;
`

const GETALLGUIDES = `
    SELECT guide_id, guide_title, guide_slug, guide_text, game_id
    FROM game_guides;
`

const CREATEGUIDE = `
    INSERT INTO game_guides (guide_title, guide_slug, guide_text, game_id)
    VALUES ($1, $2, $3, $4);
`

const CHECKGAMES = `
    SELECT * FROM games WHERE game_id = $1;
`

module.exports = {
    GETGUIDESBYGAME,
    GETALLGUIDES,
    CREATEGUIDE,
    CHECKGAMES
}