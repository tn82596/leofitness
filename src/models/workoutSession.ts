import { Schema, model, Document, Types } from 'mongoose';
/**
 * @openapi
 * components:
 *   schemas:
 *     WorkoutSession:
 *       type: object
 *       required:
 *         - name
 *         - exercises
 *       properties:
 *         name:
 *           type: string
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExerciseSession'
 *       example:
 *         name: "Example Workout"
 *         exercises:
 *           - name: "Exercise 1"
 *             description: "Description of Exercise 1"
 *             icon: "icon-url-1"
 *             muscleType: "muscle-type-1"
 *             sets: 3
 *             weight: 10
 *             restTime: 60
 *             intensity: "high"
 *           - name: "Exercise 2"
 *             description: "Description of Exercise 2"
 *             icon: "icon-url-2"
 *             muscleType: "muscle-type-2"
 *             sets: 4
 *             weight: 15
 *             restTime: 45
 *             intensity: "medium"
 */

export interface IWorkoutSession extends Document {
	name: string;
	exercises: Types.ObjectId[];
}

const workoutSessionSchema = new Schema<IWorkoutSession>(
	{
		name: { type: String, required: true },
		exercises: [{ type: Types.ObjectId, ref: 'ExerciseSession' }], // Assuming 'Exercise' is the referenced model
	},
	{ timestamps: true },
);

const WorkoutSessionModel = model<IWorkoutSession>('WorkoutSession', workoutSessionSchema);

export default WorkoutSessionModel;
