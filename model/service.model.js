import mongoose from "mongoose";
import { Enum } from "../utils/common/index.js";

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(Enum.SERVICE_TYPES),
    },
    adminId: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },
    slotDuration: {
      type: Number,
      default: 30,
      required: true,
    },

    openingTime: {
      type: String,
      required: true,
    },
    closingTime: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

const service = mongoose.model("Service", serviceSchema);

export default service;
