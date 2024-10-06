"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quake_route_1 = __importDefault(require("./route/quake.route"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve static files from the public directory
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// API routes
app.use("/api/quake", quake_route_1.default);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
});
