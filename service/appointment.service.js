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

  async cancelAppointment(appointmentId, userId) {
    // A. Find the appointment
    const appointment = await this.appointmentRepository.getById(appointmentId);

    if (!appointment) {
      throw new AppError("Appointment not found", StatusCodes.NOT_FOUND);
    }

    // B. Security Check: Ensure the user owns this appointment
    // (Disable this check if an ADMIN is cancelling)
    if (appointment.userId !== userId) {
      throw new AppError(
        "You are not authorized to cancel this appointment",
        StatusCodes.UNAUTHORIZED,
      );
    }

    // C. Check if already cancelled
    if (appointment.status === Enum.APPOINTMENT_STATUS.CANCELLED) {
      throw new AppError(
        "Appointment is already cancelled",
        StatusCodes.BAD_REQUEST,
      );
    }

    // D. Update Appointment Status -> CANCELLED
    const cancelledAppt = await this.appointmentRepository.update(
      appointmentId,
      {
        status: Enum.APPOINTMENT_STATUS.CANCELLED,
      },
    );

    // E. Free up the Slot (Make it AVAILABLE again)
    await this.slotRepository.releaseSlot(appointment.slotId);

    return cancelledAppt;
  }
}

export default AppointmentService;
