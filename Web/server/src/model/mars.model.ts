// models/MarsEvent.js
import mongoose from 'mongoose';
import { Schema, Document, Types } from 'mongoose';

export interface MarsEventDocument extends Document {
    _id: Types.ObjectId;
    filename: string;
    time_abs: string;
    velocity: number;
    sta_lta_ratio: number;
}

const MarsEventSchema = new Schema<MarsEventDocument>({
    _id: { type: Schema.Types.ObjectId, auto: true },
    filename: { type: String, required: true },
    time_abs: { type: String, required: true },
    velocity: { type: Number, required: true },
    sta_lta_ratio: { type: Number, required: true },
});

export const MarsEvent = mongoose.model<MarsEventDocument>('MarsEvent', MarsEventSchema, 'mars_seismic_events');
