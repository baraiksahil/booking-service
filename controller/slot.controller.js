import { StatusCodes } from "http-status-codes";
import { SlotService } from "../service/index.js";
import { ErrorResponse, SuccessResponse } from "../utils/common/index.js";

const slotService = new SlotService();

/**
 * Controller to generate slots for a specific service and date
 * POST /api/v1/slots/generate
 * Body: { "serviceId": "...", "date": "2026-02-12" }
 */
async function generateSlot(req, res) {
  try {
    const response = await slotService.generateSlot(
      req.body.serviceId,
      req.body.date,
    );
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

export default {
  generateSlot,
};
