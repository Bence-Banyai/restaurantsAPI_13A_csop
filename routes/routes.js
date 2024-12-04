const express = require('express')
const router = express.Router()
const {
    createRestaurant,
    getAllrestaurant,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant
} = require('../controllers/restaurant.controller')

router.post('/', createRestaurant)
router.get('/', getAllrestaurant)
router.get('/:id', getRestaurantById)
router.put('/:id', updateRestaurant)
router.delete('/:id', deleteRestaurant)

module.exports = router