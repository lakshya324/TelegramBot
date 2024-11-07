import { Request, Response, NextFunction } from "express";
import { AuthRequest, StatusError } from "../types/types";
import {UserLinkDB} from "../models/user.link";

export function defaultResponse(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  res.send("Please go to the bot to generate your unique link.");
}

export async function linkUser(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const uuid = req.params.uuid;

  try {
    const userLink = await UserLinkDB.findOne({ uuid });
    if (userLink) {
      res.send(`Telegram User ID: ${userLink.telegramUserId}`);
    } else {
      res.status(404).send("Invalid link.");
    }
  } catch (err) {
    console.error("Error fetching user link:", err);
    res.status(500).send("Server error");
  }
}
