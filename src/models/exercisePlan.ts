import mongoose, { Schema, Document } from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     ExercisePlan:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         icon:
 *           type: string
 *         muscleType:
 *           type: string
 *         sets:
 *           type: integer
 *           format: int32
 *         reps:
 *           type: integer
 *           format: int32
 *         weight:
 *           type: number
 *           format: float
 *         restTime:
 *           type: integer
 *           format: int32
 *         intensity:
 *           type: string
 *           enum:
 *             - low
 *             - medium
 *             - high
 */

export interface IExercisePlan extends Document {
	name: string;
	description: string;
	icon: string;
	muscleType: string;
	sets: number;
	reps: number;
	weight: number;
	restTime: number;
	intensity: string; // 'low', 'medium', 'high'
}

const exercisePlanSchema = new Schema({
	name: { type: String, required: true },
	description: { type: String, required: true },
	icon: { type: String, required: true },
	muscleType: { type: String, required: true },
	sets: { type: Number, required: true },
	reps: { type: Number, required: true },
	weight: { type: Number, required: true },
	restTime: { type: Number, required: true },
	intensity: { type: String, enum: ['low', 'medium', 'high'], required: true },
});

// Create the Exercise Plan model
const exercisePlan = mongoose.model<IExercisePlan>('exercisePlan', exercisePlanSchema);

export default exercisePlan;
