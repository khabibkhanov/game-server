const { getGames, postNewGame } = require("./model");

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
  console.log(req.body);

  

  res.send('work')
}

const DELETE = async (req, res) => {
  console.log(req.query.id);
  res.send('sd')
}

module.exports = {
  GET,
  POST,
  UPDATE,
  DELETE,
}