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
    host: "127.0.0.1", //localhost
    user: "postgres", //add your user name for the database here
    port: 5432, // add your port number here
    password: "test", //add your correct password in here
    database: "smartbrain", //add your database name you created here
  },
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  db.select("*")
    .from("users")
    .then((users) => res.send(users));
});

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

app.listen(3001);
