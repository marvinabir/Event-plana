import prisma from "../config/database";
import { TicketType } from "../interfaces/ticketType";

/**
 * Function to get all ticket types
 * @returns
 */
const getAllTicketTypes = async (): Promise<TicketType[]> => {
  try {
    return await prisma.ticketType.findMany();
  } catch (error: any) {
    throw new Error(`Error retrieving ticket types: ${error.message}`);
  }
};

/**
 * Function to get a ticket type by ID
 * @param id
 * @returns
 */
const getTicketTypeById = async (id: number): Promise<TicketType | null> => {
  try {
    return await prisma.ticketType.findUnique({
      where: { id },
    });
  } catch (error: any) {
    throw new Error(`Error retrieving ticket type: ${error.message}`);
  }
};

/**
 * Function to create a new ticket type
 * @param ticketTypeData
 * @returns
 */
const createTicketType = async (
  ticketTypeData: TicketType
): Promise<TicketType> => {
  const { type, price, availability, eventId } = ticketTypeData;
  try {
    return await prisma.ticketType.create({
      data: {
        type,
        price,
        availability,
        eventId: eventId,
      },
    });
  } catch (error: any) {
    throw new Error(`Error creating ticket type: ${error.message}`);
  }
};

/**
 * Function to update an existing ticket type
 * @param id
 * @param ticketTypeData
 * @returns
 */
const updateTicketType = async (
  id: number,
  ticketTypeData: Partial<TicketType>
): Promise<TicketType> => {
  const { type, price, availability, eventId } = ticketTypeData;
  try {
    return await prisma.ticketType.update({
      where: { id },
      data: {
        type,
        price,
        availability,
        eventId: eventId,
      },
    });
  } catch (error: any) {
    throw new Error(`Error updating ticket type: ${error.message}`);
  }
};

/**
 * Function to delete a ticket type
 * @param id
 * @returns
 */
const deleteTicketType = async (id: number): Promise<TicketType> => {
  try {
    return await prisma.ticketType.delete({
      where: { id },
    });
  } catch (error: any) {
    throw new Error(`Error deleting ticket type: ${error.message}`);
  }
};

export {
  getAllTicketTypes,
  getTicketTypeById,
  createTicketType,
  updateTicketType,
  deleteTicketType,
};


/**
 * Function to get ticket types by event ID
 * @param eventId
 * @returns
 */
const getTicketTypesByEventId = async (eventId: number): Promise<TicketType[]> => {
  try {
    return await prisma.ticketType.findMany({
      where: { eventId },
    });
  } catch (error: any) {
    throw new Error(`Error retrieving ticket types: ${error.message}`);
  }
};
// **Added code ends here**

export {getTicketTypesByEventId };
