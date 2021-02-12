const express = require('express');
const Issue = require('../models/Issue');
const issueRouter = express.Router();

issueRouter.route('/')
.get((req, res, next) => {
    Issue.find((err, issues) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(issues);
    })
})
.post((req, res, next) => {
    req.body.user = req.user._id;
    const newIssue = new Issue(req.body);
    newIssue.save((err, savedItem) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedItem);
    })
})

issueRouter.route('/:issueID')
.get((req, res, next) => {
    Issue.findById(req.params.issueID, (err, foundIssue) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(foundIssue);
    })
})
.put((req, res, next) => {
    Issue.findOneAndUpdate(
        { _id: req.params.issueID }, // Find one to update
        req.body, // Update object with this data
        { new: true }, // Send back the updated version?
        (err, updatedIssue) => {
            if(err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedIssue);
        }
    )
})
.delete((req, res, next) => {
    Issue.findOneAndDelete({ _id: req.params.issueID }, (err, deletedIssue) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(deletedIssue);
    })
})

module.exports = issueRouter;
