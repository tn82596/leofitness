"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const workoutSessionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    exercises: [{ type: mongoose_1.Types.ObjectId, ref: 'ExerciseSession' }], // Assuming 'Exercise' is the referenced model
}, { timestamps: true });
const WorkoutSessionModel = (0, mongoose_1.model)('WorkoutSession', workoutSessionSchema);
exports.default = WorkoutSessionModel;
