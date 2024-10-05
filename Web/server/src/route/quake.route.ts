// quake.route.ts
import express, { Request, Response } from "express";
import { quakeController } from "../controller/quake.controller";

const router = express.Router();

router.get("/", async (req, res, next) => {
  await quakeController.getQuake(req, res, next);
});
router.post("/createQuake", quakeController.createQuake);
export { router as quakeRouter };
