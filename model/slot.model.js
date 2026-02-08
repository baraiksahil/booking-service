import mongoose from "mongoose";
import { Enum } from "../utils/common/index.js";

const slotSchema = new mongoose.Schema(
  {
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(Enum.SLOT_STATUS),
      default: Enum.SLOT_STATUS.AVAILABLE,
    },
  },
  { timestamps: true },
);

// Index for fast searching
slotSchema.index({ serviceId: 1, date: 1 });

const slot = mongoose.model("Slot", slotSchema);
export default slot;
