import prisma from "../config/database";
import { User } from '../interfaces/user';
import { Role } from "../interfaces/role.enum";
/**
 * Function to get all users
 * @returns 
 */
const getAllUsersService = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

/**
 * Function to get a single user by ID
 * @param userId 
 * @returns 
 */
const getSingleUserService = async (userId: number): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id: userId },
  });
};

/**
 * Function to delete a user
 * @param userId 
 * @returns 
 */


/* Function to delete a user
 * @param userId
 * @returns
 */
const deleteUserService = async (userId: number): Promise<User | null> => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

export { getAllUsersService, getSingleUserService, deleteUserService };

/* Function to update the role of a user
 * @param userId
 * @param newRole
 * @returns
 */
const updateUserRoleService = async (userId: number, newRole: Role): Promise<User | null> => {
  return await prisma.user.update({
    where: { id: userId },
    data: { role: newRole, updatedAt: new Date() },
  });
};

export { updateUserRoleService }


