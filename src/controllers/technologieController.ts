import { seachUser } from "./userController";

export const technologieExist = (id: string, username: string) => {
  const technologie = seachTechnologie(id, username);
  if (!technologie) {
    return false;
  }
  return true;
};

export const seachAllTechnologie = (usename: string) => {
  return seachUser(usename)?.technologies;
};
export const seachTechnologie = (id: string, username: string) => {
  const technologies = seachUser(username as string)?.technologies;
  const technologie = technologies?.find((tech) => tech.id === id);
  if (!technologie) {
    return false;
  }
  return technologie;
};
export const updateTechnologie = (
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
