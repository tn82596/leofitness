import mongoose, { Schema, Document, Types } from 'mongoose';
import { IWorkoutPlan } from './workoutPlan';
import { IWorkoutSession } from './workoutSession';
import { ISchedule } from './schedule';

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	fullName: string;
	email: string;
	date: Date;
	bio: string;
	picture: string;
	schedule: Types.ObjectId | ISchedule;
	workoutPlans: Types.ObjectId[] | IWorkoutPlan[];
	workoutSessions: Types.ObjectId[] | IWorkoutSession[];
}

const userSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	fullName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	date: { type: Date, required: true },
	bio: { type: String },
	picture: { type: String },
	schedule: { type: Schema.Types.ObjectId, ref: 'Schedule' },
	workoutPlans: [{ type: Schema.Types.ObjectId, ref: 'WorkoutPlan' }],
	workoutSessions: [{ type: Schema.Types.ObjectId, ref: 'WorkoutSession' }],
});

const user = mongoose.model<IUser>('user', userSchema);

export default user;
