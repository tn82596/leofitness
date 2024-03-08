import mongoose, { Schema, Document, Types } from 'mongoose';
import { IWorkoutPlan } from './workoutPlan';
/**
 * @openapi
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the schedule.
 *           example: 61f6f1e5d8c62a001d34c91a
 *         startDate:
 *           type: string
 *           format: date-time
 *           description: The start date of the schedule.
 *           example: "2023-03-01T08:00:00.000Z"
 *         endDate:
 *           type: string
 *           format: date-time
 *           description: The end date of the schedule.
 *           example: "2023-03-31T08:00:00.000Z"
 *         workoutPlans:
 *           type: array
 *           description: Array of workout plan IDs associated with the schedule.
 *           items:
 *             type: string
 *             description: The ID of a workout plan.
 *             example: 61f6f1e5d8c62a001d34c91b
 *       required:
 *         - startDate
 *         - endDate
 *       example:
 *         _id: 61f6f1e5d8c62a001d34c91a
 *         startDate: "2023-03-01T08:00:00.000Z"
 *         endDate: "2023-03-31T08:00:00.000Z"
 *         workoutPlans:
 *           - 61f6f1e5d8c62a001d34c91b
 */

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
