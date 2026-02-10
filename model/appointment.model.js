import mongoose from "mongoose";
import { Enum } from "../utils/common/index.js";

const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: String, // Ideally an ObjectId, but String works for now mock user
      required: true,
    },
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Slot",
      required: true,
      unique: true, // Ensures a slot can only be booked ONCE
    },
    status: {
      type: String,
      enum: Object.values(Enum.APPOINTMENT_STATUS), // [PENDING, COMPLETED, CANCELLED]
      default: Enum.APPOINTMENT_STATUS.PENDING,
    },
  },
  { timestamps: true },
);

const appointment = mongoose.model("Appointment", appointmentSchema);
export default appointment;
