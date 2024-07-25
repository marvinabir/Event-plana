import { Router } from 'express';
import { getAll, getById, create, update, remove, getByEventId } from '../controllers/ticketType.controller';
import roleMiddleware from '../middlewares/role.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import { Role } from '../interfaces/role.enum';

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);
router.get('/event/:eventId', getByEventId);
export default router;

// authMiddleware, roleMiddleware(Role.EVENT_MANAGER),