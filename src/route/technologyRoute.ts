import { Router } from "express";
import { Request, Response } from "express";
import { checkExistsUserAccount } from "../middleware/checkExistsUserAccount";
import {
  seachAllTechnologies,
  seachTechnology,
  technologyExist,
  updateTechnology,
  creatNewTechnology,
  deleteTechnology,
} from "../controllers/technologyController";
import { Technology } from "../model/technology";
import { seachUser } from "../controllers/userController";
const router = Router();

// Creiando um novo usuário
router.get("/", checkExistsUserAccount, async (req: Request, res: Response) => {
  const { username } = req.headers;
  try {
    const technologies = await seachAllTechnologies(username as string);
    return res.status(200).json(technologies);
  } catch (error) {
    return res.status(500).json({ erro: "Internal Server Error" });
  }
});

// Criando uma nova technologia
router.post(
  "/",
  checkExistsUserAccount,
  async (req: Request, res: Response) => {
    const { username } = req.headers;
    const { title, deadline } = req.body;
    try {
      const newTechnology = creatNewTechnology(
        username as string,
        title,
        deadline
      );
      if (!newTechnology) {
        res.status(400).json({ erro: "Erro ao criar uma nova technologia" });
      }

      res.status(201).json({
        id: (await newTechnology).id,
        title: (await newTechnology).title,
        studied: (await newTechnology).studied,
        deadline: (await newTechnology).deadline,
        created_at: (await newTechnology).created_at,
        userId: (await newTechnology).userId,
      });
    } catch (error) {
      console.log("Erro ao criar technologia: ", error);
      throw error;
    }
  }
);

// Atualizando o title e a deadline da technologia
router.put(
  "/:id",
  checkExistsUserAccount,
  async (req: Request, res: Response) => {
    const { username } = req.headers;
    const { id } = req.params;
    const { title, deadline } = req.body;
    if (!title && !deadline) {
      return res.status(400).json({ erro: "title or deadline are required" });
    }
    try {
      const updateTech = await updateTechnology(
        id,
        username as string,
        title,
        deadline
      );
      if (!updateTech) {
        return res.status(404).json({ erro: "Technologie not found" });
      }

      return res.status(204).send(console.log("Sucesso"));
    } catch (error) {
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }
);

// Atualizando o status da technologia
router.patch(
  "/:id/studied",
  checkExistsUserAccount,
  async (req: Request, res: Response) => {
    const { username } = req.headers;
    const { id } = req.params;

    try {
      const user = await seachUser(username as string);

      if (!technologyExist(id, username as string)) {
        return res.status(404).json({ erro: "Technologie not found" });
      }
      user?.technologies.map((tech: Technology) => {
        if (tech.id === id) {
          tech.studied = true;
        }
      });
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }
);

// deletar uma technologia
router.delete(
  "/:id",
  checkExistsUserAccount,
  async (req: Request, res: Response) => {
    const { username } = req.headers;
    const { id } = req.params;

    try {
      const technology = await seachTechnology(id, username as string);
      if (!technology) {
        return res.status(404).json({ erro: "Technologia não encontrada" });
      }
      await deleteTechnology(id);

      return res.status(204).send();
    } catch (error) {
      console.error("Erro ao deletar uma technologia:", error);
      return res.status(500).json({ erro: "Erro interno do servidor" });
    }
  }
);

export { router as technologieController };
