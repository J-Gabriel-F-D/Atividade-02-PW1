import { Router, Request, Response } from "express";
import { users } from "../server";
import { User } from "../model/user";
import { v4 as uuidv4 } from "uuid";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { name, username } = req.body;

  const userExist = users.some((user) => user.username === username);
  if (userExist) {
    return res.status(400).json({ message: "Error: user exists" });
  }
  const newUser: User = {
    name,
    username,
    id: uuidv4(),
    technologies: [],
  };
  users.push(newUser);
  return res.status(201).json(newUser);
});

export { router as userRoute };
