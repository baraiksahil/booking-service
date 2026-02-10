import express from "express";
import serviceRouter from "./service.router.js";
import slotRouter from "./slot.router.js";
import appointmentRouter from "./appointment.router.js";
const router = express.Router();

router.use("/services", serviceRouter);
router.use("/slots", slotRouter);
router.use("/appointments", appointmentRouter);

export default router;
