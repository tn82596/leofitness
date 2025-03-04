import mongoose, { Schema, Document, Types } from 'mongoose';
import { IWorkoutPlan } from './workoutPlan';

export interface ISchedule extends Document {
	startDate: Date;
	endDate: Date;
	workoutPlans: Types.ObjectId[];
}

const scheduleSchema = new Schema(
    {
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        workoutPlans: [{ type: Schema.Types.ObjectId }],
    },
    { timestamps: true },
);

const Schedule = mongoose.model<ISchedule>('Schedule', scheduleSchema);

export default Schedule;
