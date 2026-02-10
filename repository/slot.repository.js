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

  // for atomic operation: Find & Update in one shot
  async bookSlot(slotId) {
    // This query says: "Find a slot with this ID AND status = AVAILABLE"
    // If someone else booked it 1ms ago, the status is BOOKED, so this finds NOTHING.
    const response = await this.model.findOneAndUpdate(
      {
        _id: slotId,
        status: "AVAILABLE", // Hardcoded enum string or use Enum.SLOT_STATUS.AVAILABLE
      },
      { status: "BOOKED" }, // Change to BOOKED
      { new: true }, // Return the updated document
    );

    return response; // If null, it means the slot was already taken.
  }

  // To free a slot (Cancellation)
  async releaseSlot(slotId) {
    const response = await this.model.findByIdAndUpdate(
      slotId,
      { status: "AVAILABLE" },
      { new: true },
    );
    return response;
  }
}

export default SlotRepository;
