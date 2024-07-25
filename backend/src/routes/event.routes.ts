import { Router } from 'express';
import { getAll, getById, create, update, remove } from '../controllers/event.controller';
import roleMiddleware from '../middlewares/role.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import { Role } from '../interfaces/role.enum';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', authMiddleware, roleMiddleware(Role.EVENT_MANAGER), create);
router.put('/:id', authMiddleware, roleMiddleware(Role.EVENT_MANAGER), update);
router.delete('/:id', authMiddleware, roleMiddleware(Role.EVENT_MANAGER), remove);

export default router;
