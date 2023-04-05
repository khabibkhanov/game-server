const GET_NEWS = `
	SELECT news_id, news_title, news_slug, news_text, news_pic_url, news_created_at
		JSON_BUILD_OBJECT('id', news_tag.tag_id, 'title', news_tag.tag_title, 'slug', news_tag.tag_slug) AS tags
	FROM news
	JOIN news_tag ON news.tag = news_tag.tag_id
	WHERE news_deleted_at IS NULL;
`

const CREATE_NEWS = `
	INSERT INTO news (news_title, news_slug, news_text, news_pic_url, tag)
	VALUES ($1, $2, $3, $4, $5);
`

const UPDATE_NEWS = `
	UPDATE news
	SET news_title = $1,
		news_slug = $2,
		news_text = $3,
		news_pic_url = $4,
		tag = $5,
		news_updated_at = CURRENT_TIMESTAMP
	WHERE news_id = $6;
`

const DELETE_NEWS = `
	UPDATE news
	SET news_deleted_at = CURRENT_TIMESTAMP
	WHERE news_id = $1;
`

const TAGS = `
	Select * from news_tags where cat_id = $1;
`

module.exports = {
	GET_NEWS,
	CREATE_NEWS,
	TAGS,
	UPDATE_NEWS,
	DELETE_NEWS
}