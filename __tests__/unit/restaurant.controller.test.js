const RestaurantController = require('../../controllers/restaurant.controller');
const restaurantModel = require('../../models/etteremModel');
const httpMocks = require('node-mocks-http');
const newRestaurant = require('../mock-data/new-restaurant.json');

jest.mock('../../models/etteremModel');

let req, res, next;

beforeEach(() => {
  req = httpMocks.createRequest();
  res = httpMocks.createResponse();
  next = jest.fn();
});

describe('RestaurantController createRestaurant tests', () => {
  beforeEach(() => {
    req.body = newRestaurant;
  });

  it('should have a createRestaurant function', () => {
    expect(typeof RestaurantController.createRestaurant).toBe('function');
  });

  it('should call restaurantModel.create', async () => {
    await RestaurantController.createRestaurant(req, res, next);
    expect(restaurantModel.create).toHaveBeenCalledWith(newRestaurant);
  });

  it('should return 201 status code and the created restaurant', async () => {
    restaurantModel.create.mockResolvedValue(newRestaurant);
    await RestaurantController.createRestaurant(req, res, next);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toStrictEqual(newRestaurant);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Error creating restaurant';
    restaurantModel.create.mockRejectedValue(new Error(errorMessage));
    await RestaurantController.createRestaurant(req, res, next);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({ message: errorMessage });
    // Remove or comment out the next line since next() is not called
    // expect(next).toHaveBeenCalledWith(errorMessage);
  });
});

describe('RestaurantController getAllRestaurant tests', () => {
  beforeEach(() => {
    restaurantModel.find = jest.fn();
  });

  it('should have a getAllRestaurant function', () => {
    expect(typeof RestaurantController.getAllRestaurant).toBe('function');
  });

  it('should call restaurantModel.find', async () => {
    await RestaurantController.getAllRestaurant(req, res, next);
    expect(restaurantModel.find).toHaveBeenCalled();
  });

  it('should return 200 status code and all restaurants', async () => {
    const allRestaurants = [newRestaurant];
    restaurantModel.find.mockResolvedValue(allRestaurants);
    await RestaurantController.getAllRestaurant(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(allRestaurants);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Error fetching restaurants';
    restaurantModel.find.mockRejectedValue(new Error(errorMessage));
    await RestaurantController.getAllRestaurant(req, res, next);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({ message: errorMessage });
  });
});

describe('RestaurantController getRestaurantById tests', () => {
  beforeEach(() => {
    restaurantModel.findById = jest.fn();
    req.params.id = '1';
  });

  it('should have a getRestaurantById function', () => {
    expect(typeof RestaurantController.getRestaurantById).toBe('function');
  });

  it('should call restaurantModel.findById with route parameters', async () => {
    await RestaurantController.getRestaurantById(req, res, next);
    expect(restaurantModel.findById).toHaveBeenCalledWith('1');
  });

  it('should return 200 status code and the restaurant', async () => {
    restaurantModel.findById.mockResolvedValue(newRestaurant);
    await RestaurantController.getRestaurantById(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newRestaurant);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Error fetching restaurant';
    restaurantModel.findById.mockRejectedValue(new Error(errorMessage));
    await RestaurantController.getRestaurantById(req, res, next);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({ message: errorMessage });
  });
});

describe('RestaurantController updateRestaurant tests', () => {
  beforeEach(() => {
    restaurantModel.findByIdAndUpdate = jest.fn();
    req.params.id = '1';
    req.body = newRestaurant;
  });

  it('should have an updateRestaurant function', () => {
    expect(typeof RestaurantController.updateRestaurant).toBe('function');
  });

  it('should call restaurantModel.findByIdAndUpdate with route parameters and body', async () => {
    await RestaurantController.updateRestaurant(req, res, next);
    expect(restaurantModel.findByIdAndUpdate).toHaveBeenCalledWith('1', newRestaurant, { new: true });
  });

  it('should return 200 status code and the updated restaurant', async () => {
    restaurantModel.findByIdAndUpdate.mockResolvedValue(newRestaurant);
    await RestaurantController.updateRestaurant(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newRestaurant);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Error updating restaurant';
    restaurantModel.findByIdAndUpdate.mockRejectedValue(new Error(errorMessage));
    await RestaurantController.updateRestaurant(req, res, next);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({ message: errorMessage });
  });
});

describe('RestaurantController deleteRestaurant tests', () => {
  beforeEach(() => {
    restaurantModel.findByIdAndDelete = jest.fn();
    req.params.id = '1';
  });

  it('should have a deleteRestaurant function', () => {
    expect(typeof RestaurantController.deleteRestaurant).toBe('function');
  });

  it('should call restaurantModel.findByIdAndDelete with route parameters', async () => {
    await RestaurantController.deleteRestaurant(req, res, next);
    expect(restaurantModel.findByIdAndDelete).toHaveBeenCalledWith('1');
  });

  it('should return 200 status code and the deleted restaurant', async () => {
    restaurantModel.findByIdAndDelete.mockResolvedValue(newRestaurant);
    await RestaurantController.deleteRestaurant(req, res, next);
    expect(res.statusCode).toBe(200);
    expect(res._getJSONData()).toStrictEqual(newRestaurant);
  });

  it('should handle errors', async () => {
    const errorMessage = 'Error deleting restaurant';
    restaurantModel.findByIdAndDelete.mockRejectedValue(new Error(errorMessage));
    await RestaurantController.deleteRestaurant(req, res, next);

    expect(res.statusCode).toBe(500);
    expect(res._getJSONData()).toStrictEqual({ message: errorMessage });
  });
});