import express, { Request, Response, NextFunction } from "express";
import { Quake } from "../model/quake.model";
import { connectDB } from "../util/db";

const router = express.Router();

router.get("/getData", async (req: Request, res: Response) => {
  try {
    // Establish database connection
    await connectDB(); // Ensure this function connects to the correct database (test DB in MarsMoon cluster)

    // Retrieve all documents from the 'catalog' collection (which is mapped to the Quake model)
    const quakeData = await Quake.find();

    // Check if data is empty
    // if (!quakeData || quakeData.length === 0) {
    //   return res.status(404).json({ error: "No data found in the catalog" });
    // }

    // Return the retrieved quake data
    res.status(200).json(quakeData);
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getData/:id", async (req: Request, res: Response) => {
  try {
    await connectDB();
    console.log(req.params.id);
    const quake = await Quake.findById(req.params.id);
    // if (!quake) {
    //   return res.status(404).json({ error: "Quake not found" });
    // }
    console.log(quake);
    res.status(200).json(quake);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/getDataByYear/:year", async (req: Request, res: Response) => {
  try {
    await connectDB();

    const year = parseInt(req.params.year);

    // Calculate the start and end dates for the given year
    const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${year + 1}-01-01T00:00:00.000Z`);

    // Query to find quakes within the specified year based on time_abs
    const quakes = await Quake.find({
      time_abs: {
        $gte: startOfYear.toISOString(),  // Time as ISO string
        $lt: endOfYear.toISOString(),
      }
    });

    console.log(quakes);
    res.status(200).json(quakes);
  } catch (error) {
    console.error("Error fetching quake data by year:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/getDataByTimeRange", async (req: Request, res: Response) => {
  try {
    console.log("Full Request Body:", req.body);
    await connectDB();
    
    const { start, end } = req.body;
    
    // if (!start || !end) {
    //   return res.status(400).json({ error: "Start and end times are required" });
    // }

    const startTime = new Date(start);
    const endTime = new Date(end);

    const quakes = await Quake.find({
      time_abs: {
        $gte: startTime.toISOString(),
        $lt: endTime.toISOString(),
      },
    });

    res.status(200).json(quakes);
  } catch (error: any) {
    console.error("Error fetching quake data by time range:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});


export default router;
