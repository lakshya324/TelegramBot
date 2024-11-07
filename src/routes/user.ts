import express, { Router, Request, Response, NextFunction } from "express";
import * as userController from "../controllers/user";

const router: Router = express.Router();

//* Default Response [GET /]
router.get("/", userController.defaultResponse);

//* Link User [POST /link/:uuid]
router.get("/link/:uuid", userController.linkUser);

export default router;
