import { StatusCodes } from "http-status-codes";
import AppError from "../utils/error/app.error.js";

class CrudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const result = await this.model.create(data);
    return result;
  }

  async getAll() {
    const result = await this.model.find({});
    return result;
  }

  async getById(id) {
    const result = await this.model.findById(id);
    if (!result) {
      throw new AppError("Unable to find the resource.", StatusCodes.NOT_FOUND);
    }
    return result;
  }

  async destroy(id) {
    const result = await this.model.findByIdAndDelete(id);
    if (!result) {
      throw new AppError("Unable to find the resource.", StatusCodes.NOT_FOUND);
    }
    return result;
  }

  async update(id, data) {
    const result = await this.model.findByIdAndUpdate(id, data, { new: true });
    if (!result) {
      throw new AppError("Unable to find the resource.", StatusCodes.NOT_FOUND);
    }
    return result;
  }
}

export default CrudRepository;
