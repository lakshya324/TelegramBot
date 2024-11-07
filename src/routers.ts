import express, { Router, Request, Response, NextFunction } from "express";
import { AuthRequest, StatusError } from "./types/types";

import userRoutes from "./routes/user";

const router: Router = express.Router();

//! Log Middleware
router.use((req: AuthRequest, res: Response, next: NextFunction) => {
  console.log("\x1b[33m%s\x1b[0m", `API > ${req.method} ${req.url}`);
  next();
});


//! Routes
router.use("/", userRoutes);

//! 404 Middleware
router.use((req: Request, res: Response, next: NextFunction) => {
  const error = new Error("Not Found") as StatusError;
  error.statusCode = 404;
  next(error);
});

//! Error Handling Middleware
router.use(
  (error: StatusError, req: AuthRequest, res: Response, next: NextFunction) => {
    const status = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    res.status(status).json({ success: false, message: message });
  }
);

export default router;
