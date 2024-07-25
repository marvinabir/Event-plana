import prisma from "../config/database";
import { Analytics } from '../controllers/analytics';

/**
 * Function to get all analytics
 * @returns 
 */
const getAllAnalytics = async (): Promise<Analytics[]> => {
  try {
    return await prisma.analytics.findMany();
  } catch (error: any) {
    throw new Error(`Error retrieving analytics: ${error.message}`);
  }
};

/**
 * Function to get analytics by ID
 * @param id 
 * @returns 
 */
const getAnalyticsById = async (id: number): Promise<Analytics | null> => {
  try {
    return await prisma.analytics.findUnique({
      where: { id },
    });
  } catch (error: any) {
    throw new Error(`Error retrieving analytics: ${error.message}`);
  }
};

/**
 * Function to create new analytics
 * @param analyticsData 
 * @returns 
 */
const createAnalytics = async (analyticsData: Analytics): Promise<Analytics> => {
  const { eventId, totalBookings, revenue } = analyticsData;
  try {
    return await prisma.analytics.create({
      data: {
        eventId,
        totalBookings,
        revenue,
      },
    });
  } catch (error: any) {
    throw new Error(`Error creating analytics: ${error.message}`);
  }
};

/**
 * Function to update existing analytics
 * @param id 
 * @param analyticsData 
 * @returns 
 */
const updateAnalytics = async (id: number, analyticsData: Partial<Analytics>): Promise<Analytics> => {
  const { eventId, totalBookings, revenue } = analyticsData;
  try {
    return await prisma.analytics.update({
      where: { id },
      data: {
        eventId,
        totalBookings,
        revenue,
      },
    });
  } catch (error: any) {
    throw new Error(`Error updating analytics: ${error.message}`);
  }
};

/**
 * Function to delete analytics
 * @param id 
 * @returns 
 */
const deleteAnalytics = async (id: number): Promise<Analytics> => {
  try {
    return await prisma.analytics.delete({
      where: { id },
    });
  } catch (error: any) {
    throw new Error(`Error deleting analytics: ${error.message}`);
  }
};

export { getAllAnalytics, getAnalyticsById, createAnalytics, updateAnalytics, deleteAnalytics };
