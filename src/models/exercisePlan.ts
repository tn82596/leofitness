import mongoose, { Schema, Document } from 'mongoose';

// Exercise Plan Schema
export interface IExercisePlan extends Document {
	name: string;
	description: string;
	icon: string;
	muscleType: string;
	sets: number;
	reps: number;
	weight: number;
	restTime: number;
	intensity: string; // 'low', 'medium', 'high'
}

const exercisePlanSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	icon: { type: String, required: true },
	muscleType: { type: String, required: true },
	sets: { type: Number, required: true },
	reps: { type: Number, required: true },
	weight: { type: Number, required: true },
	restTime: { type: Number, required: true },
	intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
});

// Create the Exercise Plan model
const exercisePlan = mongoose.model<IExercisePlan>('exercisePlan', exercisePlanSchema);

export default exercisePlan;
