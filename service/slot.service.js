import { StatusCodes } from "http-status-codes";
import { ServiceRepository, SlotRepository } from "../repository/index.js";
import { Enum } from "../utils/common/index.js";
import { DateTimeHelpers } from "../utils/helper/index.js";
import AppError from "../utils/error/app.error.js";

class SlotService {
  constructor() {
    this.slotRepository = new SlotRepository();
    this.serviceRepository = new ServiceRepository();
  }

  async generateSlot(serviceId, date) {
    const service = await this.serviceRepository.getById(serviceId);
    if (!service) {
      throw new AppError("Service not found", StatusCodes.NOT_FOUND);
    }

    const existingSlots = await this.slotRepository.findAll({
      serviceId,
      date,
    });
    if (existingSlots.length > 0) {
      throw new AppError(
        "Slots already generated for this date",
        StatusCodes.CONFLICT,
      );
    }

    const slots = [];

    // USE HELPER: "09:00" -> 540
    let currentTime = DateTimeHelpers.timeToMinutes(service.openingTime);
    const endTime = DateTimeHelpers.timeToMinutes(service.closingTime);
    const duration = service.slotDuration;

    // total time should be less than end time
    while (currentTime + duration <= endTime) {
      //  USE HELPER: 540 -> "09:00"
      const startStr = DateTimeHelpers.minutesToTime(currentTime);
      const endStr = DateTimeHelpers.minutesToTime(currentTime + duration);

      // temporary storing the data into memory for faster ranther than calling db repetadely
      slots.push({
        serviceId: serviceId,
        date: date,
        startTime: startStr,
        endTime: endStr,
        status: Enum.SLOT_STATUS.AVAILABLE,
      });

      // moving the pointer to the old time to new time
      currentTime += duration;
    }
    const response = await this.slotRepository.createMany(slots);
    return response;
  }

  async getSlots(serviceId, date) {
    if (!serviceId || !date) {
      throw new AppError(
        "Service ID and Date are required",
        StatusCodes.BAD_REQUEST,
      );
    }
    const slots = await this.slotRepository.findAll({ serviceId, date });
    return slots;
  }
}

export default SlotService;
