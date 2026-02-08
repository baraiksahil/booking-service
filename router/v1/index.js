import express from "express";
import serviceRouter from "./service.router.js";
import slotRouter from "./slot.router.js";
const router = express.Router();

router.use("/services", serviceRouter);
router.use("/slots", slotRouter);

export default router;
