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

router.get(
  "/:id",
  ServiceMiddleware.validateServiceId,
  serviceController.getService,
);

router.delete(
  "/:id",
  ServiceMiddleware.validateServiceId,
  serviceController.deleteService,
);

router.patch(
  "/:id",
  ServiceMiddleware.validateServiceId,
  ServiceMiddleware.validateServicePartialUpdate,
  serviceController.updateService,
);

export default router;
