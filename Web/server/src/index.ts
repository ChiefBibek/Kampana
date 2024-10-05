const express = require('express');
import { quakeRouter } from './route/quake.route';

const app = express();

app.use('/quake', quakeRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});