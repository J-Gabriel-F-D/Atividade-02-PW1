import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import { checkExistsUserAccount } from "../middleware/checkExistsUserAccount";
import {
  seachAllTechnologie,
  seachTechnologie,
  technologieExist,
  updateTechnologie,
} from "../controllers/technologieController";
import { Technologie } from "../model/technologie";
import { seachUser } from "../controllers/userController";
const router = Router();

router.get("/", checkExistsUserAccount, (req: Request, res: Response) => {
  const { username } = req.headers;
  return res.status(200).json(seachAllTechnologie(username as string));
});

router.post("/", checkExistsUserAccount, (req: Request, res: Response) => {
  const { user } = req;
  const { title, deadline } = req.body;

  const technologie: Technologie = {
    id: uuidv4(),
    created_at: new Date(),
    studied: false,
    deadline: new Date(deadline),
    title: title,
  };
  user.technologies.push(technologie);
  return res.status(201).json(technologie);
});

router.put("/:id", checkExistsUserAccount, (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;
  const { title, deadline } = req.body;
  if (!title && !deadline) {
    return res.status(400).json({ message: "title or deadline are required" });
  }
  const updateTech = updateTechnologie(
    id,
    username as string,
    title,
    new Date(deadline)
  );
  if (!updateTech) {
    return res.status(404).json({ message: "Technologie not found" });
  }

  return res.status(204).send(console.log("Sucesso"));
});

router.patch(
  "/:id/studied",
  checkExistsUserAccount,
  (req: Request, res: Response) => {
    const { username } = req.headers;
    const { id } = req.params;
    const user = seachUser(username as string);
    if (!technologieExist(id, username as string)) {
      return res.status(404).json({ message: "Technologie not found" });
    }
    const alterTech = seachTechnologie(id, username as string);
    user?.technologies.map((tech: Technologie) => {
      if (tech.id === id) {
        tech.studied = true;
      }
    });
    return res.status(204).json(alterTech as Technologie);
  }
);

router.delete("/:id", checkExistsUserAccount, (req: Request, res: Response) => {
  const { username } = req.headers;
  const { id } = req.params;
  const user = seachUser(username as string);
  if (!technologieExist(id, username as string)) {
    return res.status(404).json({ message: "Technologie not found" });
  }
  const technologie = seachTechnologie(id, username as string);
  const index = user?.technologies.indexOf(technologie as Technologie);
  user?.technologies.splice(index!, 1);
  return res.status(204).send();
});

export { router as technologieController };
