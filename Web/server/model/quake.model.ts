// models/Earthquake.js
import mongoose from 'mongoose';

export interface EarthquakeDocument extends mongoose.Document {
    _id: string;
    filename: string;
    time_abs: string;
    time_rel: number;
    evid: string;
    mq_type: string;
}

const earthquakeSchema = new mongoose.Schema({
    _id: { type: String },
    filename: { type: String },
    time_abs: { type: String },
    time_rel: { type: Number },
    evid: { type: String },
    mq_type: { type: String }
});

export const Earthquake = mongoose.model<EarthquakeDocument>('Earthquake', earthquakeSchema);