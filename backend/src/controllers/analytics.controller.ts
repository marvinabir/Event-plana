import { Request, Response } from 'express';
import { getAllAnalytics, getAnalyticsById, createAnalytics, updateAnalytics, deleteAnalytics } from '../services/analytics.service';

/**
 * Controller to handle getting all analytics
 * @param req 
 * @param res 
 */
const getAll = async (req: Request, res: Response) => {
  try {
    const analytics = await getAllAnalytics();
    res.status(200).json(analytics);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle getting analytics by ID
 * @param req 
 * @param res 
 */
const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const analytics = await getAnalyticsById(parseInt(id, 10));
    res.status(200).json(analytics);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle creating new analytics
 * @param req 
 * @param res 
 */
const create = async (req: Request, res: Response) => {
  try {
    const analytics = await createAnalytics(req.body);
    res.status(201).json(analytics);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle updating analytics
 * @param req 
 * @param res 
 */
const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const analytics = await updateAnalytics(parseInt(id, 10), req.body);
    res.status(200).json(analytics);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle deleting analytics
 * @param req 
 * @param res 
 */
const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const analytics = await deleteAnalytics(parseInt(id, 10));
    res.status(200).json(analytics);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export { getAll, getById, create, update, remove };
