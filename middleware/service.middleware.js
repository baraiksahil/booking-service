import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app.error.js";

function validateServiceRequest(req, res, next) {
  if (
    !req.body.name ||
    !req.body.adminId ||
    !req.body.price ||
    !req.body.openingTime ||
    !req.body.closingTime ||
    !req.body.type ||
    !["Clinic", "Salon", "Consultancy"].includes(req.body.type)
  ) {
    ErrorResponse.message = "Something went wrong while creating the service";
    ErrorResponse.error = new AppError(
      ["Model body not found in the oncoming request in the correct form"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

export default {
  validateServiceRequest,
};
