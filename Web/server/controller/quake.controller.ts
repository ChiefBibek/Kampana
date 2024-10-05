import express, { Request, Response } from 'express';
import { Earthquake } from '../model/quake.model';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: 'Quake API up and running' });
});

router.post('/createQuake', async (req: Request, res: Response) => {
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
        await earthquake.save();
        res.status(201).json(earthquake);
    } catch (error) {
        res.status(400).json({ message: 'Error creating earthquake', error });
    }
});
