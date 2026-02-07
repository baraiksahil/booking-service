import express from "express";
import serviceRouter from "./service.router.js";
const router = express.Router();

router.use("/services", serviceRouter);

export default router;
