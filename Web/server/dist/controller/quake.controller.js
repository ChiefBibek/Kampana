"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quakeController = void 0;
const quake_model_1 = require("../model/quake.model");
exports.quakeController = {
    getQuake: (req, res) => {
        res.status(200).json({ message: 'Quake API up and running' });
    },
    createQuake: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { _id, filename, time_abs, time_rel, evid, mq_type } = req.body;
        const earthquake = new quake_model_1.Earthquake({
            _id,
            filename,
            time_abs,
            time_rel,
            evid,
            mq_type
        });
        try {
            const savedEarthquake = yield earthquake.save();
            console.log(req.body);
            res.status(201).json(savedEarthquake);
        }
        catch (error) {
            res.status(400).json({ message: 'Error saving quake to database', error });
        }
    }),
};
