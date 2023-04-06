const path = require("path")
const { UPDATE_NEWS, DELETE_NEWS } = require("./query")
const { fetchAll, fetch } = require(path.join(__dirname, "..", "..", "libs", "postgres"))
const { TAGS, CREATE_NEWS, GET_NEWS } = require(path.join(__dirname, "query"))

const getNewsList = async () => {	
    try {
        let users = await fetchAll(GET_NEWS)
        return users
    } catch (error) {
        return error
    }
}

const createNews = async ({news_title, news_slug, news_text, news_pic_url, tag_id}) => {
    try {
        const tags = await fetch(TAGS, tag_id)
        if (tags) {
            const set = await fetch( CREATE_NEWS, news_title, news_slug, news_text, news_pic_url, tag_id )
            return set
        } else {
            throw "tag is not defined"
        }
    } catch (error) {
        return error
    }
}

const updateNews = async ({news_title, news_slug, news_text, news_pic_url, tag_id }, id ) => {
    try {
        const update = await fetch( UPDATE_NEWS, 
            news_title,
            news_slug,
            news_text,
            news_pic_url,
            tag_id,
            id
        )
        return update
    } catch (error) {
        res.send(error.message)
    }
}

const deleteNews = async (news_id) => {
    try {
        const deleted = await fetch(
            DELETE_NEWS,
            news_id
        )
        return deleted
    } catch (error) {
        return error || 'something went wrong'
    }
}

module.exports = {
    getNewsList,
    createNews,
    updateNews,
    deleteNews
}