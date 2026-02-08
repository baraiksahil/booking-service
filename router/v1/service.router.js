import express from "express";

import { serviceController } from "../../controller/index.js";
import { ServiceMiddleware } from "../../middleware/index.js";

const router = express.Router();

router.post(
  "/",
  ServiceMiddleware.validateServiceRequest,
  serviceController.createService,
);
router.get("/", serviceController.getAllService);

export default router;
