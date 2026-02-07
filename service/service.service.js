import { StatusCodes } from "http-status-codes";
import { ServiceRepository } from "../repository/index.js";
import AppError from "../utils/error/app.error.js";

class ServiceService {
  constructor() {
    this.serviceRepository = new ServiceRepository();
  }
  async createService(data) {
    try {
      const response = await this.serviceRepository.create(data);
      return response;
    } catch (error) {
      console.log(error);
      throw new AppError(
        "Something went wrong while creating service.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default ServiceService;
