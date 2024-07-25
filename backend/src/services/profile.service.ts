import prisma from "../config/database";

/**
 * Function to get a user profile by ID
 * @param id 
 * @returns 
 */
const getUserProfile = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error: any) {
    throw error;
  }
};

/**
 * Function to update a user profile
 * @param id 
 * @param data 
 * @returns 
 */
const updateUserProfile = async (id: number, data: { name?: string; email?: string }) => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    return updatedUser;
  } catch (error: any) {
    throw error;
  }
};

export { getUserProfile, updateUserProfile };
