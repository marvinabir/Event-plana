import { Request, Response } from 'express';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../services/event.service';

/**
 * Controller to handle getting all events
 * @param req 
 * @param res 
 */
const getAll = async (req: Request, res: Response) => {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle getting an event by ID
 * @param req 
 * @param res 
 */
const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await getEventById(parseInt(id, 10));
    res.status(200).json(event);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle creating a new event
 * @param req 
 * @param res 
 */
const create = async (req: Request, res: Response) => {
  try {
    const event = await createEvent(req.body);
    res.status(201).json(event);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle updating an event
 * @param req 
 * @param res 
 */
const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await updateEvent(parseInt(id, 10), req.body);
    res.status(200).json(event);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle deleting an event
 * @param req 
 * @param res 
 */
const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const event = await deleteEvent(parseInt(id, 10));
    res.status(200).json(event);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export { getAll, getById, create, update, remove };
