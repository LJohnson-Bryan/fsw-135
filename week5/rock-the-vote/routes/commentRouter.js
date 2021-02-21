const express = require('express');
const Comment = require('../models/Comment');
const commentRouter = express.Router();

commentRouter.route('/')
.get((req, res, next) => {
    Comment.find((err, comments) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(comments);
    })
})
.post((req, res, next) => {
    req.body.user = req.user._id;
    const newComment = new Comment(req.body);
    newComment.save((err, savedItem) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedItem);
    })
})

commentRouter.route('/:commentID')
.get((req, res, next) => {
    Comment.findById(req.params.commentID, (err, foundComment) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(foundComment);
    })
})
.put((req, res, next) => {
    Comment.findOneAndUpdate(
        { _id: req.params.commentID }, // Find one to update
        req.body, // Update object with this data
        { new: true }, // Send back the updated version?
        (err, updatedComment) => {
            if(err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedComment);
        }
    )
})
.delete((req, res, next) => {
    Comment.findOneAndDelete({ _id: req.params.commentID }, (err, deletedComment) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(deletedComment);
    })
})

module.exports = commentRouter;
