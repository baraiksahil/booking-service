import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app.error.js";
import mongoose from "mongoose";

function validateServiceRequest(req, res, next) {
  // 1. Check Name
  if (!req.body.name) {
    ErrorResponse.message = "Something went wrong while creating the service";
    ErrorResponse.error = new AppError(
      ["Service name is required"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // 2. Check Admin ID
  if (!req.body.adminId) {
    ErrorResponse.message = "Something went wrong while creating the service";
    ErrorResponse.error = new AppError(
      ["Admin ID is required"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // 3. Check Price (Must exist AND be a number)
  if (!req.body.price || isNaN(req.body.price)) {
    ErrorResponse.message = "Something went wrong while creating the service";
    ErrorResponse.error = new AppError(
      ["Price is required and must be a valid number"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // 4. Check Type (Must exist AND be in the list)
  const allowedTypes = ["Clinic", "Salon", "Consultancy"];
  if (!req.body.type || !allowedTypes.includes(req.body.type)) {
    ErrorResponse.message = "Something went wrong while creating the service";
    ErrorResponse.error = new AppError(
      [
        `Service type is required and must be one of: ${allowedTypes.join(", ")}`,
      ],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // 5. Check Opening Time
  if (!req.body.openingTime) {
    ErrorResponse.message = "Something went wrong while creating the service";
    ErrorResponse.error = new AppError(
      ["Opening time is required (e.g., '09:00')"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // 6. Check Closing Time
  if (!req.body.closingTime) {
    ErrorResponse.message = "Something went wrong while creating the service";
    ErrorResponse.error = new AppError(
      ["Closing time is required (e.g., '17:00')"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateServiceId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    ErrorResponse.message = "Invalid Service ID";
    ErrorResponse.error = new AppError(
      ["The ID provided is not a valid MongoDB ObjectId"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

function validateServicePartialUpdate(req, res, next) {
  if (!req.body || Object.keys(req.body).length === 0) {
    ErrorResponse.message = "Failed to update service";
    ErrorResponse.error = new AppError(
      ["Request body cannot be empty for updates"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

export default {
  validateServiceRequest,
  validateServiceId,
  validateServicePartialUpdate,
};
