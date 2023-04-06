const { getGames, postNewGame, updateGame, deleteGame } = require("./model");

// Define the POST request handler function
const GET = async (req, res) => {	
  try {
    const model = await getGames()

    res.send(model)
  } catch (error) {
    res.status(200).send(error || 'something went wrong');
  }
}

const POST = async (req, res) => {	
  try {
    const model = await postNewGame(req.body)
    console.log(model);
    if (!model) {
      res.status(200).send('Game successfully created')
    } else {
      res.send(model)
    }
  } catch (error) {
    res.status(200).send(error || 'something went wrong');
  }
}

const UPDATE = async (req, res) => {
  try {
    const update = await updateGame(req.body, req.query.id)
  
    if (!update) {
      res.send("Data successfully updated")
    } else {
      throw "something went wrong with update\n" + update
    }
  } catch (error) {
    res.send(error || 'something went wrong')
  }
}

const DELETE = async (req, res) => {
 try {
    const model = await deleteGame(req.query.id)
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
  DELETE
}