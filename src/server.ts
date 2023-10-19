import express from "express";
import { User } from "./model/user";
import { technologieController } from "./route/technologieRoute";
import { userRoute } from "./route/userRoute";
export const users = [] as User[];

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/technologies", technologieController);
app.use("/users", userRoute);

app.listen(PORT, () => console.log(`Server is Running on port: ${PORT}`));
