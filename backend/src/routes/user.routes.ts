import { Router } from 'express';
import { register, login, reset } from '../controllers/user.controller';
import roleMiddleware from '../middlewares/role.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import { Role } from '../interfaces/role.enum';


const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset',authMiddleware, roleMiddleware(Role.ATTENDEE), reset);

export default router;
