const ProfileController = (req, res, db) => {
  const { id } = req.body;
  db.select("*")
    .from("users")
    .where({ id })
    .then((user) => {
      if (user.length) {
        res.json(user[0]);
      } else res.status(400).json("Not Found");
    })
    .catch((err) => res.json("Error Occured"));
};

module.exports = {
  ProfileController,
};
