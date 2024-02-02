import mongoose, { Schema, Document, Types } from 'mongoose';
import { IExercisePlan } from './exercisePlan';

export interface IWorkoutPlan extends Document {
	name: string;
	date: Date;
	exercisePlan: Types.ObjectId | IExercisePlan;
}

const workoutPlanSchema = new Schema({
	name: { type: String, required: true },
	date: { type: Date, required: true },
	exercisePlan: { type: Schema.Types.ObjectId, ref: 'exercisePlan', required: true },
});

const workoutPlan = mongoose.model<IWorkoutPlan>('workoutPlan', workoutPlanSchema);

export default workoutPlan;
