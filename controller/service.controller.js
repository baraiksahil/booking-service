import { StatusCodes } from "http-status-codes";
import { SuccessResponse, ErrorResponse } from "../utils/common/index.js";
import { ServiceService } from "../service/index.js";

const serviceService = new ServiceService();

async function createService(req, res) {
  try {
    const response = await serviceService.createService(req.body);
    SuccessResponse.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

async function getAllService(req, res) {
  try {
    const response = await serviceService.getServices();
    SuccessResponse.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

export default {
  createService,
  getAllService,
};
