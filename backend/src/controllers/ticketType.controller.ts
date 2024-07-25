import { Request, Response } from 'express';
import { getAllTicketTypes, getTicketTypeById, createTicketType, updateTicketType, deleteTicketType, getTicketTypesByEventId } from '../services/ticketType.service';

/**
 * Controller to handle getting all ticket types
 * @param req 
 * @param res 
 */
const getAll = async (req: Request, res: Response) => {
  try {
    const ticketTypes = await getAllTicketTypes();
    res.status(200).json(ticketTypes);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle getting a ticket type by ID
 * @param req 
 * @param res 
 */
const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticketType = await getTicketTypeById(parseInt(id, 10));
    res.status(200).json(ticketType);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle creating a new ticket type
 * @param req 
 * @param res 
 */
const create = async (req: Request, res: Response) => {
  try {
    const ticketType = await createTicketType(req.body);
    res.status(201).json(ticketType);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle updating a ticket type
 * @param req 
 * @param res 
 */
const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticketType = await updateTicketType(parseInt(id, 10), req.body);
    res.status(200).json(ticketType);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle deleting a ticket type
 * @param req 
 * @param res 
 */
const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ticketType = await deleteTicketType(parseInt(id, 10));
    res.status(200).json(ticketType);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export { getAll, getById, create, update, remove };


/**
 * Controller to handle getting ticket types by event ID
 * @param req 
 * @param res 
 */
const getByEventId = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  try {
    const ticketTypes = await getTicketTypesByEventId(parseInt(eventId, 10));
    res.status(200).json(ticketTypes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
// **Added code ends here**

export { getByEventId };