import { Technology } from "./technology";

export type User = {
  id: string;
  name: string;
  username: string;
  technologies: Technology[];
};
