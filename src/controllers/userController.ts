import { prisma } from "../database/repositoryUser";

// Buscara usuário pelo nome
export const seachUser = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
        technologies: true,
      },
    });
    return user;
  } catch (error) {
    console.log("Erro ao procurar o usuário: ", error);
    throw error;
  }
};

// Criando um novo usuário
export const createUser = async (name: string, username: string) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
      },
    });
    return newUser;
  } catch (error) {
    console.log("Erro ao criar novo usuário:", error);
    throw error;
  }
};
