import {
  getAllCarsService,
  updateCarService,
  deleteCarService,
} from "../../services/admin/adminCarService.js";

export const getAllCars = async (req, res) => {
  try {
    const cars = await getAllCarsService();
    res.json({success: true, cars});
  } catch (error) {
    res.status(500).json({success: false, message: error.message });
  }
};

export const updateCar = async (req, res) => {
  try {
    const car = await updateCarService(req.params.id, req.body);
    res.json(car);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteCar = async (req, res) => {
  try {
    await deleteCarService(req.params.id);
    res.json({ message: "Car deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
