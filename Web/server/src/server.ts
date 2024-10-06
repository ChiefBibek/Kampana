import express, { Request, Response } from "express";
import marsRoute from './route/mars.route';  // Your API routes
import lunarRoute from './route/lunar.route';  // Your API routes
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

// Load environment variables from .env
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory (e.g., chart.html, chart.js)
app.use(express.static(path.join(__dirname, '../public')));

// Define an additional route to serve the chart page
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/chart.html'));
});

// API routes
app.use("/api/quake", lunarRoute);
app.use("/api/quake", marsRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
});
