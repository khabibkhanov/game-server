const GET_GAMES = `
	SELECT game_id, game_title, game_slug, game_info, game_release, purchase_info, game_picture_url, 
		JSON_BUILD_OBJECT('id', categories.cat_id, 'cat_title', categories.cat_title, 'cat_slug', categories.cat_slug) AS category,
		JSON_BUILD_OBJECT('id', age_ratings.rating_id, 'rating_pic_url', age_ratings.rating_pic_url, 'rating_title', age_ratings.rating_title) AS age_rating
	FROM games
	JOIN age_ratings ON games.age_rating = age_ratings.rating_id
	JOIN categories ON games.category_id = categories.cat_id
	WHERE game_deleted_at IS NULL;
`

const CREATE_GAME = `
	INSERT INTO games (game_title, game_slug, game_info, game_release, purchase_info, game_picture_url, age_rating, category_id)
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
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
	DELETE_GAME,
	SET_CATEGORY,
	CATEGORIES,
	AGE_RATING,
}