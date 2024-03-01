import mongoose, { Schema, Document, Types } from 'mongoose';
import { IWorkoutPlan } from './workoutPlan';

export interface ISchedule extends Document {
	startDate: Date;
	endDate: Date;
	workoutPlans: Types.ObjectId[] | IWorkoutPlan[];
}

const scheduleSchema = new Schema(
	{
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		workoutPlans: [{ type: Schema.Types.ObjectId, ref: 'WorkoutPlan' }],
	},
	{ timestamps: true },
);

const schedule = mongoose.model<ISchedule>('schedule', scheduleSchema);

export default schedule;
