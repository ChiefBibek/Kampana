// models/Quake.js
import mongoose from 'mongoose';
import { Schema, Document, Types } from 'mongoose';

export interface QuakeDocument extends Document {
    _id: Types.ObjectId;
    filename: string;
    time_abs: string;
    time_rel: number;
    evid: string;
    mq_type: string;
}

const QuakeSchema = new Schema<QuakeDocument>({
    _id: { type: Schema.Types.ObjectId, auto: true },
    filename: { type: String, required: true },
    time_abs: { type: String, required: true },
    time_rel: { type: Number, required: true },
    evid: { type: String, required: true },
    mq_type: { type: String, required: true },
});

export const Quake = mongoose.model<QuakeDocument>('Quake', QuakeSchema,'catalog');
