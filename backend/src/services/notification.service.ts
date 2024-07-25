import prisma from "../config/database";
import { Notification } from '../interfaces/notification';

/**
 * Function to get all notifications
 * @returns 
 */
const getAllNotifications = async (): Promise<Notification[]> => {
  try {
    const notifications = await prisma.notification.findMany();
    return notifications.map(notification => ({
      ...notification,
      eventId: notification.eventId ?? undefined, // convert null to undefined
    }));
  } catch (error: any) {
    throw new Error(`Error retrieving notifications: ${error.message}`);
  }
};

/**
 * Function to get notification by ID
 * @param id 
 * @returns 
 */
const getNotificationById = async (id: number): Promise<Notification | null> => {
  try {
    const notification = await prisma.notification.findUnique({
      where: { id },
    });
    return notification ? { ...notification, eventId: notification.eventId ?? undefined } : null;
  } catch (error: any) {
    throw new Error(`Error retrieving notification: ${error.message}`);
  }
};

/**
 * Function to create a new notification
 * @param notificationData 
 * @returns 
 */
const createNotification = async (notificationData: Notification): Promise<Notification> => {
  const { userId, eventId, message } = notificationData;
  try {
    const notification = await prisma.notification.create({
      data: {
        userId,
        eventId: eventId ?? null, // convert undefined to null
        message,
      },
    });
    return { ...notification, eventId: notification.eventId ?? undefined };
  } catch (error: any) {
    throw new Error(`Error creating notification: ${error.message}`);
  }
};

/**
 * Function to update an existing notification
 * @param id 
 * @param notificationData 
 * @returns 
 */
const updateNotification = async (id: number, notificationData: Partial<Notification>): Promise<Notification> => {
  const { userId, eventId, message } = notificationData;
  try {
    const notification = await prisma.notification.update({
      where: { id },
      data: {
        userId,
        eventId: eventId ?? null, // convert undefined to null
        message,
      },
    });
    return { ...notification, eventId: notification.eventId ?? undefined };
  } catch (error: any) {
    throw new Error(`Error updating notification: ${error.message}`);
  }
};

/**
 * Function to delete a notification
 * @param id 
 * @returns 
 */
const deleteNotification = async (id: number): Promise<Notification> => {
  try {
    const notification = await prisma.notification.delete({
      where: { id },
    });
    return { ...notification, eventId: notification.eventId ?? undefined };
  } catch (error: any) {
    throw new Error(`Error deleting notification: ${error.message}`);
  }
};

export { getAllNotifications, getNotificationById, createNotification, updateNotification, deleteNotification };
