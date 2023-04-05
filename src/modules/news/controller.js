const { getNewsList, createNews, updateNews, deleteNews } = require("./model");

// Define the POST request handler function
const GET = async (req, res) => {	
  try {
    const model = await getNewsList()

    res.send(model)
  } catch (error) {
    res.status(200).send(error || 'something went wrong');
  }
}

const POST = async (req, res) => {	
  try {
    const model = await createNews(req.body)
    if (!model) {
      res.status(200).send('News successfully created')
    } else {
    console.log(req.body);

      res.send(model)
    }
  } catch (error) {
    res.status(200).send(error || 'something went wrong');
  }
}

const UPDATE = async (req, res) => {
  try {
    const update = await updateNews(req.body, req.query.id)
    console.log(update);
    if (!update) {
      res.send("Data successfully updated")
    } else {
      throw "something went wrong with update\n" + update
    }
  } catch (error) {
    console.log(error);
    res.send(error || 'something went wrong')
  }
}

const DELETE = async (req, res) => {
 try {
    const model = await deleteNews(req.query.id)
    if (!model) {
      res.send("Data successfully deleted")
    } else {
      throw "something went wrong with delete\n" + update
    }
 } catch (error) {
    res.send(error || 'something went wrong')
 }
}

module.exports = {
  GET,
  POST,
  UPDATE,
  DELETE,
}