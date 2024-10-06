// models/LunarEvent.js
import mongoose from 'mongoose';
import { Schema, Document, Types } from 'mongoose';

export interface LunarEventDocument extends Document {
    _id: Types.ObjectId;
    filename: string;
    time_abs: string;
    velocity: number;
    sta_lta_ratio: number;
}

const LunarEventSchema = new Schema<LunarEventDocument>({
    _id: { type: Schema.Types.ObjectId, auto: true },
    filename: { type: String, required: true },
    time_abs: { type: String, required: true },
    velocity: { type: Number, required: true },
    sta_lta_ratio: { type: Number, required: true },
});

export const LunarEvent = mongoose.model<LunarEventDocument>('LunarEvent', LunarEventSchema, 'lunar_seismic_events');
