const express = require('express');
const router = express.Router();
const {
  createRestaurant,
  getAllRestaurant,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurant.controller');

router.post('/', createRestaurant);
router.get('/', getAllRestaurant);
router.get('/:id', getRestaurantById);
router.put('/:id', updateRestaurant);
router.delete('/:id', deleteRestaurant);

module.exports = router;