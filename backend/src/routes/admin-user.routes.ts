import { Router } from 'express';
import { getAllUsers, getSingleUser, deleteUser, updateUserRole } from '../controllers/admin-user.controller';
import roleMiddleware from '../middlewares/role.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import { Role } from '../interfaces/role.enum';

const router = Router();

router.get('/users', authMiddleware, roleMiddleware(Role.SUPER_ADMIN),  getAllUsers);
router.get('/users/:id',  authMiddleware, roleMiddleware(Role.SUPER_ADMIN), getSingleUser);
router.delete('/users/:id',  authMiddleware, roleMiddleware(Role.SUPER_ADMIN), deleteUser);
router.put('/users/:id/role',  authMiddleware, roleMiddleware(Role.SUPER_ADMIN), updateUserRole);
export default router;
