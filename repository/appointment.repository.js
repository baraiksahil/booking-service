import CrudRepository from "./crud.repository.js";
import { appointmentModel } from "../model/index.js";

class AppointmentRepository extends CrudRepository {
  constructor() {
    super(appointmentModel);
  }

  // Find all appointments for a specific user
  async getUserAppointments(userId) {
    const response = await this.model.find({ userId: userId });
    return response;
  }
}

export default AppointmentRepository;
