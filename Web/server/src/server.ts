import express, { Request, Response } from "express";
import quakeRoutes from './route/quake.route';
import dotenv from 'dotenv';
import path from 'path';
import cors from 'cors';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API routes
app.use("/api/quake", quakeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
});