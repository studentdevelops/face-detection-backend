const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt-nodejs");
const knex = require("knex");
const RegisterHandler = require("./Controllers/RegisterHandler");
const SignInHandler = require("./Controllers/SignInHandler");
const ProfileController = require("./Controllers/ProfileController");
const ImageController = require("./Controllers/ImageController");
const app = express();

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => res.send([]));

app.get("/profile", (req, res) => {
  ProfileController.ProfileController(req, res, db);
});

app.put("/image", (req, res) => {
  ImageController.ImageController(req, res, db);
});

app.post("/imageurl", (req, res) => {
  ImageController.ImageUrl(req, res);
});

app.post("/signin", (req, res) => {
  SignInHandler.SignInHandler(req, res, bcrypt, db);
});

app.post("/register", (req, res) => {
  RegisterHandler.RegisterHandler(req, res, bcrypt, db);
});

app.listen(process.env.PORT || 3001);
