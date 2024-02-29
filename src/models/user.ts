import mongoose, { Schema, Document, Types } from 'mongoose';
import workoutPlan, { IWorkoutPlan } from './workoutPlan';
import workoutSession, { IWorkoutSession } from './workoutSession';

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	fullName: string;
	email: string;
	date: Date;
	bio: string;
	picture: string;
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
	workoutPlans: [{ type: Schema.Types.ObjectId, ref: 'workoutPlan' }],
	workoutSessions: [{ type: Schema.Types.ObjectId, ref: 'workoutSession' }],
});

const user = mongoose.model<IUser>('user', userSchema);

export default user;
