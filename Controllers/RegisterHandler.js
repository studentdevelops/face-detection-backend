const RegisterHandler = (req, res, bcrypt, db) => {
  const { email, name, password } = req.body;
  if (!email || !password || !name) {
    return res.status(404).json("Invalid Input");
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .returning("email")
      .then((loginEmail) => {
        return trx
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .into("users")
          .returning("*")
          .then((user) => res.status(200).json(user[0]))
          .catch((err) => res.json(err));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json("Unable to Register"));
};

module.exports = {
  RegisterHandler,
};
