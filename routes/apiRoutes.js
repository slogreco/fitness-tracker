const router = require("express").Router();
const { isValidObjectID } = require("mongoose");
const { workout } = require("../models");
const db = require("../models");

// create a new workout
router.post("/api/workouts", (req, res) => {
    db.workout.create(req.body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


// get all workouts
router.get("/api/workouts", (req, res) => {
    db.workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});


// update workout
router.put("/api/workouts/:id", (req, res) => {
    const { body, params } = req;

    db.workout.findByIdAndUpdate(params.id, {
        $push: { exercises: body }
    })
    .then((dbWorkout) => {
        res.json(dbWorkout);
    })
    .catch((err) => {
        res.status(400).json(err);
        console.log(err);
    });
});





module.exports = router;