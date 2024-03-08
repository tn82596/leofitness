"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExerciseSessionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    muscleType: { type: String, lowercase: true, required: true },
    category: { type: String, required: true }, // Updated property
    sets: [{ type: mongoose_1.Types.ObjectId, ref: 'ExerciseSet' }],
});
const ExerciseSessionModel = (0, mongoose_1.model)('ExerciseSession', ExerciseSessionSchema);
exports.default = ExerciseSessionModel;
