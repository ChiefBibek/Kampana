// quake.route.ts
import express from 'express';
import { quakeController } from '../controller/quake.controller';

const  router=express.Router();

router.get('/', quakeController.getQuake);
router.post('/createQuake', quakeController.createQuake);

export { router as quakeRouter };
