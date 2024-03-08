import mongoose, { Schema, Document, Types } from 'mongoose';
import { IWorkoutPlan } from './workoutPlan';
import { IWorkoutSession } from './workoutSession';
import { ISchedule } from './schedule';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *           description: The user's first name.
 *         lastName:
 *           type: string
 *           description: The user's last name.
 *         fullName:
 *           type: string
 *           description: The user's full name.
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address.
 *         date:
 *           type: string
 *           format: date
 *           description: The user's registration date.
 *         bio:
 *           type: string
 *           description: The user's biography.
 *         picture:
 *           type: string
 *           description: The URL of the user's profile picture.
 *         schedule:
 *           type: string
 *           description: The ID of the user's schedule.
 *         workoutPlans:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of IDs of workout plans associated with the user.
 *         workoutSessions:
 *           type: array
 *           items:
 *             type: string
 *           description: An array of IDs of workout sessions associated with the user.
 */

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
