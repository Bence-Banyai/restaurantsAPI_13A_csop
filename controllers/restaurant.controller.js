const restaurantModel = require('../models/etteremModel')

exports.createRestaurant = async (req, res, next) => {
    try {
        const newRestaurant = await restaurantModel.create(req.body)
        res.status(201).json(newRestaurant)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getAllrestaurant = async (req, res, next) => {
    try {
        const restaurants = await restaurantModel.find()
        res.status(200).json(restaurants)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.getRestaurantById = async (req, res, next) => {
    try {
        const restaurant = await restaurantModel.findById(req.params.id)
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' })
        }
        res.status(200).json(restaurant)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.updateRestaurant = async (req, res, next) => {
    try {
        const updatedRestaurant = await restaurantModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' })
        }
        res.status(200).json(updatedRestaurant)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.deleteRestaurant = async (req, res, next) => {
    try {
        const deletedRestaurant = await restaurantModel.findByIdAndDelete(req.params.id)
        if (!deletedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' })
        }
        res.status(200).json(deletedRestaurant)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}