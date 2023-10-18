import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";

const users = [] as User[];

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

const seachUser = (username: string) => {
  const user = users.find((user) => user.username === username);
  if (user) {
    return user;
  }
};

// Midleware
function checkExistsUserAccount(
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

const app = express();

const PORT = 3000;

app.use(express.json());

app.post("/users", (req: Request, res: Response) => {
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

app.get(
  "/technologies",
  checkExistsUserAccount,
  (req: Request, res: Response) => {
    const { username } = req.headers;
    const user = users.find((user) => user.username === username);
    return res.status(200).json(user?.technologies);
  }
);

app.post(
  "/technologies",
  checkExistsUserAccount,
  (req: Request, res: Response) => {
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
  }
);

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
