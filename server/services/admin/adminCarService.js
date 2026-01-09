import Car from "../../models/Car.js";

export const getAllCarsService = async () => {
  return await Car.find();
};

export const updateCarService = async (carId, data) => {
  const car = await Car.findById(carId);

  if (!car) {
    throw new Error("Car not found");
  }

  Object.assign(car, data);
  return await car.save();
};

export const deleteCarService = async (carId) => {
  const car = await Car.findById(carId);

  if (!car) {
    throw new Error("Car not found");
  }

  await car.deleteOne();
  return true;
};
