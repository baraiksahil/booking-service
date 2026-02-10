import { StatusCodes } from "http-status-codes";
import { AppointmentRepository, SlotRepository } from "../repository/index.js";
import { Enum } from "../utils/common/index.js";
import AppError from "../utils/error/app.error.js";

class AppointmentService {
  constructor() {
    this.appointmentRepository = new AppointmentRepository();
    this.slotRepository = new SlotRepository();
  }

  async bookAppointment(data) {
    // data = { userId, serviceId, slotId }

    // 1. Check if the Slot exists
    const slot = await this.slotRepository.getById(data.slotId);
    if (!slot) {
      throw new AppError("Slot not found", StatusCodes.NOT_FOUND);
    }

    // 2. Check availability
    // If it is BOOKED, LOCKED, or CANCELLED, reject the request
    if (slot.status !== Enum.SLOT_STATUS.AVAILABLE) {
      throw new AppError(
        "Slot is already booked or unavailable",
        StatusCodes.CONFLICT,
      );
    }

    // 3. Mark the Slot as BOOKED
    // We update the inventory first so no one else can grab it
    await this.slotRepository.update(data.slotId, {
      status: Enum.SLOT_STATUS.BOOKED,
    });

    // 4. Create the Appointment Ticket
    const appointment = await this.appointmentRepository.create({
      userId: data.userId,
      serviceId: data.serviceId,
      slotId: data.slotId,
      status: Enum.APPOINTMENT_STATUS.BOOKED,
    });

    return appointment;
  }
}

export default AppointmentService;
