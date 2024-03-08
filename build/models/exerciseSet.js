"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExerciseSetSchema = new mongoose_1.Schema({
    setNum: { type: Number, required: true },
    weight: { type: Number, required: true },
    duration: { type: Number, required: true },
    restTime: { type: Number },
});
const ExerciseSetModel = (0, mongoose_1.model)('ExerciseSet', ExerciseSetSchema);
exports.default = ExerciseSetModel;
