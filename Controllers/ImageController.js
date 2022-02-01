const clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: "b726579375c344d08410ed7689238a64",
});

const ImageController = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where({ id })
    .increment("entries", 1)
    .returning("*")
    .then((data) => {
      if (data.length) {
        res.status(200).json(data[0].entries);
      } else {
        res.status(404).json("Not Found");
      }
    })
    .catch((err) => res.status(400).json("Error"));
};

const ImageUrl = (req, res) => {
  const { url } = req.body;
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, url)
    .then((response) => {
      res.json(response);
    })
    .catch((err) => res.status(400).json("Error"));
};

module.exports = {
  ImageController,
  ImageUrl,
};
