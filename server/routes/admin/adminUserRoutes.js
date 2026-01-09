import express from "express";
import { protect } from "../../middleware/auth.js";
import { adminOnly } from "../../middleware/adminMiddleware.js";

import {
  getAllUsers,
  updateUser,
  deleteUser,
} from "../../controllers/admin/adminUserController.js";

const router = express.Router();

// Admin → Users
router.get("/", protect, adminOnly, getAllUsers);
router.put("/:id", protect, adminOnly, updateUser);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
