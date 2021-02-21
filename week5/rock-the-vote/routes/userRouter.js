const express = require('express');
const User = require('../models/User');
const userRouter = express.Router();

userRouter.route('/')
.get((req, res, next) => {
    User.find((err, users) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(users);
    })
})
.post((req, res, next) => {
    req.body.user = req.user._id;
    const newUser = new User(req.body);
    newUser.save((err, savedItem) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedItem);
    })
})

userRouter.route('/:userID')
.get((req, res, next) => {
    User.findById(req.params.userID, (err, foundUser) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(foundUser.withooutPassword());
    })
})
.put((req, res, next) => {
    User.findOneAndUpdate(
        { _id: req.params.userID }, // Find one to update
        req.body, // Update object with this data
        { new: true }, // Send back the updated version?
        (err, updatedUser) => {
            if(err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedUser);
        }
    )
})
.delete((req, res, next) => {
    User.findOneAndDelete({ _id: req.params.userID }, (err, deletedUser) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(deletedUser);
    })
})

module.exports = userRouter;
