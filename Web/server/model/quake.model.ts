// models/Earthquake.js
import mongoose from 'mongoose';
import { Schema, Document, Types } from 'mongoose';

export interface EarthquakeDocument extends Document {
    _id: Types.ObjectId;
    filename: string;
    time_abs: string;
    time_rel: number;
    evid: string;
    mq_type: string;
}

const earthquakeSchema = new Schema<EarthquakeDocument>({
    _id: { type: Schema.Types.ObjectId, auto: true },
    filename: { type: String, required: true },
    time_abs: { type: String, required: true },
    time_rel: { type: Number, required: true },
    evid: { type: String, required: true },
    mq_type: { type: String, required: true },
});

export const Earthquake = mongoose.model<EarthquakeDocument>('Earthquake', earthquakeSchema);
