import mongoose, { Schema, Document, Types } from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     WorkoutPlan:
 *       type: object
 *       required:
 *         - name
 *         - category
 *         - exercises
 *       properties:
 *         name:
 *           type: string
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExercisePlan'
 *       example:
 *         name: "Example Workout"
 *         exercises:
 *           - name: "Exercise 1"
 *             description: "Description of Exercise 1"
 *             icon: "icon-url-1"
 *             muscleType: "muscle-type-1"
 *             sets: 3
 *             reps: 10
 *             weight: 10
 *             restTime: 60
 *             intensity: "high"
 *           - name: "Exercise 2"
 *             description: "Description of Exercise 2"
 *             icon: "icon-url-2"
 *             muscleType: "muscle-type-2"
 *             sets: 4
 *             reps: 10
 *             weight: 15
 *             restTime: 45
 *             intesity: "medium"
 */

export interface IWorkoutPlan extends Document {
	name: string;
	category: string;
	exercises: Types.ObjectId[];
}

const workoutPlanSchema = new Schema(
	{
		name: { type: String, required: true },
		category: { type: String, required: true },
		exercises: [{ type: Schema.Types.ObjectId, ref: 'ExercisePlan' }],
	},
	{ timestamps: true },
);

const workoutPlan = mongoose.model<IWorkoutPlan>('workoutPlan', workoutPlanSchema);

export default workoutPlan;
