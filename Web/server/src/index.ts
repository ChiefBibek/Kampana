import express, { Request, Response } from "express";
import quakeRoutes from './route/quake.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/quake", quakeRoutes);

app.use("/", (req: Request, res: Response) => {
  res.send("Port is working");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
