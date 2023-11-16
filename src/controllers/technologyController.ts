import { seachUser } from "./userController";
import { prisma } from "../database/repositoryUser";

export const technologyExist = async (id: string, username: string) => {
  try {
    const user = await seachUser(username);
    if (!user) {
      return false;
    }

    const technologies = user.technologies.find((tech) => tech.id === id);
    return !!technologies;
  } catch (error) {
    console.log("Erro ao checar se a technologie existe: ", error);
    throw error;
  }
};

export const seachAllTechnologies = async (username: string) => {
  try {
    const user = await seachUser(username);
    return user?.technologies || [];
  } catch (error) {
    console.log("Erro ao buscar todas as tecnhologies: ", error);
    throw error;
  }
};

export const seachTechnology = async (id: string, username: string) => {
  try {
    const technologies = await seachAllTechnologies(username as string);
    const technologie = technologies?.find((tech) => tech.id === id);
    if (!technologie) {
      return false;
    }
    return technologie;
  } catch (error) {
    console.log("Erro buscar por technologia: ", error);
    throw error;
  }
};

export const updateTechnology = async (
  id: string,
  username: string,
  title: string,
  deadline: Date
) => {
  try {
    const user = await seachUser(username as string);
    if (!(await technologyExist(id, username))) {
      return false;
    }
    const technology = await seachTechnology(id, username as string);

    const updatedTech = await prisma.technologies.update({
      where: {
        id,
        userId: user?.id,
      },
      data: {
        title,
        deadline: new Date(deadline),
      },
    });
    return true;
  } catch (error) {
    console.log("Erro ao atualizar a technologia: ", error);
    throw error;
  }
};

export const creatNewTechnology = async (
  username: string,
  title: string,
  deadline: string
) => {
  try {
    const user = await seachUser(username as string);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    const createdTechnology = await prisma.technologies.create({
      data: {
        title,
        deadline: new Date(deadline),
        User: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return createdTechnology;
  } catch (error) {
    console.log("Erro ao criar nova tecnologia:", error);
    throw error;
  }
};

export const deleteTechnology = async (technologyId: string) => {
  try {
    const deletedTechnology = await prisma.technologies.delete({
      where: {
        id: technologyId,
      },
    });
    return deletedTechnology;
  } catch (error) {
    console.log("Erro ao deletar technologia:", error);
    throw error;
  }
};
