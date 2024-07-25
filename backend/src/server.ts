import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import eventRoutes from "./routes/event.routes";
import userRoutes from "./routes/user.routes";
import profileRoutes from "./routes/profile.routes";
import bookingRoutes from "./routes/booking.routes";
import ticketTypeRoutes from "./routes/ticketType.routes";
import notificationRoutes from "./routes/notification.routes";
import analyticsRoutes from "./routes/analytics.routes";
import adminUserRoutes from "./routes/admin-user.routes";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Configure CORS
 */
const corsOptions = {
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  // credentials : true,
};

app.use(cors(corsOptions));

/**
 * Middleware to parse JSON requests
 */
app.use(express.json());

/**
 * Routes
 */
// Add the user routes
app.use('/users', userRoutes);

// Add the admin-user routes
app.use('/admin', adminUserRoutes);

// Add the profile routes
app.use('/profiles', profileRoutes);

// Add the event routes
app.use('/events', eventRoutes);

// Add the booking routes
app.use('/bookings', bookingRoutes);

// Add the ticket type routes
app.use('/ticketTypes', ticketTypeRoutes);

// Add the notification routes
app.use('/notifications', notificationRoutes);

// Add the analytics routes
app.use('/analytics', analyticsRoutes);

/**
 * Start the server
 */
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});