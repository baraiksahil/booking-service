import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app.error.js";
import mongoose from "mongoose";

function validateBookAppointment(req, res, next) {
  // 1. Check User ID (Assuming it's in body for now)
  if (!req.body.userId) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["User ID is required"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // 2. Check Service ID
  if (!req.body.serviceId) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Service ID is required"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!mongoose.Types.ObjectId.isValid(req.body.serviceId)) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Invalid Service ID format"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // 3. Check Slot ID
  if (!req.body.slotId) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Slot ID is required"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!mongoose.Types.ObjectId.isValid(req.body.slotId)) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Invalid Slot ID format"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateCancelAppointment(req, res, next) {
  // 1. Check Appointment ID (from URL params)
  if (!req.params.id) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Appointment ID is required in URL"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Invalid Appointment ID format"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // 2. Check User ID (from Body)
  if (!req.body.userId) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["User ID is required to verify ownership"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

export default {
  validateBookAppointment,
  validateCancelAppointment,
};
