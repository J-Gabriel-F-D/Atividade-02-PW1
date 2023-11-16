import { Router, Request, Response } from "express";
import { createUser, seachUser } from "../controllers/userController";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const { name, username } = req.body;
  try {
    const userExist = await seachUser(username as string);
    if (userExist) {
      return res.status(400).json({ erro: "Usuário ja existe " });
    }
    const newUser = await createUser(name, username as string);
    res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ erro: "Erro interno do servidor" });
  }
});

export { router as userRoute };
