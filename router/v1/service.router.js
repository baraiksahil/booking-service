import express from "express";

import serviceController from "../../controller/index.js";

const router = express.Router();

router.post("/", serviceController.serviceController.createService);

export default router;
