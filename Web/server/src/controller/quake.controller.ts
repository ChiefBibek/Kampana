// quake.controller.ts
import { Request, Response } from 'express';
import { Earthquake } from '../model/quake.model';

export const quakeController = {
    getQuake: (req: Request, res: Response) => {
        res.status(200).json({ message: 'Quake API up and running' });
    },
    createQuake: async (req: Request, res: Response) => {
        const { _id, filename, time_abs, time_rel, evid, mq_type } = req.body;

        const earthquake = new Earthquake({
            _id,
            filename,
            time_abs,
            time_rel,
            evid,
            mq_type
        });

        try {
            const savedEarthquake = await earthquake.save();
            console.log(req.body);
            res.status(201).json(savedEarthquake);
        } catch (error) {
            res.status(400).json({ message: 'Error saving quake to database', error });
        }
    },
};

