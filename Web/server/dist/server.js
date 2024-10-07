"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mars_route_1 = __importDefault(require("./route/mars.route")); // Your API routes
const lunar_route_1 = __importDefault(require("./route/lunar.route")); // Your API routes
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
// Load environment variables from .env
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../.env') });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files from the 'public' directory (e.g., chart.html, chart.js)
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
// Define an additional route to serve the chart page
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../public/chart.html'));
});
// API routes
app.use("/api/quake", lunar_route_1.default);
app.use("/api/quake", mars_route_1.default);
// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
});
