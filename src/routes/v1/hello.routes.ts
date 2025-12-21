import { Router } from "express";

import * as helloController from "../../controllers/hello.controller";

import { API_ROUTES } from "../../types/routes";

const router = Router();

// GET /api/v1/hello
router.get(
  API_ROUTES.HELLO.ROUTES.HELLO_WORLD, helloController.helloWorldHandler
);

export default router;
