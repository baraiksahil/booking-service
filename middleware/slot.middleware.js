import { StatusCodes } from "http-status-codes";
import { ErrorResponse } from "../utils/common/index.js";
import AppError from "../utils/error/app.error.js";
import mongoose from "mongoose";

function validateSlotGeneration(req, res, next) {
  // 1. Check Service ID
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

  // 2. Check Date Presence
  if (!req.body.date) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Date is required (YYYY-MM-DD)"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // 3. Check Date Format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(req.body.date)) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Date must be in YYYY-MM-DD format"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // 4. Check Past Dates
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to midnight
  const inputDate = new Date(req.body.date);

  if (inputDate < today) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Cannot generate slots for past dates"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  next();
}

function validateGetSlots(req, res, next) {
  // 1. Check Service ID
  if (!req.query.serviceId) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Service ID is required"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  if (!mongoose.Types.ObjectId.isValid(req.query.serviceId)) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Invalid Service ID format"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // 2. Check Date Presence
  if (!req.query.date) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Date is required (YYYY-MM-DD)"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }

  // 3. Check Date Format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(req.query.date)) {
    ErrorResponse.message = "Invalid Request";
    ErrorResponse.error = new AppError(
      ["Date must be in YYYY-MM-DD format"],
      StatusCodes.BAD_REQUEST,
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}

export default {
  validateSlotGeneration,
  validateGetSlots,
};
