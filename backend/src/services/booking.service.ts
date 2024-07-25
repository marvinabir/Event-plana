import prisma from "../config/database";
import { Booking } from '../interfaces/booking';

/**
 * Function to get all bookings
 * @returns 
 */
const getAllBookings = async (): Promise<Booking[]> => {
  try {
    return await prisma.booking.findMany();
  } catch (error: any) {
    throw new Error(`Error retrieving bookings: ${error.message}`);
  }
};

/**
 * Function to get a booking by ID
 * @param id 
 * @returns 
 */
const getBookingById = async (id: number): Promise<Booking | null> => {
  try {
    return await prisma.booking.findUnique({
      where: { id },
    });
  } catch (error: any) {
    throw new Error(`Error retrieving booking: ${error.message}`);
  }
};

/**
 * Function to create a new booking
 * @param bookingData 
 * @returns 
 */
const createBooking = async (bookingData: Booking): Promise<Booking> => {
  const { userId, eventId, ticketTypeId, status } = bookingData;
  try {
    return await prisma.booking.create({
      data: {
        userId,
        eventId,
        ticketTypeId:Number(ticketTypeId),
        status,
      },
    });
  } catch (error: any) {
    throw new Error(`Error creating booking: ${error.message}`);
  }
};

/**
 * Function to update an existing booking
 * @param id 
 * @param bookingData 
 * @returns 
 */
const updateBooking = async (id: number, bookingData: Partial<Booking>): Promise<Booking> => {
  const { userId, eventId, ticketTypeId, status } = bookingData;
  try {
    return await prisma.booking.update({
      where: { id },
      data: {
        userId,
        eventId,
        ticketTypeId,
        status,
      },
    });
  } catch (error: any) {
    throw new Error(`Error updating booking: ${error.message}`);
  }
};

/**
 * Function to delete a booking
 * @param id 
 * @returns 
 */
const deleteBooking = async (id: number): Promise<Booking> => {
  try {
    return await prisma.booking.delete({
      where: { id },
    });
  } catch (error: any) {
    throw new Error(`Error deleting booking: ${error.message}`);
  }
};

export { getAllBookings, getBookingById, createBooking, updateBooking, deleteBooking };


/**
 * Function to get all bookings by user ID
 * @param userId 
 * @returns 
 */
const getBookingsByUserId = async (userId: number): Promise<Booking[]> => {
  try {
    return await prisma.booking.findMany({
      where: { userId },
    });
  } catch (error: any) {
    throw new Error(`Error retrieving bookings for user: ${error.message}`);
  }
};

export {  getBookingsByUserId };


/**
 * Function to update booking status
 * @param bookingId 
 * @param status 
 * @returns 
 */
const updateBookingStatus = async (bookingId: number, status: 'CONFIRMED' | 'CANCELLED'): Promise<Booking> => {
  try {
    return await prisma.booking.update({
      where: { id: bookingId },
      data: { status, updatedAt: new Date() },
    });
  } catch (error: any) {
    throw new Error(`Error updating booking status: ${error.message}`);
  }
};

export { updateBookingStatus };



/**
 * Function to update booking status for a specific user's specific booking
 * @param userId 
 * @param bookingId 
 * @param status 
 * @returns 
 */
const updateUserBookingStatus = async (userId: number, bookingId: number, status: 'CONFIRMED' | 'CANCELLED'): Promise<Booking> => {
  try {
    const booking = await prisma.booking.findFirst({
      where: { id: bookingId, userId },
    });
    if (!booking) {
      throw new Error('Booking not found');
    }
    return await prisma.booking.update({
      where: { id: bookingId },
      data: { status, updatedAt: new Date() },
    });
  } catch (error: any) {
    throw new Error(`Error updating booking status: ${error.message}`);
  }
};

export { updateUserBookingStatus };



/**
 * Function to update booking status for a specific user
 * @param userId 
 * @param status 
 * @returns 
 */
const updateAllUserBookingStatus = async (userId: number, status: 'CONFIRMED' | 'CANCELLED'): Promise<void> => {
  try {
    await prisma.booking.updateMany({
      where: { userId },
      data: { status, updatedAt: new Date() },
    });
  } catch (error: any) {
    throw new Error(`Error updating booking status: ${error.message}`);
  }
};

export {  updateAllUserBookingStatus };




/**
 * Function to create group bookings for multiple users
 * @param bookingDataList 
 * @returns 
 */
const createGroupBooking = async (bookingDataList: Booking[]): Promise<boolean> => {
  try {
    const result = await prisma.booking.createMany({
      data: bookingDataList.map((bookingData) => ({
        userId: bookingData.userId,
        eventId: bookingData.eventId,
        ticketTypeId: bookingData.ticketTypeId,
        status: bookingData.status,
      })),
    });
    return result.count === bookingDataList.length;
  } catch (error: any) {
    throw new Error(`Error creating group bookings: ${error.message}`);
  }
};

export { createGroupBooking };

/**
 * Function to get group bookings by user ID and event ID
 * @param userId 
 * @param eventId 
 * @returns 
 */
const getGroupBookings = async (userId: number, eventId: number): Promise<Booking[]> => {
  try {
    return await prisma.booking.findMany({
      where: {
        userId,
        eventId,
      },
    });
  } catch (error: any) {
    throw new Error(`Error retrieving group bookings: ${error.message}`);
  }
};

export {  getGroupBookings };


