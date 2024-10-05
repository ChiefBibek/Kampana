"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Earthquake = void 0;
// models/Earthquake.js
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const earthquakeSchema = new mongoose_2.Schema({
    _id: { type: mongoose_2.Schema.Types.ObjectId, auto: true },
    filename: { type: String, required: true },
    time_abs: { type: String, required: true },
    time_rel: { type: Number, required: true },
    evid: { type: String, required: true },
    mq_type: { type: String, required: true },
});
exports.Earthquake = mongoose_1.default.model('Earthquake', earthquakeSchema);
