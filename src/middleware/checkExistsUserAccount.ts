import { Response, Request, NextFunction } from "express";
import { seachUser } from "../controllers/userController";

export function checkExistsUserAccount(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username } = req.headers;
  const user = seachUser(String(username));

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  req.user = user;
  next();
}
