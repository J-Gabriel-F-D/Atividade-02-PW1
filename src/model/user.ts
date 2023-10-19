import { Technologie } from "./technologie";

export type User = {
  id: string;
  name: string;
  username: string;
  technologies: Technologie[];
};
