const express = require('express');
const Inventory = require('../models/inventory');
const inventoryRouter = express.Router();

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

module.exports = inventoryRouter;
