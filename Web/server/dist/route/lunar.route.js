"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lunar_model_1 = require("../model/lunar.model");
const db_1 = require("../util/db");
const router = express_1.default.Router();
// Lunar Events Routes
router.get("/lunar/getData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        const lunarData = yield lunar_model_1.LunarEvent.find();
        res.status(200).json(lunarData);
    }
    catch (error) {
        console.error("Error retrieving Lunar data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get("/lunar/getData/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        console.log(req.params.id);
        const lunarEvent = yield lunar_model_1.LunarEvent.findById(req.params.id);
        res.status(200).json(lunarEvent);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get("/lunar/getDataByYear/:year", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        const year = parseInt(req.params.year);
        const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
        const endOfYear = new Date(`${year + 1}-01-01T00:00:00.000Z`);
        const lunarEvents = yield lunar_model_1.LunarEvent.find({
            time_abs: {
                $gte: startOfYear.toISOString(),
                $lt: endOfYear.toISOString(),
            },
        });
        res.status(200).json(lunarEvents);
    }
    catch (error) {
        console.error("Error fetching Lunar event data by year:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
//MOST IMPORTANT ROUTE
router.post("/lunar/getDataByTimeRange", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Full Request Body:", req.body);
        yield (0, db_1.connectDB)();
        const { start, end } = req.body;
        const startTime = new Date(start);
        const endTime = new Date(end);
        const lunarEvents = yield lunar_model_1.LunarEvent.find({
            time_abs: {
                $gte: startTime.toISOString(),
                $lt: endTime.toISOString(),
            },
        });
        res.status(200).json(lunarEvents);
    }
    catch (error) {
        console.error("Error fetching Lunar event data by time range:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
}));
exports.default = router;
