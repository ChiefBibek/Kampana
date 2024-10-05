"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quakeRouter = void 0;
// quake.route.ts
const express_1 = __importDefault(require("express"));
const quake_controller_1 = require("../controller/quake.controller");
const router = express_1.default.Router();
exports.quakeRouter = router;
router.get('/', quake_controller_1.quakeController.getQuake);
router.post('/createQuake', quake_controller_1.quakeController.createQuake);
