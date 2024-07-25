import { Request, Response } from "express";
import { getAllUsersService, getSingleUserService, deleteUserService, updateUserRoleService } from "../services/admin-user.service";

/**
 * Controller to get all users
 * @param req 
 * @param res 
 */
const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to get a single user
 * @param req 
 * @param res 
 */
const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await getSingleUserService(parseInt(id));
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to delete a user
 * @param req 
 * @param res 
 */
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUserService(parseInt(id));
    if (deletedUser) {
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { getAllUsers, getSingleUser, deleteUser };

/**
 * Controller to update the role of a user
 * @param req
 * @param res
 */
const updateUserRole = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { role } = req.body;

  try {
    const updatedUser = await updateUserRoleService(parseInt(id), role);
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { updateUserRole };