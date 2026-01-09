import express from "express";
import { protect } from "../../middleware/auth.js";
import { adminOnly } from "../../middleware/adminMiddleware.js";

import {
  getAllCars,
  updateCar,
  deleteCar,
} from "../../controllers/admin/adminCarController.js";

const router = express.Router();

// Admin → Cars
router.get("/", protect, adminOnly, getAllCars);
router.put("/:id", protect, adminOnly, updateCar);
router.delete("/:id", protect, adminOnly, deleteCar);

export default router;
