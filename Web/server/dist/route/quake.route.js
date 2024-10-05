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
const quake_model_1 = require("../model/quake.model");
const db_1 = require("../util/db");
const router = express_1.default.Router();
router.get("/getData", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Establish database connection
        yield (0, db_1.connectDB)(); // Ensure this function connects to the correct database (test DB in MarsMoon cluster)
        // Retrieve all documents from the 'catalog' collection (which is mapped to the Quake model)
        const quakeData = yield quake_model_1.Quake.find();
        // Check if data is empty
        // if (!quakeData || quakeData.length === 0) {
        //   return res.status(404).json({ error: "No data found in the catalog" });
        // }
        // Return the retrieved quake data
        res.status(200).json(quakeData);
    }
    catch (error) {
        console.error("Error retrieving data:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get("/getData/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        console.log(req.params.id);
        const quake = yield quake_model_1.Quake.findById(req.params.id);
        // if (!quake) {
        //   return res.status(404).json({ error: "Quake not found" });
        // }
        console.log(quake);
        res.status(200).json(quake);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.get("/getDataByYear/:year", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, db_1.connectDB)();
        const year = parseInt(req.params.year);
        // Calculate the start and end dates for the given year
        const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
        const endOfYear = new Date(`${year + 1}-01-01T00:00:00.000Z`);
        // Query to find quakes within the specified year based on time_abs
        const quakes = yield quake_model_1.Quake.find({
            time_abs: {
                $gte: startOfYear.toISOString(), // Time as ISO string
                $lt: endOfYear.toISOString(),
            }
        });
        console.log(quakes);
        res.status(200).json(quakes);
    }
    catch (error) {
        console.error("Error fetching quake data by year:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
router.post("/getDataByTimeRange", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Full Request Body:", req.body);
        yield (0, db_1.connectDB)();
        const { start, end } = req.body;
        // if (!start || !end) {
        //   return res.status(400).json({ error: "Start and end times are required" });
        // }
        const startTime = new Date(start);
        const endTime = new Date(end);
        const quakes = yield quake_model_1.Quake.find({
            time_abs: {
                $gte: startTime.toISOString(),
                $lt: endTime.toISOString(),
            },
        });
        res.status(200).json(quakes);
    }
    catch (error) {
        console.error("Error fetching quake data by time range:", error);
        res.status(500).json({ error: error.message || "Internal server error" });
    }
}));
exports.default = router;
