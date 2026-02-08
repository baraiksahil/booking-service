import CrudRepository from "./crud.repository.js";
import { slotModel } from "../model/index.js";

class SlotRepository extends CrudRepository {
  constructor() {
    super(slotModel);
  }

  // finding slot for specific service for specific date
  // Eg. Dr. Smitha on Monday.
  async findAll(filter) {
    // filter = { serviceId: "...", date: "2026-02-12" }
    const reposnse = await this.model.find(filter);
    return reposnse;
  }

  // for Bulk Create
  async createMany(data) {
    const reposnse = await this.model.insertMany(data);
    return reposnse;
  }
}

export default SlotRepository;
