"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const quake_route_1 = require("./route/quake.route");
const app = express();
app.use('/quake', quake_route_1.quakeRouter);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
