const router = require("express").Router();
let User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {

  User.findById(req.params.id)
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});


router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username }); // creat new instant user 

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").patch((req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body }, // only updates the fields provided in req.body
    { new: true, runValidators: true } // return the updated doc & validate schema
  )
    .then(() => res.json("User updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;



