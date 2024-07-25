import { Request, Response } from 'express';
import { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking, getBookingsByUserId, createGroupBooking, getGroupBookings, updateBookingStatus, updateUserBookingStatus,updateAllUserBookingStatus } from '../services/booking.service';
import { sendRegistrationEmail } from '../config/mailer'
import { registerUser, loginUser, resetPassword } from '../services/user.service';
import { User } from '../interfaces/user';
/**
 * Controller to handle getting all bookings
 * @param req 
 * @param res 
 */
const getAll = async (req: Request, res: Response) => {
  try {
    const bookings = await getAllBookings();
    res.status(200).json(bookings);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle getting a booking by ID
 * @param req 
 * @param res 
 */
const getById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const booking = await getBookingById(parseInt(id, 10));
    res.status(200).json(booking);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle creating a new booking
 * @param req 
 * @param res 
 */
const create = async (req: Request, res: Response) => {
  try {
    const booking = await createBooking(req.body);
    
    res.status(201).json(booking);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle updating a booking
 * @param req 
 * @param res 
 */
const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const booking = await updateBooking(parseInt(id, 10), req.body);
    res.status(200).json(booking);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controller to handle deleting a booking
 * @param req 
 * @param res 
 */
const remove = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const booking = await deleteBooking(parseInt(id, 10));
    res.status(200).json(booking);
  } catch (error:any) {
    res.status(400).json({ error: error.message });
  }
};

export { getAll, getById, create, update, remove };


/**
 * Controller to handle getting all bookings by user ID
 * @param req 
 * @param res 
 */
const getByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const bookings = await getBookingsByUserId(parseInt(userId, 10));
    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { getByUserId };



/**
 * Controller to handle updating booking status
 * @param req 
 * @param res 
 */
const changeBookingStatus = async (req: Request, res: Response) => {
  const { bookingId } = req.params;
  const { status } = req.body;
  try {
    const updatedBooking = await updateBookingStatus(parseInt(bookingId, 10), status);
    res.status(200).json(updatedBooking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { changeBookingStatus };




/**
 * Controller to handle updating booking status for a specific user's specific booking
 * @param req 
 * @param res 
 */
const changeUserBookingStatus = async (req: Request, res: Response) => {
  const { userId, bookingId } = req.params;
  const { status } = req.body;
  try {
    const updatedBooking = await updateUserBookingStatus(parseInt(userId, 10), parseInt(bookingId, 10), status);
    res.status(200).json(updatedBooking);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { changeUserBookingStatus };



/**
 * Controller to handle updating booking status for a specific user
 * @param req 
 * @param res 
 */
const changeAllUserBookingStatus = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { status } = req.body;
  try {
    await updateAllUserBookingStatus(parseInt(userId, 10), status);
    res.status(200).json({ message: 'Booking status updated successfully' });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export {changeAllUserBookingStatus };






/**
 * Controller to handle creating group bookings for multiple users
 * @param req 
 * @param res 
 */
const createGroup = async (req: Request, res: Response) => {
  try {
    const success = await createGroupBooking(req.body);
    if (success) {
      res.status(201).json({ message: 'Group bookings created successfully' });
    } else {
      res.status(400).json({ error: 'Failed to create all group bookings' });
    }
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export { createGroup };


/**
 * Controller to handle getting group bookings by user ID and event ID
 * @param req 
 * @param res 
 */
const getGroup = async (req: Request, res: Response) => {
  const { userId, eventId } = req.params;
  try {
    const bookings = await getGroupBookings(parseInt(userId, 10), parseInt(eventId, 10));
    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export {  getGroup };

