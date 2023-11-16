import { Response, Request, NextFunction } from "express";
import { seachUser } from "../controllers/userController";

export const checkExistsUserAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username } = req.headers;
  const user = await seachUser(username as string);

  if (!user) {
    return res.status(400).json({ erro: "User not found" });
  }
  next();
};
