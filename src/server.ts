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

// Functions
const technologieExist = (id: string, username: string) => {
  const technologie = seachTechnologie(id, username);
  if (!technologie) {
    return false;
  }
  return true;
};

const seachAllTechnologie = (usename: string) => {
  return seachUser(usename)?.technologies;
};
const seachTechnologie = (id: string, username: string) => {
  const user = seachUser(username as string);
  const technologie = users.find(() => {
    user?.technologies.find((tech: Technologie) => tech.id === id);
  });
  if (!technologie) {
    return false;
  }
  return technologie as unknown as Technologie;
};
const updateTechnologie = (
  id: string,
  username: string,
  title: string,
  deadline: Date
) => {
  const user = seachUser(username as string);
  if (!technologieExist(id, username)) {
    return false;
  }
  user?.technologies.map((tech) => {
    if (tech.id === id) {
      tech.title = title;
      tech.deadline = deadline;
    }
  });
  return true;
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
    return res.status(200).json(seachAllTechnologie(username as string));
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

app.put(
  "/technologies/:id",
  checkExistsUserAccount,
  (req: Request, res: Response) => {
    const { username } = req.headers;
    const { id } = req.params;
    const { title, deadline } = req.body;
    if (!title && !deadline) {
      return res
        .status(400)
        .json({ message: "title or deadline are required" });
    }
    const updateTech = updateTechnologie(
      id,
      username as string,
      title,
      deadline
    );
    if (!updateTech) {
      return res.status(404).json({ message: "Technologie not found" });
    }

    return res.status(204).send();
  }
);

app.patch(
  "/technologies/:id/studied",
  checkExistsUserAccount,
  (req: Request, res: Response) => {
    const { username } = req.headers;
    const { id } = req.params;
    const user = seachUser(username as string);
    if (!technologieExist) {
      return res.status(404).json({ message: "Bad Request" });
    }
    user?.technologies.map((tech: Technologie) => {
      if (tech.id === id) {
        tech.studied = true;
      }
    });
    return res.status(204).send();
  }
);

app.delete(
  "/technologies/:id",
  checkExistsUserAccount,
  (req: Request, res: Response) => {
    const { username } = req.headers;
    const { id } = req.params;
    const user = seachUser(username as string);
    if (!technologieExist(id, username as string)) {
      return res.status(404).json({ message: "Bad Request" });
    }
    const technologie = seachTechnologie(id, username as string);
    const index = user?.technologies.indexOf(technologie as Technologie);
    user?.technologies.splice(index!, 1);
    return res.status(204).send();
  }
);

app.listen(PORT, () => console.log(`Server is Running on port: ${PORT}`));
