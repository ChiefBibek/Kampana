"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarEvent = void 0;
// models/LunarEvent.js
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const LunarEventSchema = new mongoose_2.Schema({
    _id: { type: mongoose_2.Schema.Types.ObjectId, auto: true },
    filename: { type: String, required: true },
    time_abs: { type: String, required: true },
    velocity: { type: Number, required: true },
    sta_lta_ratio: { type: Number, required: true },
});
exports.LunarEvent = mongoose_1.default.model('LunarEvent', LunarEventSchema, 'lunar_seismic_events');
