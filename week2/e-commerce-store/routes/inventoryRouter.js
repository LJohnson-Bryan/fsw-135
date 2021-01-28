const express = require('express');
const Inventory = require('../models/inventory');
const inventoryRouter = express.Router();

// General Route Handling
inventoryRouter.route('/')
.get((req, res, next) => {
    Inventory.find((err, inventory) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(inventory);
    })
})
.post((req, res, next) => {
    const newItem = new Inventory(req.body);
    newItem.save((err, savedItem) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(201).send(savedItem);
    })
})

// Specific Route Handling
inventoryRouter.route('/:inventoryID')
.get((req, res, next) => {
    Inventory.findById(req.params.inventoryID, (err, foundItem) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(foundItem);
    })
})
.put((req, res, next) => {
    Inventory.findOneAndUpdate(
        { _id: req.params.inventoryID }, // Find one to update
        req.body, // Update object with this data
        { new: true }, // Send back the updated version?
        (err, updatedInventory) => {
            if(err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedInventory);
        }
        )
})
.delete((req, res, next) => {
    Inventory.findOneAndDelete({ _id: req.params.inventoryID }, (err, deletedItem) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(deletedItem);
    })
})

module.exports = inventoryRouter;
