import prisma from "../config/database";
import { Event } from '../interfaces/event';

/**
 * Function to get all events
 * @returns 
 */
const getAllEvents = async (): Promise<Event[]> => {
  try {
    const events = await prisma.event.findMany({
      include: { ticketTypes: true },
    });
    return events.map(event => ({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      price: event.price,
      managerId: event.managerId,
      ticketTypes: event.ticketTypes,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    }));
  } catch (error: any) {
    throw new Error(`Error retrieving events: ${error.message}`);
  }
};

/**
 * Function to get an event by ID
 * @param id 
 * @returns 
 */
const getEventById = async (id: number): Promise<Event | null> => {
  try {
    const event = await prisma.event.findUnique({
      where: { id },
      include: { ticketTypes: true },
    });
    if (!event) return null;
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      price: event.price,
      managerId: event.managerId,
      ticketTypes: event.ticketTypes,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  } catch (error: any) {
    throw new Error(`Error retrieving event: ${error.message}`);
  }
};

/**
 * Function to create a new event
 * @param eventData 
 * @returns 
 */
const createEvent = async (eventData: Event): Promise<Event> => {
  const { title, description, location, price, date, time, image, ticketTypes, managerId } = eventData;
  try {
    const event = await prisma.event.create({
      data: {
        title,
        description,
        location,
        price,
        date,
        time,
        image,
        managerId,
        ticketTypes: {
          create: ticketTypes,
        },
      },
      include: { ticketTypes: true },
    });
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      price: event.price,
      managerId: event.managerId,
      ticketTypes: event.ticketTypes,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  } catch (error: any) {
    throw new Error(`Error creating event: ${error.message}`);
  }
};

/**
 * Function to update an existing event
 * @param id 
 * @param eventData 
 * @returns 
 */
const updateEvent = async (id: number, eventData: Partial<Event>): Promise<Event> => {
  const { title, description, location, price, date, time, image, ticketTypes, managerId } = eventData;
  try {
    const event = await prisma.event.update({
      where: { id },
      data: {
        title,
        description,
        location,
        price,
        date: date ? new Date(date) : undefined,
        time: time ? new Date(time) : undefined,
        image,
        managerId,
        ticketTypes: ticketTypes ? {
          deleteMany: {},
          create: ticketTypes,
        } : undefined,
      },
      include: { ticketTypes: true },
    });
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      price: event.price,
      managerId: event.managerId,
      ticketTypes: event.ticketTypes,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  } catch (error: any) {
    throw new Error(`Error updating event: ${error.message}`);
  }
};

/**
 * Function to delete an event
 * @param id 
 * @returns 
 */
const deleteEvent = async (id: number): Promise<Event> => {
  try {
    const event = await prisma.event.delete({
      where: { id },
      include: { ticketTypes: true },
    });
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      image: event.image,
      price: event.price,
      managerId: event.managerId,
      ticketTypes: event.ticketTypes,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  } catch (error: any) {
    throw new Error(`Error deleting event: ${error.message}`);
  }
};

export { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
