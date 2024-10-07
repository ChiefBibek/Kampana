import express, { Request, Response } from "express";
import { MarsEvent } from "../model/mars.model";
import { connectDB } from "../util/db";

const router = express.Router();

// Mars Events Routes
router.get("/mars/getData", async (req: Request, res: Response) => {
  try {
    await connectDB();
    const marsData = await MarsEvent.find();
    res.status(200).json(marsData);
  } catch (error) {
    console.error("Error retrieving Mars data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/mars/getData/:id", async (req: Request, res: Response) => {
  try {
    await connectDB();
    console.log(req.params.id);
    const marsEvent = await MarsEvent.findById(req.params.id);
    res.status(200).json(marsEvent);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/mars/getDataByYear/:year", async (req: Request, res: Response) => {
  try {
    await connectDB();
    console.log(req.params.year);
    const year = parseInt(req.params.year);
    const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
    const endOfYear = new Date(`${year + 1}-01-01T00:00:00.000Z`);

    const marsEvents = await MarsEvent.find({
      time_abs: {
        $gte: startOfYear.toISOString(),
        $lt: endOfYear.toISOString(),
      }
    });

    res.status(200).json(marsEvents);
  } catch (error) {
    console.error("Error fetching Mars event data by year:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//MOST IMPORTANT ROUTE
router.post(
  "/mars/getDataByTimeRange",
  async (req: Request, res: Response) => {
    try {
      console.log("Full Request Body:", req.body);
      await connectDB();
      const { start, end } = req.body;

      // Create start and end dates, setting time to beginning and end of day respectively
      const startDate = new Date(start);
      startDate.setHours(0, 0, 0, 0);

      const endDate = new Date(end);
      endDate.setHours(23, 59, 59, 999);

      const marsEvents = await MarsEvent.find({
        time_abs: {
          $gte: startDate.toISOString(),
          $lte: endDate.toISOString(),
        },
      });

      res.status(200).json(marsEvents);
    } catch (error: any) {
      console.error("Error fetching Lunar event data by time range:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
);

export default router;