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

    // uses the atomic method we made in the repository
    // This tries to find an AVAILABLE slot and lock it in one single database operation.
    const lockedSlot = await this.slotRepository.bookSlot(data.slotId);

    // If it returns null, it means someone else beat us to it (or it doesn't exist)
    if (!lockedSlot) {
      throw new AppError(
        "Slot is unavailable or already booked",
        StatusCodes.CONFLICT,
      );
    }

    // Now we are safe to create the ticket
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

  async getUserAppointments(userId) {
    const appointments =
      await this.appointmentRepository.getUserAppointments(userId);
    return appointments;
  }
}

export default AppointmentService;
