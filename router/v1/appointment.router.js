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

// PATCH /api/v1/appointments/:id/cancel
router.patch(
  "/:id/cancel",
  AppointmentMiddleware.validateCancelAppointment,
  appointmentController.cancelAppointment,
);

// Route: GET /api/v1/appointments?userId=...
router.get(
  "/",
  AppointmentMiddleware.validateGetUserAppointments,
  appointmentController.getUserAppointments,
);

export default router;
