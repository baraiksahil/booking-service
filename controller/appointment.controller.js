import { StatusCodes } from "http-status-codes";
import { AppointmentService } from "../service/index.js";
import { SuccessResponse, ErrorResponse } from "../utils/common/index.js";

const appointmentService = new AppointmentService();

/**
 * POST /appointments/book
 * Req Body: { "userId": "...", "serviceId": "...", "slotId": "..." }
 */
async function bookAppointment(req, res) {
  try {
    const response = await appointmentService.bookAppointment({
      userId: req.body.userId,
      serviceId: req.body.serviceId,
      slotId: req.body.slotId,
    });

    SuccessResponse.data = response;

    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function cancelAppointment(req, res) {
  try {
    const response = await appointmentService.cancelAppointment(
      req.params.id,
      req.body.userId,
    );

    SuccessResponse.data = response;
    SuccessResponse.message = "Appointment cancelled successfully";
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
      .status(error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponse);
  }
}

export default {
  bookAppointment,
  cancelAppointment,
};
