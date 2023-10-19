import { users } from "../server";

export const seachUser = (username: string) => {
  const user = users.find((user) => user.username === username);
  if (user) {
    return user;
  }
};
