import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export type Technologie = {
  id: string;
  title: string;
  studied: boolean;
  deadline: Date;
  created_at: Date;
};

export type User = {
  id: string;
  name: string;
  username: string;
  technologies: Technologie[];
};

const users = [] as User[];

const app = express();

const PORT = 3000;

app.use(express.json());

app.post("/users", (req, res) => {
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

// app.get("/technologies", (req: Request, res: Response) => {
//   return;
// });

// app.post("/technologies", (req: Request, res: Response) => {
//   return;
// });

// app.put("/technologies/:id", (req: Request, res: Response) => {
//   return;
// });

// app.patch("/technologies/:id/studied", (req: Request, res: Response) => {
//   return;
// });

// app.delete("/technologies/:id", (req: Request, res: Response) => {
//   return;
// });

app.listen(PORT, () => console.log(`Server is Running on port: ${PORT}`));
