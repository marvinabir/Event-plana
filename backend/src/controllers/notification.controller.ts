import { Request, Response } from 'express';
import { getAllNotifications, getNotificationById, createNotification, updateNotification, deleteNotification } from '../services/notification.service';

/**
 * Controller to handle getting all notifications
 * @param req 
 * @param res 
 */
const getAll = async (req: Request, res: Response) => {
  try {
    const notifications = await getAllNotifications();
    res.status(200).json(notifications);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle getting a notification by ID
 * @param req 
 * @param res 
 */
const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notification = await getNotificationById(parseInt(id, 10));
    res.status(200).json(notification);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle creating a new notification
 * @param req 
 * @param res 
 */
const create = async (req: Request, res: Response) => {
  try {
    const notification = await createNotification(req.body);
    res.status(201).json(notification);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle updating a notification
 * @param req 
 * @param res 
 */
const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notification = await updateNotification(parseInt(id, 10), req.body);
    res.status(200).json(notification);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle deleting a notification
 * @param req 
 * @param res 
 */
const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notification = await deleteNotification(parseInt(id, 10));
    res.status(200).json(notification);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export { getAll, getById, create, update, remove };
