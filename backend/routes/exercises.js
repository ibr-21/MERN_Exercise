const router = require("express").Router();
let Exercise = require("../models/exercise.model");

router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Exercise.findById(req.params.id) // you must update all ,bad usage
    .then((input) => {
      input.username = req.body.username;
      input.description = req.body.description;
      input.duration = Number(req.body.duration);
      input.date = Date.parse(req.body.date);

      input
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").patch((req, res) => {
  Exercise.findByIdAndUpdate(
    req.params.id,
    { $set: req.body }, // only updates the fields provided in req.body
    { new: true, runValidators: true } // return the updated doc & validate schema
  )
    .then(() => res.json("Exercise updated!"))
    .catch((err) => res.status(400).json("Error: " + err));
});


module.exports = router;
