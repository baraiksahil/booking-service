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
      // for validation error
      if (error.name === "ValidationError") {
        throw new AppError("Invalid Service Data", StatusCodes.BAD_REQUEST);
      }
      throw new AppError(
        "Something went wrong while creating service.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getServices() {
    try {
      const response = await this.serviceRepository.getAll();
      return response;
    } catch (error) {
      throw new AppError(
        "Something went wrong while fetching service.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getService(id) {
    try {
      const response = await this.serviceRepository.getById(id);
      return response;
    } catch (error) {
      // for handling bad request
      if (error instanceof AppError) {
        throw error;
      }

      throw new AppError(
        "Something went wrong while fetching service.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteService(id) {
    try {
      const response = await this.serviceRepository.destroy(id);
      return response;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      console.log(error);
      throw new AppError(
        "Something went wrong while fetching service.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateService(id, data) {
    try {
      const response = await this.serviceRepository.update(id, data);
      return response;
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      if (error.name === "ValidationError") {
        throw new AppError("Invalid data for update", StatusCodes.BAD_REQUEST);
      }
      throw new AppError(
        "Something went wrong while fetching service.",
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

export default ServiceService;
