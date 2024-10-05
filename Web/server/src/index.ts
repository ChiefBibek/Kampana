const express = require('express');
import { Request, Response } from 'express';
import { quakeRouter } from './route/quake.route';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/quake', quakeRouter);

app.use('/', (req: Request, res: Response) => {
  res.send('hello world');
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});