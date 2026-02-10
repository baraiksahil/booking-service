import express from "express";
import { appointmentController } from "../../controller/index.js";
import { AppointmentMiddleware } from "../../middleware/index.js";

const router = express.Router();

// Route: POST /api/v1/appointments/book
router.post(
  "/book",
  AppointmentMiddleware.validateBookAppointment,
  appointmentController.bookAppointment,
);

export default router;
