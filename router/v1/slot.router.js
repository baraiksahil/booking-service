import express from "express";
import { slotController } from "../../controller/index.js";
import { SlotMiddlware } from "../../middleware/index.js";
const router = express.Router();

// Route: POST /api/v1/slots/generate
router.post(
  "/generate",
  SlotMiddlware.validateSlotGeneration,
  slotController.generateSlot,
);

// Route: GET /api/v1/slots?serviceId=...&date=...
router.get("/", SlotMiddlware.validateGetSlots, slotController.getSlots);

export default router;
