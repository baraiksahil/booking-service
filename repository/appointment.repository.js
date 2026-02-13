import CrudRepository from "./crud.repository.js";
import { appointmentModel } from "../model/index.js";

class AppointmentRepository extends CrudRepository {
  constructor() {
    super(appointmentModel);
  }

  // Find all appointments for a specific user
  // async getUserAppointments(userId) {
  //   const response = await this.model.find({ userId: userId });
  //   return response;
  // }

  async getUserAppointments(userId) {
    const response = await this.model
      .find({ userId: userId })
      // 1. Get service details (eg. "Dr. Smith")
      .populate({
        path: "serviceId",
        select: "name address description",
      })
      // 2. Get slot details (e.g., "10:00 AM")
      .populate({
        path: "slotId",
        select: "date startTime endTime status",
      })
      // 3. Sort the newest first
      .sort({ createdAt: -1 });
    return response;
  }
}

export default AppointmentRepository;
