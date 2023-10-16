import express, { Request, Response } from "express";

const app = express();

const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  return res.send("<h1>Teste</h1>");
});

app.listen(PORT, () => console.log(`Server is Running on port: ${PORT}`));
