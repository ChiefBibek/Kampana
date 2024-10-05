// quake.controller.ts
import { Request, Response, NextFunction } from 'express';
import { Earthquake } from '../model/quake.model';

export const quakeController = {
    // GET QUAKE API
    // Return all earthquakes in the database between startTime and endTime
    getQuake: async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Destructure startTime and endTime from req.query
            const { startTime, endTime } = req.query;

            // Validate that startTime and endTime are provided
            if (!startTime || !endTime) {
                return res.status(400).json({ error: 'startTime and endTime are required' });
            }

            // Create a query for time_abs within the given date range
            const query = {
                time_abs: {
                    $gte: new Date(startTime as string),  // Convert startTime to Date
                    $lte: new Date(endTime as string)     // Convert endTime to Date
                }
            };

            // Fetch matching earthquakes from the database
            const earthquakes = await Earthquake.find(query).exec();

            // Return the earthquake data as a JSON response
            res.status(200).json(earthquakes);

        } catch (err) {
            // Handle any errors that occur during the process
            res.status(500).json({ error: (err as Error).message });
        }
    },

    // POST QUAKE API
    // Create a new earthquake entry in the database
    createQuake: async (req: Request, res: Response) => {
        try {
            // Destructure request body to extract earthquake data
            const { _id, filename, time_abs, time_rel, evid, mq_type } = req.body;

            // Ensure time_abs is a Date object
            const earthquake = new Earthquake({
                _id,
                filename,
                time_abs: new Date(time_abs),  // Convert time_abs to Date
                time_rel,
                evid,
                mq_type
            });

            // Save the earthquake to the database
            const savedEarthquake = await earthquake.save();

            // Log the request body and return the saved earthquake data
            console.log(req.body);
            res.status(201).json(savedEarthquake);
        } catch (error) {
            // Handle errors during the creation process
            res.status(400).json({
                message: 'Error saving quake to database',
                error: (error as Error).message
            });
        }
    },
};
