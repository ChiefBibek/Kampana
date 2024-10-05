import express, { Request, Response, NextFunction } from "express";
import { Quake } from "../model/quake.model";
import { connectDB } from "../util/db";

const router = express.Router();

router.get("/getData/:id", async (req: Request, res: Response) => {
  try {
    connectDB();

    const quake = await Quake.findById(req.params.id);
    // if (!quake) {
    //   return res.status(404).json({ error: "Quake not found" });
    // }
    res.json(quake);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
