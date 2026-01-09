import express from "express";

import adminUserRoutes from "./adminUserRoutes.js";
import adminCarRoutes from "./adminCarRoutes.js";
import adminBookingRoutes from "./adminBookingRoutes.js";

const router = express.Router();

router.use("/users", adminUserRoutes);
router.use("/cars", adminCarRoutes);
router.use("/bookings", adminBookingRoutes);


export default router;
