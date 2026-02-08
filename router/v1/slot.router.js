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

export default router;
