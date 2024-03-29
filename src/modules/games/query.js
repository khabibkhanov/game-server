const GET_GAMES = `
	SELECT 
		games.game_id, 
		games.game_title, 
		games.game_slug, 
		games.game_info, 
		games.game_release, 
		games.purchase_info, 
		games.game_picture_url, 
		JSON_BUILD_OBJECT('id', categories.cat_id, 'cat_title', categories.cat_title, 'cat_slug', categories.cat_slug) AS category,
		JSON_BUILD_OBJECT('id', age_ratings.rating_id, 'rating_pic_url', age_ratings.rating_pic_url, 'rating_title', age_ratings.rating_title) AS age_rating,
		COALESCE(
			JSON_AGG(
				JSON_BUILD_OBJECT(
					'req_id', system_requirements.req_id, 
					'req_type', system_requirements.req_type, 
					'req_title', system_requirements.req_title, 
					'req_system', system_requirements.req_system, 
					'req_processor', system_requirements.req_processor, 
					'req_ram', system_requirements.req_ram, 
					'req_graphic_card', system_requirements.req_graphic_card, 
					'req_storage', system_requirements.req_storage, 
					'req_sound_card', system_requirements.req_sound_card
				)
			) FILTER (WHERE system_requirements.req_id IS NOT NULL),
			'[]'
		) AS system_requirements
	FROM
		games
		JOIN age_ratings ON games.age_rating = age_ratings.rating_id
		JOIN categories ON games.category_id = categories.cat_id
		LEFT JOIN system_requirements ON games.game_id = system_requirements.games
	WHERE
		games.game_deleted_at IS NULL
	GROUP BY
		games.game_id,
		categories.cat_id,
		age_ratings.rating_id;
`

const CREATE_GAME = `
	INSERT INTO games (game_title, game_slug, game_info, game_release, purchase_info, game_picture_url, age_rating, category_id)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	RETURNING game_id
`

const CREATE_REQS = `
	INSERT INTO system_requirements (games, req_type, req_title, req_system, req_processor, req_ram, req_graphic_card, req_storage, req_sound_card, req_directx, req_internet, req_additional_notes)
	VALUES ((SELECT game_id FROM games WHERE game_id = $1), $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
`

const UPDATE_GAME = `
	UPDATE games
	SET game_title = $1,
		game_slug = $2,
		game_info = $3,
		game_release = $4,
		purchase_info = $5,
		game_picture_url = $6,
		age_rating = $7,
		category_id = $8,
		game_updated_at = CURRENT_TIMESTAMP
	WHERE game_id = $9;
`

const UPDATE_REQS = `
	UPDATE system_requirements
	SET games = $1,
		req_type = $2,
		req_title = $3,
		req_system = $4,
		req_processor = $5,
		req_ram = $6,
		req_graphic_card = $7,
		req_storage = $8,
		req_sound_card = $9,
		req_directx = $10,
		req_internet = $11,
		req_additional_notes = $12
	WHERE req_id = $13
`

const DELETE_GAME = `
	UPDATE games
	SET game_deleted_at = CURRENT_TIMESTAMP
	WHERE game_id = $1;
`

const CATEGORIES = `
	Select * from categories where cat_id = $1;
`

const AGE_RATING = `
	Select * from age_ratings where rating_id = $1;
`

const SET_CATEGORY = `
	INSERT INTO categories (cat_title, cat_slug)
	VALUES ($1, $2);
`

module.exports = {
	GET_GAMES,
	CREATE_GAME,
	UPDATE_GAME,
	UPDATE_REQS,
	DELETE_GAME,
	SET_CATEGORY,
	CATEGORIES,
	AGE_RATING,
	CREATE_REQS
}