import { Request, Response } from 'express';
import { getUserProfile, updateUserProfile } from '../services/profile.service';

/**
 * Controller to handle getting a user profile
 * @param req 
 * @param res 
 */
const getProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userProfile = await getUserProfile(parseInt(id, 10));
    res.status(200).json(userProfile);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle updating a user profile
 * @param req 
 * @param res 
 */
const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const updatedProfile = await updateUserProfile(parseInt(id, 10), { name, email });
    res.status(200).json(updatedProfile);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export { getProfile, updateProfile };
