const RestaurantController = require('../../controllers/restaurant.controller')
const restaurantModel = require('../../models/etteremModel')
const httpMocks = require('node-mocks-http')
const newRestaurant = require('../mock-data/new-restaurant.json')



restaurantModel.create = jest.fn()
let req, res, next

beforeEach(() => {
    req = httpMocks.createRequest()
    res = httpMocks.createResponse()
    next = null
})

describe('RestaurantController createRestaurant tests', () => {
    beforeEach(() => {
        req.body = newRestaurant
    })

    it('should have a createRestaurant function', () => {
        expect(typeof RestaurantController.createRestaurant).toBe('function')
    })

    it('should call restaurantModel.create', () => {
        RestaurantController.createRestaurant(req, res, next)
        expect(restaurantModel.create).toHaveBeenCalledWith(newRestaurant)
    })

    it('should return 201 status code and the created restaurant', () => {
        restaurantModel.create.mockReturnValue(newRestaurant)
        RestaurantController.createRestaurant(req, res, next)
        expect(res.statusCode).toBe(201)
        expect(res._getJSONData()).toStrictEqual(newRestaurant)
    })

    it('should handle errors', () => {
        const errorMessage = { message: 'Error creating restaurant' }
        const rejectedPromise = Promise.reject(errorMessage)
        restaurantModel.create.mockReturnValue(rejectedPromise)
        RestaurantController.createRestaurant(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})

describe('RestaurantController getAllRestaurant tests', () => {
    it('should have a getAllRestaurant function', () => {
        expect(typeof RestaurantController.getAllRestaurant).toBe('function')
    })

    it('should call restaurantModel.find', () => {
        restaurantModel.find = jest.fn().mockReturnValue([])
        RestaurantController.getAllRestaurant(req, res, next)
        expect(restaurantModel.find).toHaveBeenCalled()
    })

    it('should return 200 status code and all restaurants', () => {
        const allRestaurants = [newRestaurant]
        restaurantModel.find.mockReturnValue(allRestaurants)
        RestaurantController.getAllRestaurant(req, res, next)
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(allRestaurants)
    })

    it('should handle errors', () => {
        const errorMessage = { message: 'Error fetching restaurants' }
        const rejectedPromise = Promise.reject(errorMessage)
        restaurantModel.find.mockReturnValue(rejectedPromise)
        RestaurantController.getAllRestaurant(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})

describe('RestaurantController getRestaurantById tests', () => {
    it('should have a getRestaurantById function', () => {
        expect(typeof RestaurantController.getRestaurantById).toBe('function')
    })

    it('should call restaurantModel.findById with route parameters', () => {
        req.params.id = '1'
        restaurantModel.findById = jest.fn().mockReturnValue(newRestaurant)
        RestaurantController.getRestaurantById(req, res, next)
        expect(restaurantModel.findById).toHaveBeenCalledWith('1')
    })

    it('should return 200 status code and the restaurant', () => {
        req.params.id = '1'
        restaurantModel.findById.mockReturnValue(newRestaurant)
        RestaurantController.getRestaurantById(req, res, next)
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(newRestaurant)
    })

    it('should handle errors', () => {
        const errorMessage = { message: 'Error fetching restaurant' }
        const rejectedPromise = Promise.reject(errorMessage)
        restaurantModel.findById.mockReturnValue(rejectedPromise)
        RestaurantController.getRestaurantById(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})

describe('RestaurantController updateRestaurant tests', () => {
    it('should have an updateRestaurant function', () => {
        expect(typeof RestaurantController.updateRestaurant).toBe('function')
    })

    it('should call restaurantModel.findByIdAndUpdate with route parameters and body', () => {
        req.params.id = '1'
        req.body = newRestaurant
        restaurantModel.findByIdAndUpdate = jest.fn().mockReturnValue(newRestaurant)
        RestaurantController.updateRestaurant(req, res, next)
        expect(restaurantModel.findByIdAndUpdate).toHaveBeenCalledWith('1', newRestaurant, { new: true })
    })

    it('should return 200 status code and the updated restaurant', () => {
        req.params.id = '1'
        req.body = newRestaurant
        restaurantModel.findByIdAndUpdate.mockReturnValue(newRestaurant)
        RestaurantController.updateRestaurant(req, res, next)
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(newRestaurant)
    })

    it('should handle errors', () => {
        const errorMessage = { message: 'Error updating restaurant' }
        const rejectedPromise = Promise.reject(errorMessage)
        restaurantModel.findByIdAndUpdate.mockReturnValue(rejectedPromise)
        RestaurantController.updateRestaurant(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})

describe('RestaurantController deleteRestaurant tests', () => {
    it('should have a deleteRestaurant function', () => {
        expect(typeof RestaurantController.deleteRestaurant).toBe('function')
    })

    it('should call restaurantModel.findByIdAndDelete with route parameters', () => {
        req.params.id = '1'
        restaurantModel.findByIdAndDelete = jest.fn().mockReturnValue(newRestaurant)
        RestaurantController.deleteRestaurant(req, res, next)
        expect(restaurantModel.findByIdAndDelete).toHaveBeenCalledWith('1')
    })

    it('should return 200 status code and the deleted restaurant', () => {
        req.params.id = '1'
        restaurantModel.findByIdAndDelete.mockReturnValue(newRestaurant)
        RestaurantController.deleteRestaurant(req, res, next)
        expect(res.statusCode).toBe(200)
        expect(res._getJSONData()).toStrictEqual(newRestaurant)
    })

    it('should handle errors', () => {
        const errorMessage = { message: 'Error deleting restaurant' }
        const rejectedPromise = Promise.reject(errorMessage)
        restaurantModel.findByIdAndDelete.mockReturnValue(rejectedPromise)
        RestaurantController.deleteRestaurant(req, res, next)
        expect(next).toHaveBeenCalledWith(errorMessage)
    })
})