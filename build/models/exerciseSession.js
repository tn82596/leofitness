"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ExerciseSessionSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
<<<<<<< HEAD
    muscleType: { type: String, lowercase: true, required: true },
    sets: { type: Number, required: true },
    weight: { type: Number, required: true },
    restTime: { type: Number, required: true },
=======
    muscle_type: { type: String, lowercase: true, required: true },
    sets: { type: Number, required: true },
    weight: { type: Number, required: true },
    rest_time: { type: Number, required: true },
>>>>>>> 60b5630 (testing if build deployed)
    intensity: {
        type: String,
        lowercase: true,
        enum: ['low', 'medium', 'high'],
        required: true,
    },
});
const ExerciseSessionModel = (0, mongoose_1.model)('ExerciseSession', ExerciseSessionSchema);
exports.default = ExerciseSessionModel;
