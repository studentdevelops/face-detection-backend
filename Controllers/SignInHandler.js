const SignInHandler = (req, res, bcrypt, db) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(404).json("Invalid Input");
  }
  db.select("email", "hash")
    .from("login")
    .where({ email })
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select("*")
          .from("users")
          .where({ email })
          .then((user) => {
            res.json(user[0]);
          });
      } else res.status(404).json("invalid");
    })
    .catch((err) => res.status(400).json("Error Occured"));
};

module.exports = {
  SignInHandler,
};
