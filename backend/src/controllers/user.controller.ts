import { Request, Response } from 'express';
import { registerUser, loginUser, resetPassword } from '../services/user.service';
import { sendRegistrationEmail } from '../config/mailer'

/**
 * Controller to handle user registration
 * @param req 
 * @param res 
 */
const register = async (req: Request, res: Response) => {
  const { email, password, name, role } = req.body;
  try {
    const newUser = await registerUser(email, password, name, role);
    await sendRegistrationEmail(email, name);
    res.status(201).json(newUser);
  } 
  
  
  
  
    catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle user login
 * @param req 
 * @param res 
 */
const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

// /**
//  * Controller to handle password reset
//  * @param req 
//  * @param res 
//  */
// const reset = async (req: Request, res: Response) => {
//   const { email, newPassword } = req.body;
//   try {
//     const success = await resetPassword(email, newPassword);
//     if (success) {
//       res.status(200).json({ message: 'Password reset successfully' });
//     } else {
//       res.status(400).json({ error: 'Failed to reset password' });
//     }
//   } catch (error:any) {
//     res.status(400).json({ error: error.message });
//   }
// };





/**
 * Controller to handle password reset
 * @param req 
 * @param res 
 */
const reset = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ error: 'Email and new password are required' });
  }

  try {
    const success = await resetPassword(email, newPassword);
    if (success) {
      res.status(200).json({ message: 'Password reset successfully' });
    } else {
      res.status(400).json({ error: 'Failed to reset password' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
export { register, login, reset };
