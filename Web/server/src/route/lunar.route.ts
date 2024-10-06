import express, { Request, Response } from "express";
import { LunarEvent } from "../model/lunar.model";
import { connectDB } from "../util/db";

const router = express.Router();

// Lunar Events Routes
router.get("/lunar/getData", async (req: Request, res: Response) => {
  try {
    await connectDB();
    const lunarData = await LunarEvent.find();
    res.status(200).json(lunarData);
  } catch (error) {
    console.error("Error retrieving Lunar data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/lunar/getData/:id", async (req: Request, res: Response) => {
  try {
    await connectDB();
    console.log(req.params.id);
    const lunarEvent = await LunarEvent.findById(req.params.id);
    res.status(200).json(lunarEvent);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get(
  "/lunar/getDataByYear/:year",
  async (req: Request, res: Response) => {
    try {
      await connectDB();
      const year = parseInt(req.params.year);
      const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
      const endOfYear = new Date(`${year + 1}-01-01T00:00:00.000Z`);

      const lunarEvents = await LunarEvent.find({
        time_abs: {
          $gte: startOfYear.toISOString(),
          $lt: endOfYear.toISOString(),
        },
      });

      res.status(200).json(lunarEvents);
    } catch (error) {
      console.error("Error fetching Lunar event data by year:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//MOST IMPORTANT ROUTE
router.post(
  "/lunar/getDataByTimeRange",
  async (req: Request, res: Response) => {
    try {
      console.log("Full Request Body:", req.body);
      await connectDB();

      const { start, end } = req.body;
      const startTime = new Date(start);
      const endTime = new Date(end);

      const lunarEvents = await LunarEvent.find({
        time_abs: {
          $gte: startTime.toISOString(),
          $lt: endTime.toISOString(),
        },
      });

      res.status(200).json(lunarEvents);
    } catch (error: any) {
      console.error("Error fetching Lunar event data by time range:", error);
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
);

export default router;
