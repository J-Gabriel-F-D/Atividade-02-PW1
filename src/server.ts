import express from "express";
import { technologieController } from "./route/technologyRoute";
import { userRoute } from "./route/userRoute";
require("dotenv").config;

const app = express();

const PORT = process.env.API_PORT;

app.use(express.json());

app.use("/technologies", technologieController);
app.use("/users", userRoute);

app.listen(PORT, () => console.log(`Server is Running on port: ${PORT}`));
