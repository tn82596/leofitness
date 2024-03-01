import mongoose, { Schema, Document, Types } from 'mongoose';
import { IExercisePlan } from './exercisePlan';

export interface IWorkoutPlan extends Document {
	name: string;
	category: string;
	exercises: Types.ObjectId[];
}

const workoutPlanSchema = new Schema(
	{
		name: { type: String, required: true },
		category: { type: String, required: true },
		exercises: [{ type: Types.ObjectId, ref: 'ExercisePlan' }],
	},
	{ timestamps: true },
);

const workoutPlan = mongoose.model<IWorkoutPlan>('workoutPlan', workoutPlanSchema);

export default workoutPlan;
