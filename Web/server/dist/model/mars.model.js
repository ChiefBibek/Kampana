"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarsEvent = void 0;
// models/MarsEvent.js
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const MarsEventSchema = new mongoose_2.Schema({
    _id: { type: mongoose_2.Schema.Types.ObjectId, auto: true },
    filename: { type: String, required: true },
    time_abs: { type: String, required: true },
    velocity: { type: Number, required: true },
    sta_lta_ratio: { type: Number, required: true },
});
exports.MarsEvent = mongoose_1.default.model('MarsEvent', MarsEventSchema, 'mars_seismic_events');
