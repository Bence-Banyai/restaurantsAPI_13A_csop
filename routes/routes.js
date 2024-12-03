const express = require('express');
const router = express.Router();
const Model = require('../models/etteremModel')
const restaurantCreate = require('../controllers/restaurant.controller')

router.post('/', restaurantCreate)
router.get('/', getAllrestaurants)
router.get('/:id', getrestaurant)
router.put('/:id', modifyrestaurant)
router.delete('/:id', deleterestaurant)

module.exports = router;
